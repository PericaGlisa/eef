import { z } from "zod"

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

function jsonResponse(statusCode: number, payload: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }
}

export async function handler(event: { httpMethod?: string; body?: string | null; headers?: Record<string, string | undefined> }) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method Not Allowed" })
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
    return jsonResponse(400, { message: "Neispravni podaci." })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return jsonResponse(500, { message: "Nedostaje RESEND_API_KEY." })
  }

  const data = parsed.data
  if (data.website && data.website.trim().length > 0) {
    return jsonResponse(200, { ok: true })
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

  const filledFields = fields.filter(([, value]) => value && value.trim().length > 0)
  const text = filledFields.map(([key, value]) => `${key}: ${value}`).join("\n")
  const html = filledFields.map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join("")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Kontakt - ${label} - ${data.name}`,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    return jsonResponse(502, { message: "Resend greška.", details })
  }

  return jsonResponse(200, { ok: true })
}
