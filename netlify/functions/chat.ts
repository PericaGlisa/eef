import { KNOWLEDGE_BASE } from "../../server/chatKnowledgeBase";

const SYSTEM_INSTRUCTION_SR = `
Ti si vrhunski komercijalno-mašinski inženjer i asistent kompanije Eko Elektrofrigo (eef.rs).
Tvoja specijalnost su B2B HVAC rešenja (grejanje, ventilacija, klimatizacija) i industrijsko hlađenje.

BAZA ZNANJA - KLJUČNE INFORMACIJE:
- Kompanija: ${KNOWLEDGE_BASE.COMPANY_PROFILE.name}, osnovana ${KNOWLEDGE_BASE.COMPANY_PROFILE.founded}
- Specijalizacija: ${KNOWLEDGE_BASE.COMPANY_PROFILE.specialization}
- Kontakt: ${KNOWLEDGE_BASE.CONTACT_INFO.address}, Tel: ${KNOWLEDGE_BASE.CONTACT_INFO.phones.map(p => p.number).join(', ')}
- Radno vreme: ${KNOWLEDGE_BASE.CONTACT_INFO.working_hours}

DEPARTMANI ZA USMERAVANJE:
${Object.entries(KNOWLEDGE_BASE.DEPARTMENTS).map(([key, dept]: [string, any]) => 
  `- ${dept.title}: ${dept.contact} (${dept.focus})`
).join('\n')}

STRUČNA REŠENJA:
${KNOWLEDGE_BASE.EKO_RASHALDE_SOLUTIONS.OVERVIEW}

USLUGE:
${KNOWLEDGE_BASE.SERVICES.LIST.map(s => `- ${s.name}: ${s.description.substring(0, 80)}...`).join('\n')}

ZABRANJENE TEME:
${KNOWLEDGE_BASE.RESTRICTIONS.FORBIDDEN_TOPICS.map(t => `- ${t}`).join('\n')}

PRAVILA PONAŠANJA:
${KNOWLEDGE_BASE.RESTRICTIONS.MANDATORY_BEHAVIOR.map(b => `- ${b}`).join('\n')}

JEZIČKA PRAVILA:
- PRIMARNI: Srpski (ekavica, latinica) sa savršenom gramatikom
- POLIGLOTA: Prilagodi se jeziku korisnika
- TERMINOLOGIJA: Koristi srpske HVAC termine (NE hrvatske)

TON KOMUNIKACIJE:
- Profesionalan ali TOPAO i PRISTUPAČAN (ne robotski)
- Koristi prirodan srpski jezik kao da pričaš sa kolegom inženjerom
- Budi KONCIZAN ali KORISAN - ne previše opširan
- Koristi tehničku terminologiju gde je prikladno, ali OBJASNI ako je potrebno
- Izbegavaj suvoparan, birokratski stil

PRIMERI PRIRODNOG GOVORA:
✅ "Naši rashladni agregati koriste najnoviju CO2 tehnologiju..."
✅ "Preporučujem vam ULO komoru za dugotrajno čuvanje voća..."
❌ "Kompanija nudi rešenja koja obuhvataju implementaciju sistema..." (previše formalno)
❌ "Sistem se karakteriše visokim stepenom efikasnosti..." (robotski)

VAŽNO:
- NIKADA ne daj cene ili sklapaj poslove
- Uvek usmeri na odgovarajući departman za konkretne upite
- Naglašavaj energetsku efikasnost i ekološku održivost
- Tehničke preporuke su INFORMATIVNE - finalni projekat radi stručni tim

OSNIVAČ: Zlatomir Damnjanović - pionir industrijskog hlađenja u Srbiji.
`;

const SYSTEM_INSTRUCTION_EN = `
You are a top-tier commercial-mechanical engineer and assistant for Eko Elektrofrigo (eef.rs).
Your specialty is B2B HVAC solutions (heating, ventilation, air conditioning) and industrial refrigeration.

KNOWLEDGE BASE - KEY INFORMATION:
- Company: ${KNOWLEDGE_BASE.COMPANY_PROFILE.name}, founded ${KNOWLEDGE_BASE.COMPANY_PROFILE.founded}
- Specialization: Industrial refrigeration, HVAC engineering, cold storage solutions
- Contact: ${KNOWLEDGE_BASE.CONTACT_INFO.address}, Tel: ${KNOWLEDGE_BASE.CONTACT_INFO.phones.map(p => p.number).join(', ')}
- Working hours: ${KNOWLEDGE_BASE.CONTACT_INFO.working_hours}

DEPARTMENTS:
${Object.entries(KNOWLEDGE_BASE.DEPARTMENTS).map(([key, dept]: [string, any]) => 
  `- ${dept.title}: ${dept.contact} (${dept.focus})`
).join('\n')}

SOLUTIONS:
${KNOWLEDGE_BASE.EKO_RASHALDE_SOLUTIONS.OVERVIEW}

SERVICES:
${KNOWLEDGE_BASE.SERVICES.LIST.map(s => `- ${s.name}: ${s.description.substring(0, 80)}...`).join('\n')}

FORBIDDEN TOPICS:
${KNOWLEDGE_BASE.RESTRICTIONS.FORBIDDEN_TOPICS.map(t => `- ${t}`).join('\n')}

BEHAVIOR RULES:
${KNOWLEDGE_BASE.RESTRICTIONS.MANDATORY_BEHAVIOR.map(b => `- ${b}`).join('\n')}

LANGUAGE RULES:
- PRIMARY: English with perfect grammar
- Use industry-standard HVAC terminology in English

COMMUNICATION TONE:
- Professional yet WARM and APPROACHABLE (not robotic)
- Use natural English as if talking to a fellow engineer
- Be CONCISE but HELPFUL - not overly verbose

IMPORTANT:
- NEVER provide pricing or close deals
- Always direct to the appropriate department for specific inquiries
- Emphasize energy efficiency and environmental sustainability
- Technical recommendations are INFORMATIONAL - the expert team handles final design

FOUNDER: Zlatomir Damnjanović - pioneer of industrial refrigeration in Serbia.
`;

const SYSTEM_INSTRUCTION_SR_COMPACT = `
Ti si asistent kompanije Eko Elektrofrigo (eef.rs), stručnjak za B2B HVAC i industrijsko hlađenje.

OSNOVNO:
- Kompanija: ${KNOWLEDGE_BASE.COMPANY_PROFILE.name}, osn. ${KNOWLEDGE_BASE.COMPANY_PROFILE.founded}
- Specijalizacija: ${KNOWLEDGE_BASE.COMPANY_PROFILE.specialization}
- Adresa: ${KNOWLEDGE_BASE.CONTACT_INFO.address}, Tel: ${KNOWLEDGE_BASE.CONTACT_INFO.phones.map(p => p.number).join(', ')}
- Radno vreme: ${KNOWLEDGE_BASE.CONTACT_INFO.working_hours}
- Osnivač: Zlatomir Damnjanović (pionir industrijskog hlađenja u Srbiji)

DEPARTMANI - OBAVEZNO USMERI KONTAKT:
${Object.entries(KNOWLEDGE_BASE.DEPARTMENTS).map(([key, dept]: [string, any]) => 
  `- ${dept.title} → ${dept.contact} (${dept.focus})`
).join('\n')}

PRAVILA:
- NIKADA ne daj cene, ne sklapaj poslove
- Za upite: uvek daj E-MAIL odgovarajućeg departmana
- Naglašavaj: ENERGETSKU EFIKASNOST + EKOLOŠKU ODRŽIVOST (CO2, Amonijak)
- Teh. preporuke su INFORMATIVNE, finalni projekat radi stručni tim
- Jezik: SRPSKI (ekavica, LATINICA), profesionalan ali topao
- Ako tema van HVAC/hlađenja → ljubazno odbij
- Budi kratak i koristan
`;

const SYSTEM_INSTRUCTION_EN_COMPACT = `
Assistant for Eko Elektrofrigo (eef.rs), B2B HVAC and industrial refrigeration expert.

BASICS:
- Company: ${KNOWLEDGE_BASE.COMPANY_PROFILE.name}, founded ${KNOWLEDGE_BASE.COMPANY_PROFILE.founded}
- Specialization: ${KNOWLEDGE_BASE.COMPANY_PROFILE.specialization}
- Address: ${KNOWLEDGE_BASE.CONTACT_INFO.address}, Tel: ${KNOWLEDGE_BASE.CONTACT_INFO.phones.map(p => p.number).join(', ')}
- Hours: ${KNOWLEDGE_BASE.CONTACT_INFO.working_hours}
- Founder: Zlatomir Damnjanović (pioneer of industrial refrigeration in Serbia)

DEPARTMENTS - ALWAYS PROVIDE CONTACT:
${Object.entries(KNOWLEDGE_BASE.DEPARTMENTS).map(([key, dept]: [string, any]) => 
  `- ${dept.title} → ${dept.contact} (${dept.focus})`
).join('\n')}

RULES:
- NEVER give prices or close deals
- Always provide the CORRECT DEPARTMENT EMAIL for inquiries
- Emphasize: ENERGY EFFICIENCY + ECOLOGY (CO2, Ammonia)
- Technical advice is INFORMATIONAL only - expert team does final design
- Language: Professional yet warm, concise
- If outside HVAC/refrigeration → politely refuse
`;

function isCompactModel(modelName: string) {
  return modelName.startsWith("groq/compound");
}

function trimHistoryForContext(history: any[], maxPairs = 3) {
  const maxMsgs = maxPairs * 2;
  if (history.length <= maxMsgs) return history;
  const trimmed = history.slice(-maxMsgs);
  while (trimmed.length > 0 && trimmed[0].role === "assistant") trimmed.shift();
  return trimmed;
}

function trimMessageContent(msg: any, maxChars = 1500) {
  if (!msg || typeof msg.content !== "string") return msg;
  if (msg.content.length <= maxChars) return msg;
  return { ...msg, content: msg.content.slice(0, maxChars) + "\n... [sadržaj skraćen zbog dužine]" };
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_CANDIDATES = ["groq/compound", "groq/compound-mini", "openai/gpt-oss-20b", "openai/gpt-oss-120b", "qwen/qwen3.6-27b"];
const MODEL_TIMEOUT_MS = Math.max(6000, Math.min(20000, Number(process.env.GROQ_MODEL_TIMEOUT_MS || 14000)));
const RETRY_MAX_ATTEMPTS = Math.max(1, Math.min(3, Number(process.env.GROQ_RETRY_MAX_ATTEMPTS || 2)));
const RETRY_BASE_MS = Math.max(300, Math.min(3000, Number(process.env.GROQ_RETRY_BASE_MS || 900)));
const RETRY_MAX_DELAY_MS = Math.max(1000, Math.min(8000, Number(process.env.GROQ_RETRY_MAX_DELAY_MS || 5000)));

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

export async function handler(event: { httpMethod?: string; body?: string | null; headers?: Record<string, string>; path?: string }) {
  if (event.httpMethod === "GET" && event.path === "/.netlify/functions/chat-diagnostic") {
    return handleDiagnostic();
  }
  
  // Basic origin check (not foolproof, but adds a layer)
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const allowedOrigins = [
    'https://eef.rs',
    'https://www.eef.rs',
    process.env.NETLIFY_SITE_NAME ? `https://${process.env.NETLIFY_SITE_NAME}.netlify.app` : '',
    'http://localhost:5173',
    'http://localhost:5174',
  ].filter(Boolean);
  
  if (origin && !allowedOrigins.includes(origin)) {
    console.warn(`⚠️ Blocked request from unauthorized origin: ${origin}`);
    // Still allow it, but log the warning
    // This is just a soft check, not a security feature
  }
  
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method Not Allowed" });
  }

  let isEnglish = false;
  try {
    let payload: { messages?: any[]; language?: string };
    try {
      payload = event.body ? JSON.parse(event.body) : {};
    } catch {
      return jsonResponse(400, { message: "Neispravan format zahteva." });
    }

    const { messages, language } = payload;
    isEnglish = language === "en";
    if (!Array.isArray(messages)) {
      return jsonResponse(400, { message: "Neispravan format poruka." });
    }

    // Normalize messages: support both old Gemini format (parts) and new OpenAI format (content)
    const normalized = messages
      .map((m: any) => {
        const role = m.role === 'model' ? 'assistant' : m.role;
        const content = m.content || m.parts?.[0]?.text || '';
        return { role, content };
      })
      .filter((m: any) => m.content);

    // Remove leading assistant messages (first message must be user)
    while (normalized.length > 0 && normalized[0].role === 'assistant') {
      normalized.shift();
    }

    if (normalized.length === 0) {
      return jsonResponse(200, { text: isEnglish ? "Sorry, an error occurred processing the message." : "Izvinite, došlo je do greške u obradi poruke." });
    }

    const lastMessageRaw = normalized[normalized.length - 1].content;
    const historyRaw = normalized.slice(0, -1);

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      return jsonResponse(500, { message: isEnglish ? "GROQ_API_KEY is not defined in Netlify Environment variables." : "GROQ_API_KEY nije definisan u Netlify Environment varijablama." });
    }

    console.log("Groq API key loaded.");

    let lastModelError: any;

    for (const modelName of MODEL_CANDIDATES) {
      for (let attempt = 1; attempt <= RETRY_MAX_ATTEMPTS; attempt++) {
        try {
          const compact = isCompactModel(modelName);
          const systemInstruction = isEnglish
            ? (compact ? SYSTEM_INSTRUCTION_EN_COMPACT : SYSTEM_INSTRUCTION_EN)
            : (compact ? SYSTEM_INSTRUCTION_SR_COMPACT : SYSTEM_INSTRUCTION_SR);

          const historyFull = trimHistoryForContext(historyRaw, compact ? 3 : 5);
          const historyTrimmed = historyFull.map(m => trimMessageContent(m, compact ? 1500 : 2500));

          const lastMessage = (lastMessageRaw && lastMessageRaw.length > (compact ? 3000 : 5000))
            ? lastMessageRaw.slice(0, compact ? 3000 : 5000) + "\n... [skraćeno]"
            : lastMessageRaw;

          const promptWithUrl = historyTrimmed.length === 0
            ? (isEnglish
                ? `Based on the website https://eef.rs/, answer: ${lastMessage}`
                : `Na osnovu sajta https://eef.rs/, odgovori na: ${lastMessage}`)
            : lastMessage;

          const groqMessages = [
            { role: "system", content: systemInstruction },
            ...historyTrimmed,
            { role: "user", content: promptWithUrl },
          ];

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), MODEL_TIMEOUT_MS);

          const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: modelName,
              messages: groqMessages,
              max_tokens: compact ? 768 : 1024,
              temperature: 0.7,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!response.ok) {
            const errorBody = await response.text();
            const err = new Error(`Groq API error ${response.status}: ${errorBody}`);
            (err as any).status = response.status;
            throw err;
          }

          const data = await response.json();
          const text = data.choices?.[0]?.message?.content || (isEnglish ? "Sorry, an error occurred processing the message." : "Izvinite, došlo je do greške u obradi poruke.");
          return jsonResponse(200, { text });
        } catch (modelError: any) {
          lastModelError = modelError;
          const message = String(modelError?.message || "").toLowerCase();
          const status = modelError?.status || 0;
          const isNotFound = status === 404 || message.includes("not found") || message.includes("unsupported");
          const isQuotaExceeded = status === 429 || message.includes("429") || message.includes("quota") || message.includes("resource_exhausted") || message.includes("rate limit");
          const isServiceUnavailable = status === 503 || message.includes("503") || message.includes("unavailable") || message.includes("high demand");
          const isTransientTimeout = modelError?.name === "AbortError" || message.includes("model_timeout") || message.includes("deadline") || message.includes("timed out") || message.includes("etimedout");
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
    console.error("Groq server error full object:", error);
    console.error("Groq server error message:", error?.message);
    const message = String(error?.message || "").toLowerCase();
    const isQuotaExceeded = message.includes("429") || message.includes("quota") || message.includes("resource_exhausted");
    const isServiceUnavailable = message.includes("503") || message.includes("unavailable") || message.includes("high demand");
    if (isQuotaExceeded) {
      return jsonResponse(429, { message: isEnglish ? "I currently have too many requests. Please wait a minute and try again." : "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo." });
    }
    if (isServiceUnavailable) {
      return jsonResponse(503, { message: isEnglish ? "The model is currently under heavy load. Please try again in a few moments." : "Model je trenutno pod velikim opterećenjem. Molimo pokušajte ponovo za nekoliko trenutaka." });
    }
    if (message.includes("model_timeout") || error?.name === "AbortError") {
      return jsonResponse(504, { message: isEnglish ? "The assistant is responding slower than usual. Please try again in a few moments." : "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka." });
    }
    return jsonResponse(500, { message: isEnglish ? "I am currently unable to respond. Please try again in a few moments." : "Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte ponovo za nekoliko trenutaka.", error: error?.message });
  }
}

async function handleDiagnostic() {
  const apiKey = process.env.GROQ_API_KEY || '';
  
  const diagnosticResult: any = {
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!apiKey,
    apiKeyPreview: apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'NOT_SET',
    connectionTest: {
      success: false,
      responseTime: null as number | null,
      statusCode: null as number | null,
      error: null as string | null,
      model: null as string | null
    },
    environment: {
      netlify: true,
      groqTimeout: MODEL_TIMEOUT_MS,
      retryAttempts: RETRY_MAX_ATTEMPTS
    }
  };

  if (!apiKey) {
    diagnosticResult.connectionTest.error = "GROQ_API_KEY nije definisan u Netlify Environment varijablama";
    return jsonResponse(500, diagnosticResult);
  }

  try {
    const startTime = Date.now();
    const testModel = MODEL_CANDIDATES[0];
    
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: testModel,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Respond with just the word OK in English." }
        ],
        max_tokens: 10,
        temperature: 0,
      }),
    });
    
    const responseTime = Date.now() - startTime;
    diagnosticResult.connectionTest.responseTime = responseTime;
    diagnosticResult.connectionTest.statusCode = response.status;
    diagnosticResult.connectionTest.model = testModel;

    if (!response.ok) {
      const errorBody = await response.text();
      diagnosticResult.connectionTest.error = `Groq API error ${response.status}: ${errorBody}`;
      return jsonResponse(response.status, diagnosticResult);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    
    diagnosticResult.connectionTest.success = true;
    diagnosticResult.connectionTest.error = null;
    diagnosticResult.testResponse = reply.trim();

    console.log("✓ Groq API diagnostic test passed", {
      status: response.status,
      responseTime,
      model: testModel
    });

    return jsonResponse(200, diagnosticResult);
  } catch (error: any) {
    diagnosticResult.connectionTest.error = error?.message || "Unknown error";
    console.error("✗ Groq API diagnostic test failed:", error);
    return jsonResponse(500, diagnosticResult);
  }
}
