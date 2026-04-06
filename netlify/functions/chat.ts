import { KNOWLEDGE_BASE } from "../../server/chatKnowledgeBase";

const SYSTEM_INSTRUCTION = `
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

TON: Profesionalan, stručan, autoritativan ali pristupačan.

VAŽNO:
- NIKADA ne daj cene ili sklapaj poslove
- Uvek usmeri na odgovarajući departman za konkretne upite
- Naglašavaj energetsku efikasnost i ekološku održivost
- Tehničke preporuke su INFORMATIVNE - finalni projekat radi stručni tim

OSNIVAČ: Zlatomir Damnjanović - pionir industrijskog hlađenja u Srbiji.
`;

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_CANDIDATES = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile"];
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
      return jsonResponse(200, { text: "Izvinite, došlo je do greške u obradi poruke." });
    }

    const lastMessage = normalized[normalized.length - 1].content;
    const history = normalized.slice(0, -1);

    const promptWithUrl = history.length === 0 
      ? `Na osnovu sajta https://eef.rs/, odgovori na: ${lastMessage}`
      : lastMessage;

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      return jsonResponse(500, { message: "GROQ_API_KEY nije definisan u Netlify Environment varijablama." });
    }

    console.log("Groq API key loaded.");

    const groqMessages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...history,
      { role: "user", content: promptWithUrl },
    ];

    let lastModelError: any;

    for (const modelName of MODEL_CANDIDATES) {
      for (let attempt = 1; attempt <= RETRY_MAX_ATTEMPTS; attempt++) {
        try {
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
              max_tokens: 1024,
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
          const text = data.choices?.[0]?.message?.content || "Izvinite, došlo je do greške u obradi poruke.";
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
      return jsonResponse(429, { message: "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo." });
    }
    if (isServiceUnavailable) {
      return jsonResponse(503, { message: "Model je trenutno pod velikim opterećenjem. Molimo pokušajte ponovo za nekoliko trenutaka." });
    }
    if (message.includes("model_timeout") || error?.name === "AbortError") {
      return jsonResponse(504, { message: "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka." });
    }
    return jsonResponse(500, { message: "Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte ponovo za nekoliko trenutaka.", error: error?.message });
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
