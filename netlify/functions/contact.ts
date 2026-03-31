import { z } from "zod"
import { randomUUID } from "crypto"
import { appendFile, mkdir } from "fs/promises"

const contactSchema = z.object({
  topic: z.enum(["project", "service", "career", "info"]),
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  message: z.string().min(1),
  projectType: z.string().optional().default(""),
  projectTypeOther: z.string().optional().default(""),
  equipmentId: z.string().optional().default(""),
  urgency: z.string().optional().default(""),
  position: z.string().optional().default(""),
  portfolio: z.string().optional().default(""),
  website: z.string().optional().default(""),
})

const rateLimitWindowMs = 10 * 60 * 1000
const rateLimitMax = 5
const rateLimits = new Map<string, { count: number; resetAt: number }>()

const topicLabels: Record<string, string> = {
  project: "Novi projekat",
  service: "Servis",
  career: "Karijera",
  info: "Info",
}

const recipients: Record<string, string> = {
  project: "tehnika@eef.rs",
  service: "servis@eef.rs",
  career: "office@eef.rs",
  info: "office@eef.rs",
}
const CONTACT_RETRY_MAX_ATTEMPTS = Math.max(1, Math.min(4, Number(process.env.CONTACT_RETRY_MAX_ATTEMPTS || 3)))
const CONTACT_RETRY_BASE_MS = Math.max(250, Math.min(4000, Number(process.env.CONTACT_RETRY_BASE_MS || 700)))
const CONTACT_RETRY_MAX_DELAY_MS = Math.max(700, Math.min(9000, Number(process.env.CONTACT_RETRY_MAX_DELAY_MS || 4500)))
const CONTACT_SPAM_THRESHOLD = Math.max(4, Math.min(12, Number(process.env.CONTACT_SPAM_THRESHOLD || 6)))
const CONTACT_LOGO_URL = process.env.CONTACT_EMAIL_LOGO_URL || "https://eef.rs/assets/logo.png"
const CONTACT_SLA_TEXT = process.env.CONTACT_SLA_TEXT || "odgovor u roku od 1 radnog dana"
const CONTACT_BLOCKLIST = (process.env.CONTACT_SPAM_BLOCKLIST || "viagra,casino,crypto giveaway,loan,escort,porn,betting")
  .split(",")
  .map((v) => v.trim().toLowerCase())
  .filter(Boolean)

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function buildFieldRows(fields: readonly (readonly [string, string])[]) {
  return fields
    .map(
      ([key, value]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#171A54;background:#f8fafc;width:220px;">${escapeHtml(
          key
        )}</td><td style="padding:10px 12px;border:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value)}</td></tr>`
    )
    .join("")
}

function isTransientResendStatus(status: number) {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504
}

function calcRetryDelay(attempt: number) {
  return Math.min(CONTACT_RETRY_MAX_DELAY_MS, CONTACT_RETRY_BASE_MS * Math.pow(2, attempt - 1) + attempt * 120)
}

function evaluateSpam(data: z.infer<typeof contactSchema>) {
  const combined = [data.name, data.company, data.email, data.message, data.portfolio].join(" ").toLowerCase()
  const reasons: string[] = []
  let score = 0
  const urlMatches = combined.match(/https?:\/\/|www\./g) || []
  if (urlMatches.length >= 3) {
    score += 3
    reasons.push("excessive_links")
  }
  if (data.message.trim().length < 8) {
    score += 2
    reasons.push("very_short_message")
  }
  if (/(.)\1{7,}/.test(data.message)) {
    score += 2
    reasons.push("repeated_chars")
  }
  const uppercaseChars = data.message.replace(/[^A-ZČĆŽŠĐ]/g, "").length
  const letterChars = data.message.replace(/[^A-Za-zČĆŽŠĐčćžšđ]/g, "").length
  if (letterChars >= 30 && uppercaseChars / letterChars > 0.65) {
    score += 2
    reasons.push("high_uppercase_ratio")
  }
  if (/@(mailinator|guerrillamail|tempmail|10minutemail)\./i.test(data.email)) {
    score += 3
    reasons.push("disposable_email")
  }
  if (CONTACT_BLOCKLIST.some((word) => combined.includes(word))) {
    score += 4
    reasons.push("blocklist_hit")
  }
  return { score, reasons, blocked: score >= CONTACT_SPAM_THRESHOLD }
}

async function sendResendEmail(
  apiKey: string,
  body: Record<string, unknown>,
  requestId: string,
  tag: string
) {
  let lastStatus = 0
  let lastDetails = ""
  for (let attempt = 1; attempt <= CONTACT_RETRY_MAX_ATTEMPTS; attempt++) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      return { ok: true as const }
    }
    lastStatus = response.status
    lastDetails = await response.text()
    console.error(`[contact:${requestId}] resend_${tag}_attempt_${attempt}_failed`, lastStatus, lastDetails)
    if (!isTransientResendStatus(response.status) || attempt === CONTACT_RETRY_MAX_ATTEMPTS) {
      break
    }
    await sleep(calcRetryDelay(attempt))
  }
  return { ok: false as const, status: lastStatus, details: lastDetails }
}

async function queueContactFallback(entry: Record<string, unknown>) {
  const queueDir = "/tmp"
  const queueFile = `${queueDir}/contact-fallback-queue.ndjson`
  await mkdir(queueDir, { recursive: true })
  await appendFile(queueFile, `${JSON.stringify({ ...entry, queuedAt: new Date().toISOString() })}\n`, "utf8")
}

function jsonResponse(statusCode: number, payload: unknown, extraHeaders?: Record<string, string>) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...(extraHeaders || {}) },
    body: JSON.stringify(payload),
  }
}

export async function handler(event: { httpMethod?: string; body?: string | null; headers?: Record<string, string | undefined> }) {
  const requestId = String(event.headers?.["x-request-id"] || randomUUID())
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method Not Allowed" }, { "X-Request-ID": requestId })
  }

  const headers = event.headers ?? {}
  const forwarded = headers["x-forwarded-for"]
  const ip =
    (forwarded ? forwarded.split(",")[0]?.trim() : "") ||
    headers["x-nf-client-connection-ip"] ||
    headers["client-ip"] ||
    "unknown"

  const now = Date.now()
  const existing = rateLimits.get(ip)
  if (!existing || existing.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + rateLimitWindowMs })
  } else if (existing.count >= rateLimitMax) {
    return jsonResponse(429, { message: "Previše zahteva. Pokušajte kasnije." })
  } else {
    existing.count += 1
    rateLimits.set(ip, existing)
  }

  let payload: unknown
  try {
    payload = event.body ? JSON.parse(event.body) : {}
  } catch {
    return jsonResponse(400, { message: "Neispravni podaci." })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return jsonResponse(400, { message: "Neispravni podaci.", requestId }, { "X-Request-ID": requestId })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return jsonResponse(500, { message: "Nedostaje RESEND_API_KEY." })
  }

  const data = parsed.data
  const spamCheck = evaluateSpam(data)
  if (spamCheck.blocked) {
    console.warn(`[contact:${requestId}] blocked_spam score=${spamCheck.score} reasons=${spamCheck.reasons.join(",")}`)
    return jsonResponse(400, { message: "Neispravan upit.", requestId }, { "X-Request-ID": requestId })
  }
  if (data.website && data.website.trim().length > 0) {
    return jsonResponse(200, { ok: true }, { "X-Request-ID": requestId })
  }
  if (data.topic === "project" && !data.projectType.trim()) {
    return jsonResponse(400, { message: "Tip projekta je obavezan." })
  }
  if (data.topic === "project" && data.projectType === "other" && !data.projectTypeOther.trim()) {
    return jsonResponse(400, { message: "Drugi tip projekta je obavezan." })
  }
  if (data.topic === "service" && !data.equipmentId.trim()) {
    return jsonResponse(400, { message: "ID opreme je obavezan." })
  }
  if (data.topic === "service" && !data.urgency.trim()) {
    return jsonResponse(400, { message: "Hitnost je obavezna." })
  }
  if (data.topic === "career" && !data.position.trim()) {
    return jsonResponse(400, { message: "Pozicija je obavezna." })
  }

  const label = topicLabels[data.topic] ?? "Kontakt"
  const to = recipients[data.topic] ?? "office@eef.rs"
  const from = process.env.RESEND_FROM || "noreply@eef.co.rs"
  const projectTypeValue =
    data.projectType === "other" ? data.projectTypeOther : data.projectType

  const fields = [
    ["Tema", label],
    ["Ime i prezime", data.name],
    ["Kompanija", data.company],
    ["Email", data.email],
    ["Poruka", data.message],
    ["Tip projekta", projectTypeValue],
    ["ID opreme", data.equipmentId],
    ["Hitnost", data.urgency],
    ["Pozicija", data.position],
    ["LinkedIn / Portfolio", data.portfolio],
  ] as const

  const safeFields = fields.filter(([, value]) => value && value.trim().length > 0).map(([key, value]) => [key, value] as const)
  const adminText = safeFields.map(([key, value]) => `${key}: ${value}`).join("\n")
  const adminHtml = `
    <div style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:760px;margin:0 auto;padding:24px;">
        <div style="border-radius:16px;overflow:hidden;border:1px solid #cbd5e1;background:#ffffff;">
          <div style="padding:20px 24px;background:linear-gradient(135deg,#171A54 0%,#2f3f8f 65%,#56AA4A 100%);color:#ffffff;">
            <img src="${escapeHtml(CONTACT_LOGO_URL)}" alt="EEF Logo" width="142" height="40" style="display:block;max-width:142px;height:auto;margin:0 0 12px;" />
            <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:.9;font-weight:700;">Eko Elektrofrigo</div>
            <div style="font-size:24px;font-weight:800;line-height:1.2;margin-top:6px;">Novi lead sa kontakt forme</div>
            <div style="margin-top:8px;font-size:14px;opacity:.92;">Tema: ${escapeHtml(label)} • Primalac: ${escapeHtml(to)}</div>
          </div>
          <div style="padding:20px 24px;">
            <table style="width:100%;border-collapse:collapse;border-spacing:0;">
              ${buildFieldRows(safeFields)}
            </table>
            <div style="margin-top:16px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;color:#334155;font-size:13px;">
              Poruka je poslata automatski preko EEF kontakt sistema. Za odgovor korisniku koristite Reply-To.
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  const userText = [
    `Poštovani/a ${data.name},`,
    "",
    "Hvala što ste kontaktirali Eko Elektrofrigo.",
    `Vaš upit je uspešno primljen u kategoriji: ${label}.`,
    `Naš tim će vas kontaktirati u roku definisanom SLA politikom: ${CONTACT_SLA_TEXT}.`,
    "",
    "Srdačan pozdrav,",
    "Eko Elektrofrigo",
    "Svetolika Nikačevića 11, Beograd",
    "office@eef.rs | +381 11 375 72 87",
  ].join("\n")
  const userHtml = `
    <div style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:720px;margin:0 auto;padding:24px;">
        <div style="border-radius:16px;overflow:hidden;border:1px solid #cbd5e1;background:#ffffff;">
          <div style="padding:22px 24px;background:linear-gradient(135deg,#171A54 0%,#2f3f8f 70%,#56AA4A 100%);color:#ffffff;">
            <img src="${escapeHtml(CONTACT_LOGO_URL)}" alt="EEF Logo" width="142" height="40" style="display:block;max-width:142px;height:auto;margin:0 0 12px;" />
            <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:.9;font-weight:700;">Eko Elektrofrigo</div>
            <div style="font-size:24px;font-weight:800;line-height:1.2;margin-top:6px;">Potvrda prijema upita</div>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 14px;font-size:15px;color:#0f172a;">Poštovani/a <strong>${escapeHtml(data.name)}</strong>,</p>
            <p style="margin:0 0 12px;font-size:15px;color:#334155;">Hvala što ste kontaktirali Eko Elektrofrigo. Vaš upit je uspešno zabeležen.</p>
            <div style="margin:14px 0;padding:14px;border:1px solid #dbeafe;background:#f8fbff;border-radius:10px;">
              <div style="font-size:13px;color:#1e293b;"><strong>Kategorija upita:</strong> ${escapeHtml(label)}</div>
              <div style="font-size:13px;color:#1e293b;margin-top:6px;"><strong>SLA:</strong> ${escapeHtml(CONTACT_SLA_TEXT)}</div>
            </div>
            <p style="margin:0 0 12px;font-size:14px;color:#475569;">Ukoliko je upit hitan, možete nas kontaktirati i direktno putem telefona +381 11 375 72 87.</p>
            <p style="margin:18px 0 0;font-size:14px;color:#0f172a;">Srdačan pozdrav,<br/><strong>Eko Elektrofrigo tim</strong></p>
          </div>
        </div>
      </div>
    </div>
  `

  console.info(`[contact:${requestId}] submit topic=${data.topic} target=${to}`)
  const adminResponse = await sendResendEmail(
    apiKey,
    {
      from,
      to: [to],
      reply_to: data.email,
      subject: `Kontakt - ${label} - ${data.name}`,
      text: adminText,
      html: adminHtml,
    },
    requestId,
    "admin"
  )

  if (!adminResponse.ok) {
    await queueContactFallback({
      requestId,
      type: "admin",
      topic: data.topic,
      to,
      from,
      payload: { text: adminText, html: adminHtml, userEmail: data.email, name: data.name },
      error: { status: adminResponse.status, details: adminResponse.details },
    })
    return jsonResponse(202, { ok: true, queued: true, requestId, message: "Upit je primljen i stavljen u red za slanje." }, { "X-Request-ID": requestId })
  }

  const autoReplyResponse = await sendResendEmail(
    apiKey,
    {
      from,
      to: [data.email],
      reply_to: to,
      subject: "Potvrda prijema upita | Eko Elektrofrigo",
      text: userText,
      html: userHtml,
    },
    requestId,
    "auto_reply"
  )

  if (!autoReplyResponse.ok) {
    await queueContactFallback({
      requestId,
      type: "auto_reply",
      topic: data.topic,
      to: data.email,
      from,
      payload: { text: userText, html: userHtml, adminTarget: to, name: data.name },
      error: { status: autoReplyResponse.status, details: autoReplyResponse.details },
    })
    return jsonResponse(200, { ok: true, requestId, autoReplyQueued: true }, { "X-Request-ID": requestId })
  }

  return jsonResponse(200, { ok: true, requestId }, { "X-Request-ID": requestId })
}
