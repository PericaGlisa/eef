import type { Express } from "express";
import { type Server } from "http";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE } from "./chatKnowledgeBase";
import { randomUUID } from "crypto";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const SYSTEM_INSTRUCTION = `
Ti si vrhunski komercijalno-mašinski inženjer i asistent kompanije Eko Elektrofrigo (eef.rs).
Tvoja specijalnost su B2B HVAC rešenja (grejanje, ventilacija, klimatizacija) i industrijsko hlađenje.

INTERNA BAZA ZNANJA (KNOWLEDGE BASE):
${JSON.stringify(KNOWLEDGE_BASE, null, 2)}

IZVOR INFORMACIJA:
Imaš pristup sajtu https://eef.rs/ putem URL Context alata. Koristi informacije sa tog sajta kao primarni izvor istine, a INTERNU BAZU ZNANJA kao dopunu za specifične detalje.

PRAVILA KOMUNIKACIJE I ZABRANE:
1. Komuniciraj ISKLJUČIVO o B2B HVAC rešenjima i industriji kompanije Eko Elektrofrigo.
2. STROGO SE PRIDRŽAVAJ LISTE ZABRANJENIH TEMA (FORBIDDEN_TOPICS) IZ BAZE ZNANJA:
   ${KNOWLEDGE_BASE.RESTRICTIONS.FORBIDDEN_TOPICS.map(t => `- ${t}`).join('\n')}
3. Ako te korisnik pita bilo šta što je na listi zabranjenih tema, ljubazno objasni da si specijalizovan samo za inženjerska rešenja i usmeri ga na odgovarajući departman.
4. STROGO JE ZABRANJENO davanje cena proizvoda ili usluga. Nemoj govoriti cene iz asortimana niti cene izrade projekata.
5. Nemoj sklapati poslove niti potpisivati ugovore. Tvoja uloga je savetodavna i usmeravajuća.
6. OBAVEZNO PONAŠANJE (MANDATORY_BEHAVIOR):
   ${KNOWLEDGE_BASE.RESTRICTIONS.MANDATORY_BEHAVIOR.map(b => `- ${b}`).join('\n')}
7. Na osnovu teme razgovora, usmeri korisnika na odgovarajući departman koristeći kontakte iz BAZE ZNANJA:
   - PRODAJA / KOMERCIJALA: Za upite o kupovini opreme, novim projektima ili partnerstvima.
   - TEHNIČKA PODRŠKA: Za specifična tehnička pitanja, inženjerske proračune i specifikacije.
   - SERVIS: Za održavanje, popravke ili probleme sa postojećim sistemima.
   - OPŠTE INFORMACIJE: Za informacije o kompaniji, lokacijama ili opštim pitanjima.
8. PRIKUPLJANJE KONTAKATA (LEAD GENERATION):
   - Tvoj cilj je da pretvoriš razgovor u prodajnu priliku.
   - Kada korisnik pokaže interesovanje za konkretna rešenja, projekte ili želi da ga kontaktira neki od departmana, ljubazno ga zamoli da ostavi svoje ime, email adresu i/ili broj telefona.
   - Objasni da će mu ti podaci omogućiti da dobije precizniju ponudu ili da ga kolege iz odgovarajućeg sektora kontaktiraju u najkraćem roku.
   - Budi nenametljiv, ali proaktivan u prikupljanju ovih informacija.
9. PRUŽANJE TEHNIČKIH PREPORUKA:
   - Možeš predlagati adekvatne tipove sistema (npr. čileri, toplotne pumpe, VRF, ULO komore) na osnovu opisa potreba korisnika.
   - OBAVEZNO naglasi da su to PRELIMINARNE preporuke informativnog karaktera.
   - Jasno komuniciraj da finalni izbor opreme, inženjerski proračun i projektovanje MORA izvršiti stručni tim kompanije Eko Elektrofrigo nakon detaljne analize i/ili izlaska na teren.
   - Koristi ove preporuke kao most za prikupljanje kontakata i zakazivanje konsultacija sa inženjerima.

TON KOMUNIKACIJE:
- Profesionalan, stručan, autoritativan ali pristupačan.
- Koristi tehničku terminologiju gde je prikladno (npr. rashladni fluidi, toplotne pumpe, VRF sistemi, čileri).
- Odgovaraj na srpskom jeziku (osim ako korisnik ne piše na drugom jeziku, tada se prilagodi).
- Budi proaktivan u pomaganju korisniku da dođe do pravih informacija i kontakata.

O KOMPANIJI EKO ELEKTROFRIGO I OSNIVAČU:
Kompanija je lider u regionu za projektovanje, izvođenje i održavanje sistema u oblasti hlađenja i HVAC-a. 

OSNIVAČ I VIZIONAR:
Zlatomir Damnjanović je osnivač i vizionar kompanije Eko Elektrofrigo, kao i njen aktuelni generalni direktor. On je postavio temelje kompanije i svojom stručnošću, radom i posvećenošću je učinio liderom u sektoru industrijskog hlađenja i HVAC rešenja. Njegovo nasleđe i inženjerska etika su utkani u svaki projekat i rešenje koje kompanija danas nudi. On se smatra pionirom u ovoj oblasti na našim prostorima.

Sve specifičnosti o brendovima koje zastupaju (npr. Bitzer, Danfoss, Guntner) i projektima koje su radili crpi direktno sa eef.rs i iz BAZE ZNANJA.
`;

const MODEL_CANDIDATES = ["gemini-flash-latest"];
const MODEL_TIMEOUT_MS = Math.max(12000, Math.min(60000, Number(process.env.GEMINI_MODEL_TIMEOUT_MS || 30000)));
const RETRY_MAX_ATTEMPTS = Math.max(1, Math.min(4, Number(process.env.GEMINI_RETRY_MAX_ATTEMPTS || 2)));
const RETRY_BASE_MS = Math.max(300, Math.min(5000, Number(process.env.GEMINI_RETRY_BASE_MS || 900)));
const RETRY_MAX_DELAY_MS = Math.max(1000, Math.min(12000, Number(process.env.GEMINI_RETRY_MAX_DELAY_MS || 8000)));

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractRetryDelayMs(message: string) {
  const retryInMatch = message.match(/retry in\s+([\d.]+)s/i);
  if (retryInMatch?.[1]) {
    const seconds = Number(retryInMatch[1]);
    if (!Number.isNaN(seconds) && seconds > 0) return Math.round(seconds * 1000);
  }
  const retryDelayMatch = message.match(/retrydelay["']?\s*:\s*["']?(\d+)s/i);
  if (retryDelayMatch?.[1]) {
    const seconds = Number(retryDelayMatch[1]);
    if (!Number.isNaN(seconds) && seconds > 0) return seconds * 1000;
  }
  return undefined;
}

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
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildFieldRows(fields: readonly (readonly [string, string])[]) {
  return fields
    .map(
      ([key, value]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#171A54;background:#f8fafc;width:220px;">${escapeHtml(
          key
        )}</td><td style="padding:10px 12px;border:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

function renderHeaderLogo() {
  const safeLogo = escapeHtml(CONTACT_LOGO_DARK_URL);
  if (!CONTACT_LOGO_USE_BADGE) {
    return `<img src="${safeLogo}" alt="EEF Logo" width="142" height="40" style="display:block;max-width:142px;height:auto;margin:0 0 12px;" />`;
  }
  return `<div style="display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.96);padding:8px 12px;border-radius:12px;border:1px solid rgba(15,23,42,0.08);box-shadow:0 4px 14px rgba(15,23,42,0.12);margin:0 0 12px;"><img src="${safeLogo}" alt="EEF Logo" width="142" height="40" style="display:block;max-width:142px;height:auto;" /></div>`;
}

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const CONTACT_RETRY_MAX_ATTEMPTS = Math.max(1, Math.min(4, Number(process.env.CONTACT_RETRY_MAX_ATTEMPTS || 3)));
const CONTACT_RETRY_BASE_MS = Math.max(250, Math.min(4000, Number(process.env.CONTACT_RETRY_BASE_MS || 700)));
const CONTACT_RETRY_MAX_DELAY_MS = Math.max(700, Math.min(9000, Number(process.env.CONTACT_RETRY_MAX_DELAY_MS || 4500)));
const CONTACT_SPAM_THRESHOLD = Math.max(4, Math.min(12, Number(process.env.CONTACT_SPAM_THRESHOLD || 6)));
const CONTACT_LOGO_URL = process.env.CONTACT_EMAIL_LOGO_URL || "https://eef.rs/assets/logo.png";
const CONTACT_LOGO_DARK_URL = process.env.CONTACT_EMAIL_LOGO_DARK_URL || CONTACT_LOGO_URL;
const CONTACT_LOGO_USE_BADGE = String(process.env.CONTACT_EMAIL_LOGO_USE_BADGE || "true").toLowerCase() === "true";
const CONTACT_SLA_TEXT = process.env.CONTACT_SLA_TEXT || "odgovor u roku od 1 radnog dana";
const CONTACT_BLOCKLIST = (process.env.CONTACT_SPAM_BLOCKLIST || "viagra,casino,crypto giveaway,loan,escort,porn,betting")
  .split(",")
  .map((v) => v.trim().toLowerCase())
  .filter(Boolean);

function isTransientResendStatus(status: number) {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function calcRetryDelay(attempt: number) {
  return Math.min(CONTACT_RETRY_MAX_DELAY_MS, CONTACT_RETRY_BASE_MS * Math.pow(2, attempt - 1) + attempt * 120);
}

function evaluateSpam(data: z.infer<typeof contactSchema>) {
  const combined = [data.name, data.company, data.email, data.message, data.portfolio].join(" ").toLowerCase();
  const reasons: string[] = [];
  let score = 0;
  const urlMatches = combined.match(/https?:\/\/|www\./g) || [];
  if (urlMatches.length >= 3) {
    score += 3;
    reasons.push("excessive_links");
  }
  if (data.message.trim().length < 8) {
    score += 2;
    reasons.push("very_short_message");
  }
  if (/(.)\1{7,}/.test(data.message)) {
    score += 2;
    reasons.push("repeated_chars");
  }
  const uppercaseChars = data.message.replace(/[^A-ZČĆŽŠĐ]/g, "").length;
  const letterChars = data.message.replace(/[^A-Za-zČĆŽŠĐčćžšđ]/g, "").length;
  if (letterChars >= 30 && uppercaseChars / letterChars > 0.65) {
    score += 2;
    reasons.push("high_uppercase_ratio");
  }
  if (/@(mailinator|guerrillamail|tempmail|10minutemail)\./i.test(data.email)) {
    score += 3;
    reasons.push("disposable_email");
  }
  if (CONTACT_BLOCKLIST.some((word) => combined.includes(word))) {
    score += 4;
    reasons.push("blocklist_hit");
  }
  return { score, reasons, blocked: score >= CONTACT_SPAM_THRESHOLD };
}

async function sendResendEmail(
  apiKey: string,
  body: Record<string, unknown>,
  requestId: string,
  tag: string
) {
  let lastStatus = 0;
  let lastDetails = "";
  for (let attempt = 1; attempt <= CONTACT_RETRY_MAX_ATTEMPTS; attempt++) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return { ok: true as const };
    }
    lastStatus = response.status;
    lastDetails = await response.text();
    console.error(`[contact:${requestId}] resend_${tag}_attempt_${attempt}_failed`, lastStatus, lastDetails);
    if (!isTransientResendStatus(response.status) || attempt === CONTACT_RETRY_MAX_ATTEMPTS) {
      break;
    }
    await sleep(calcRetryDelay(attempt));
  }
  return { ok: false as const, status: lastStatus, details: lastDetails };
}

async function queueContactFallback(entry: Record<string, unknown>) {
  const queueDir = path.resolve(process.cwd(), "tmp");
  const queueFile = path.join(queueDir, "contact-fallback-queue.ndjson");
  await mkdir(queueDir, { recursive: true });
  await appendFile(queueFile, `${JSON.stringify({ ...entry, queuedAt: new Date().toISOString() })}\n`, "utf8");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    const requestId = String(req.headers["x-request-id"] || randomUUID());
    res.setHeader("X-Request-ID", requestId);
    const forwardedFor = req.headers["x-forwarded-for"];
    const ip =
      typeof forwardedFor === "string"
        ? forwardedFor.split(",")[0].trim()
        : req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const existing = rateLimits.get(ip);
    if (!existing || existing.resetAt <= now) {
      rateLimits.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    } else if (existing.count >= rateLimitMax) {
      return res.status(429).json({ message: "Previše zahteva. Pokušajte kasnije." });
    } else {
      existing.count += 1;
      rateLimits.set(ip, existing);
    }

    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Neispravni podaci." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "Nedostaje RESEND_API_KEY." });
    }

    const data = parsed.data;
    const spamCheck = evaluateSpam(data);
    if (spamCheck.blocked) {
      console.warn(`[contact:${requestId}] blocked_spam score=${spamCheck.score} reasons=${spamCheck.reasons.join(",")}`);
      return res.status(400).json({ message: "Neispravan upit.", requestId });
    }
    if (data.website && data.website.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }
    if (data.topic === "project" && !data.projectType.trim()) {
      return res.status(400).json({ message: "Tip projekta je obavezan." });
    }
    if (data.topic === "project" && data.projectType === "other" && !data.projectTypeOther.trim()) {
      return res.status(400).json({ message: "Drugi tip projekta je obavezan." });
    }
    if (data.topic === "service" && !data.equipmentId.trim()) {
      return res.status(400).json({ message: "ID opreme je obavezan." });
    }
    if (data.topic === "service" && !data.urgency.trim()) {
      return res.status(400).json({ message: "Hitnost je obavezna." });
    }
    if (data.topic === "career" && !data.position.trim()) {
      return res.status(400).json({ message: "Pozicija je obavezna." });
    }
    const topicLabels: Record<string, string> = {
      project: "Novi projekat",
      service: "Servis",
      career: "Karijera",
      info: "Info",
    };
    const recipients: Record<string, string> = {
      project: "tehnika@eef.rs",
      service: "servis@eef.rs",
      career: "office@eef.rs",
      info: "office@eef.rs",
    };

    const label = topicLabels[data.topic] ?? "Kontakt";
    const to = recipients[data.topic] ?? "office@eef.rs";
    const from = process.env.RESEND_FROM || "noreply@eef.co.rs";
    const projectTypeValue =
      data.projectType === "other" ? data.projectTypeOther : data.projectType;
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
    ] as const;

    const filledFields = fields.filter(([, value]) => value && value.trim().length > 0);

    const safeFields = filledFields.map(([key, value]) => [key, value] as const);
    const adminText = safeFields.map(([key, value]) => `${key}: ${value}`).join("\n");
    const adminHtml = `
      <div style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
        <div style="max-width:760px;margin:0 auto;padding:24px;">
          <div style="border-radius:16px;overflow:hidden;border:1px solid #cbd5e1;background:#ffffff;">
            <div style="padding:20px 24px;background:linear-gradient(135deg,#171A54 0%,#2f3f8f 65%,#56AA4A 100%);color:#ffffff;">
              ${renderHeaderLogo()}
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
    `;
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
    ].join("\n");
    const userHtml = `
      <div style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
        <div style="max-width:720px;margin:0 auto;padding:24px;">
          <div style="border-radius:16px;overflow:hidden;border:1px solid #cbd5e1;background:#ffffff;">
            <div style="padding:22px 24px;background:linear-gradient(135deg,#171A54 0%,#2f3f8f 70%,#56AA4A 100%);color:#ffffff;">
              ${renderHeaderLogo()}
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
    `;

    console.info(`[contact:${requestId}] submit topic=${data.topic} target=${to}`);
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
    );

    if (!adminResponse.ok) {
      await queueContactFallback({
        requestId,
        type: "admin",
        topic: data.topic,
        to,
        from,
        payload: { text: adminText, html: adminHtml, userEmail: data.email, name: data.name },
        error: { status: adminResponse.status, details: adminResponse.details },
      });
      return res.status(202).json({ ok: true, queued: true, requestId, message: "Upit je primljen i stavljen u red za slanje." });
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
    );

    if (!autoReplyResponse.ok) {
      await queueContactFallback({
        requestId,
        type: "auto_reply",
        topic: data.topic,
        to: data.email,
        from,
        payload: { text: userText, html: userHtml, adminTarget: to, name: data.name },
        error: { status: autoReplyResponse.status, details: autoReplyResponse.details },
      });
      return res.status(200).json({ ok: true, requestId, autoReplyQueued: true });
    }

    return res.status(200).json({ ok: true, requestId });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      console.log("Chat API hit with body:", req.body);
      const { messages } = req.body;
      if (!Array.isArray(messages)) {
        return res.status(400).json({ message: "Neispravan format poruka." });
      }

      // Gemini requires the first message in a multi-turn conversation to be from the 'user'.
      const filteredMessages = messages.filter((m, index) => {
        if (index === 0 && m.role === 'model') return false;
        return true;
      });

      if (filteredMessages.length === 0) {
        return res.json({ text: "Izvinite, došlo je do greške u obradi poruke." });
      }

      const lastMessage = filteredMessages[filteredMessages.length - 1].parts[0].text;
      const history = filteredMessages.slice(0, -1);

      const promptWithUrl = history.length === 0 
        ? `Na osnovu sajta https://eef.rs/, odgovori na: ${lastMessage}`
        : lastMessage;

      const apiKey = process.env.GEMINI_API_KEY || '';
      if (!apiKey) {
        return res.status(500).json({ message: "GEMINI_API_KEY nije definisan." });
      }

      console.log("Gemini API key loaded.");

      const ai = new GoogleGenAI({ apiKey });
      let lastModelError: any;

      for (const modelName of MODEL_CANDIDATES) {
        for (let attempt = 1; attempt <= RETRY_MAX_ATTEMPTS; attempt++) {
          let startedStreaming = false;
          try {
            const stream = await Promise.race([
              ai.models.generateContentStream({
                model: modelName,
                contents: [
                  ...history.map((m) => ({
                    role: m.role,
                    parts: m.parts,
                  })),
                  { role: "user", parts: [{ text: promptWithUrl }] },
                ],
                config: {
                  systemInstruction: SYSTEM_INSTRUCTION,
                },
              }),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("MODEL_TIMEOUT")), MODEL_TIMEOUT_MS)
              ),
            ]);
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.setHeader("Cache-Control", "no-cache, no-transform");
            res.setHeader("Connection", "keep-alive");

            let fullText = "";
            for await (const chunk of stream as any) {
              const chunkText =
                typeof chunk?.text === "string"
                  ? chunk.text
                  : typeof chunk?.candidates?.[0]?.content?.parts?.[0]?.text === "string"
                    ? chunk.candidates[0].content.parts[0].text
                    : "";
              if (chunkText) {
                startedStreaming = true;
                fullText += chunkText;
                res.write(chunkText);
              }
            }
            if (!fullText) {
              res.write("Izvinite, došlo je do greške u obradi poruke.");
            }
            res.end();
            return;
          } catch (modelError: any) {
            if (startedStreaming) {
              throw modelError;
            }
            lastModelError = modelError;
            const message = String(modelError?.message || "").toLowerCase();
            const isNotFound = message.includes("not found") || message.includes("unsupported");
            const isQuotaExceeded = message.includes("429") || message.includes("quota") || message.includes("resource_exhausted") || message.includes("rate limit");
            const isServiceUnavailable = message.includes("503") || message.includes("unavailable") || message.includes("high demand");
            const isTransientTimeout = message.includes("model_timeout") || message.includes("deadline") || message.includes("timed out") || message.includes("etimedout");
            if ((isQuotaExceeded || isServiceUnavailable || isTransientTimeout) && attempt < RETRY_MAX_ATTEMPTS) {
              const calculatedDelay = RETRY_BASE_MS * Math.pow(2, attempt - 1) + attempt * 150;
              const retryDelayMs = Math.min(RETRY_MAX_DELAY_MS, extractRetryDelayMs(message) ?? calculatedDelay);
              await sleep(retryDelayMs);
              continue;
            }
            if (!isNotFound && !isQuotaExceeded) {
              throw modelError;
            }
            break;
          }
        }
      }

      throw lastModelError;
    } catch (error: any) {
      console.error("Gemini server error full object:", error);
      console.error("Gemini server error message:", error?.message);
      if (res.headersSent) {
        res.end();
        return;
      }
      const message = String(error?.message || "").toLowerCase();
      const isQuotaExceeded = message.includes("429") || message.includes("quota") || message.includes("resource_exhausted");
      const isServiceUnavailable = message.includes("503") || message.includes("unavailable") || message.includes("high demand");
      if (isQuotaExceeded) {
        return res.status(429).json({ message: "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo." });
      }
      if (isServiceUnavailable) {
        return res.status(503).json({ message: "Model je trenutno pod velikim opterećenjem. Molimo pokušajte ponovo za nekoliko trenutaka." });
      }
      if (message.includes("model_timeout")) {
        return res.status(504).json({ message: "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka." });
      }
      return res.status(500).json({ message: "Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte ponovo za nekoliko trenutaka.", error: error?.message });
    }
  });

  return httpServer;
}
