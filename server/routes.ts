import type { Express } from "express";
import { type Server } from "http";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE } from "./chatKnowledgeBase";

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
const MODEL_TIMEOUT_MS = Math.max(10000, Number(process.env.GEMINI_MODEL_TIMEOUT_MS || 45000));
const RETRY_MAX_ATTEMPTS = Math.max(1, Number(process.env.GEMINI_RETRY_MAX_ATTEMPTS || 3));
const RETRY_BASE_MS = Math.max(200, Number(process.env.GEMINI_RETRY_BASE_MS || 1200));

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

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
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

    const text = filledFields.map(([key, value]) => `${key}: ${value}`).join("\n");
    const html = filledFields
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("");

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
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(502).json({ message: "Resend greška.", details });
    }

    return res.status(200).json({ ok: true });
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
            if (isQuotaExceeded && attempt < RETRY_MAX_ATTEMPTS) {
              const retryDelayMs = extractRetryDelayMs(message) ?? RETRY_BASE_MS * Math.pow(2, attempt - 1);
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
      if (isQuotaExceeded) {
        return res.status(429).json({ message: "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo." });
      }
      if (message.includes("model_timeout")) {
        return res.status(504).json({ message: "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka." });
      }
      return res.status(500).json({ message: "Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte ponovo za nekoliko trenutaka.", error: error?.message });
    }
  });

  return httpServer;
}
