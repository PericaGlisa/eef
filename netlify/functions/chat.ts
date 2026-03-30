import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE } from "../../server/chatKnowledgeBase";

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
const MODEL_TIMEOUT_MS = Math.max(3000, Math.min(8000, Number(process.env.GEMINI_MODEL_TIMEOUT_MS || 7000)));
const RETRY_MAX_ATTEMPTS = Math.max(1, Math.min(2, Number(process.env.GEMINI_RETRY_MAX_ATTEMPTS || 1)));
const RETRY_BASE_MS = Math.max(200, Math.min(1500, Number(process.env.GEMINI_RETRY_BASE_MS || 700)));

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

function jsonResponse(statusCode: number, payload: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}

export async function handler(event: { httpMethod?: string; body?: string | null }) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method Not Allowed" });
  }

  try {
    let payload: { messages?: any[] };
    try {
      payload = event.body ? JSON.parse(event.body) : {};
    } catch {
      return jsonResponse(400, { message: "Neispravan format zahteva." });
    }

    const { messages } = payload;
    if (!Array.isArray(messages)) {
      return jsonResponse(400, { message: "Neispravan format poruka." });
    }

    const filteredMessages = messages.filter((m, index) => {
      if (index === 0 && m.role === 'model') return false;
      return true;
    });

    if (filteredMessages.length === 0) {
      return jsonResponse(200, { text: "Izvinite, došlo je do greške u obradi poruke." });
    }

    const lastMessage = filteredMessages[filteredMessages.length - 1].parts[0].text;
    const history = filteredMessages.slice(0, -1);

    const promptWithUrl = history.length === 0 
      ? `Na osnovu sajta https://eef.rs/, odgovori na: ${lastMessage}`
      : lastMessage;

    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return jsonResponse(500, { message: "GEMINI_API_KEY nije definisan u Netlify Environment varijablama." });
    }

    console.log("Gemini API key loaded.");

    const ai = new GoogleGenAI({ apiKey });
    let lastModelError: any;

    for (const modelName of MODEL_CANDIDATES) {
      for (let attempt = 1; attempt <= RETRY_MAX_ATTEMPTS; attempt++) {
        try {
          const response = await Promise.race([
            ai.models.generateContent({
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
          return jsonResponse(200, { text: response.text || "Izvinite, došlo je do greške u obradi poruke." });
        } catch (modelError: any) {
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
    const message = String(error?.message || "").toLowerCase();
    const isQuotaExceeded = message.includes("429") || message.includes("quota") || message.includes("resource_exhausted");
    if (isQuotaExceeded) {
      return jsonResponse(429, { message: "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo." });
    }
    if (message.includes("model_timeout")) {
      return jsonResponse(504, { message: "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka." });
    }
    return jsonResponse(500, { message: "Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte ponovo za nekoliko trenutaka.", error: error?.message });
  }
}
