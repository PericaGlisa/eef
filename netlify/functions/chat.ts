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

const SYSTEM_INSTRUCTION_SR_ULTRA = `
EEF asistent: B2B HVAC, industrijsko hlađenje.
Kontakt: ${KNOWLEDGE_BASE.CONTACT_INFO.address} | ${KNOWLEDGE_BASE.CONTACT_INFO.phones.map(p => p.number).join(', ')} | ${KNOWLEDGE_BASE.CONTACT_INFO.working_hours}
Departmani: ${Object.entries(KNOWLEDGE_BASE.DEPARTMENTS).map(([k, d]: [string, any]) => `${d.title}=${d.contact}`).join(' | ')}
Pravila: bez cena, daj email departmana, fokus na energ.eff+eko (CO2, NH3), kratko odgovore, srpski.
`;

const SYSTEM_INSTRUCTION_EN_ULTRA = `
EEF assistant: B2B HVAC, industrial refrigeration.
Contact: ${KNOWLEDGE_BASE.CONTACT_INFO.address} | ${KNOWLEDGE_BASE.CONTACT_INFO.phones.map(p => p.number).join(', ')} | ${KNOWLEDGE_BASE.CONTACT_INFO.working_hours}
Depts: ${Object.entries(KNOWLEDGE_BASE.DEPARTMENTS).map(([k, d]: [string, any]) => `${d.title}=${d.contact}`).join(' | ')}
Rules: no pricing, give dept email, energy eff+eco focus (CO2, NH3), short answers.
`;

function isCompactModel(modelName: string) {
  return modelName.startsWith("groq/compound") || modelName.includes("-mini") || modelName.includes("-20b");
}

const GROQ_PAYLOAD_CHAR_LIMIT = 22000;
const GROQ_JSON_SIZE_LIMIT = 27000;
const CLIENT_MAX_MESSAGES_HARD_LIMIT = 12;
const JSON_OVERHEAD_FACTOR = 1.35;

function estimateChars(messages: { role: string; content: string }[]) {
  let total = 0;
  for (const m of messages) total += (m.content || "").length + (m.role || "").length + 8;
  return Math.round(total * JSON_OVERHEAD_FACTOR);
}

function trimHistoryForContext(history: any[], maxPairs = 3) {
  const maxMsgs = maxPairs * 2;
  if (history.length <= maxMsgs) return history;
  const trimmed = history.slice(-maxMsgs);
  while (trimmed.length > 0 && trimmed[0].role === "assistant") trimmed.shift();
  return trimmed;
}

function trimMessageContent(msg: any, maxChars = 2000, isLastUser = false) {
  if (!msg || typeof msg.content !== "string") return msg;
  const limit = isLastUser ? Math.min(maxChars * 2, 8000) : maxChars;
  if (msg.content.length <= limit) return msg;
  const note = isLastUser ? "\n... [sadržaj skraćen - dužina poruke prevelika]" : "\n... [sadržaj skraćen zbog dužine]";
  return { ...msg, content: msg.content.slice(0, limit) + note };
}

function coercePayloadToLimit(messages: any[], systemCharLen: number, limit: number) {
  let chars = systemCharLen + estimateChars(messages);
  if (chars <= limit) return messages;

  let out = [...messages];
  let pairs = 2;
  while (out.length > pairs * 2) {
    out = trimHistoryForContext(out, pairs);
    chars = systemCharLen + estimateChars(out);
    if (chars <= limit) break;
    pairs = Math.max(1, pairs - 1);
  }

  if (chars > limit) {
    const lastIdx = out.length - 1;
    out = out.map((m, i) => trimMessageContent(m, 250, i === lastIdx && m.role === "user"));
    chars = systemCharLen + estimateChars(out);
  }

  if (chars > limit) {
    const sys = out.find(m => m.role === "system");
    const lastUser = [...out].reverse().find(m => m.role === "user");
    const parts: any[] = [];
    if (sys) parts.push({ ...sys, content: (sys.content || "").slice(0, 900) });
    if (lastUser) parts.push({ ...lastUser, content: (lastUser.content || "").slice(0, 1800) });
    out = parts;
  }

  if (estimateChars(out) > limit && out.length > 0) {
    const last = out[out.length - 1];
    out = [{ ...last, content: (last.content || "").slice(0, 1500) }];
  }

  return out;
}

function finalJsonClip(bodyObj: any, maxBytes: number) {
  let json = JSON.stringify(bodyObj);
  if (Buffer.byteLength(json, "utf8") <= maxBytes) return bodyObj;
  const msgs: any[] = bodyObj.messages || [];
  const lastUserIdx = [...msgs].reverse().findIndex(m => m.role === "user");
  const lui = lastUserIdx >= 0 ? msgs.length - 1 - lastUserIdx : -1;
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < msgs.length; i++) {
      if (!msgs[i] || typeof msgs[i].content !== "string") continue;
      const isLastUser = i === lui;
      const cuts = [800, 500, 300, 180];
      msgs[i] = { ...msgs[i], content: msgs[i].content.slice(0, cuts[Math.min(pass, cuts.length - 1)] * (isLastUser ? 2 : 1)) };
    }
    const b = { ...bodyObj, messages: msgs };
    json = JSON.stringify(b);
    if (Buffer.byteLength(json, "utf8") <= maxBytes) return b;
  }
  const mini = {
    model: bodyObj.model,
    max_tokens: bodyObj.max_tokens,
    temperature: bodyObj.temperature,
    messages: msgs.length > 0 ? [msgs[msgs.length - 1]] : [],
  };
  return mini;
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

    // HARD LIMIT: uzmi samo poslednjih 14 poruka (7 parova) - sprečavamo ogroman payload
    const recent = messages.length > CLIENT_MAX_MESSAGES_HARD_LIMIT
      ? messages.slice(-CLIENT_MAX_MESSAGES_HARD_LIMIT)
      : messages;
    const normalized = recent
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

    let lastModelError: any;
    let everHit413 = false;

    for (let modelIdx = 0; modelIdx < MODEL_CANDIDATES.length; modelIdx++) {
      const modelName = MODEL_CANDIDATES[modelIdx];
      for (let attempt = 1; attempt <= RETRY_MAX_ATTEMPTS; attempt++) {
        try {
          const compactModel = isCompactModel(modelName);
          const ultra = everHit413;
          const compact = compactModel || everHit413;
          let systemInstruction: string;
          if (ultra) {
            systemInstruction = isEnglish ? SYSTEM_INSTRUCTION_EN_ULTRA : SYSTEM_INSTRUCTION_SR_ULTRA;
          } else if (compactModel) {
            systemInstruction = isEnglish ? SYSTEM_INSTRUCTION_EN_COMPACT : SYSTEM_INSTRUCTION_SR_COMPACT;
          } else {
            systemInstruction = isEnglish ? SYSTEM_INSTRUCTION_EN : SYSTEM_INSTRUCTION_SR;
          }

          const pairsDefault = ultra ? 1 : (compactModel ? 2 : 4);
          const pairsForRound = pairsDefault;

          const historyFull = trimHistoryForContext(historyRaw, pairsForRound);
          const historyTrimmed = historyFull.map((m) =>
            trimMessageContent(m, ultra ? 500 : (compactModel ? 900 : 1600), false)
          );

          const userContentLimit = ultra ? 1500 : (compactModel ? 2000 : 3200);
          const lastMessage = (lastMessageRaw && lastMessageRaw.length > userContentLimit)
            ? lastMessageRaw.slice(0, userContentLimit) + "\n... [skraćeno]"
            : lastMessageRaw;

          const promptWithUrl = historyTrimmed.length === 0
            ? (isEnglish
                ? `Based on the website https://eef.rs/, answer: ${lastMessage}`
                : `Na osnovu sajta https://eef.rs/, odgovori na: ${lastMessage}`)
            : lastMessage;

          let groqMessages: any[] = [
            { role: "system", content: systemInstruction },
            ...historyTrimmed,
            { role: "user", content: promptWithUrl },
          ];

          groqMessages = coercePayloadToLimit(groqMessages, 0, GROQ_PAYLOAD_CHAR_LIMIT);
          if (estimateChars(groqMessages) > GROQ_PAYLOAD_CHAR_LIMIT) {
            const u = groqMessages[groqMessages.length - 1]?.content || "";
            groqMessages = [{ role: "user", content: u.slice(0, Math.min(4000, u.length)) }];
          }

          let bodyObj: any = {
            model: modelName,
            messages: groqMessages,
            max_tokens: ultra ? 350 : (compact ? 550 : 800),
            temperature: 0.7,
          };
          bodyObj = finalJsonClip(bodyObj, GROQ_JSON_SIZE_LIMIT);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), MODEL_TIMEOUT_MS);

          const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObj),
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
          const isRequestTooLarge = status === 413 || message.includes("413") || message.includes("request_too_large") || message.includes("too large") || message.includes("entity too large") || message.includes("predugo");
          if (isRequestTooLarge) everHit413 = true;

          const isQuotaExceeded = status === 429 || message.includes("429") || message.includes("quota") || message.includes("resource_exhausted") || message.includes("rate limit");
          const isServiceUnavailable = status === 503 || message.includes("503") || message.includes("unavailable") || message.includes("high demand");
          const isTransientTimeout = modelError?.name === "AbortError" || message.includes("model_timeout") || message.includes("deadline") || message.includes("timed out") || message.includes("etimedout");

          if (isRequestTooLarge) {
            attempt = RETRY_MAX_ATTEMPTS; // ne retry-uj isti payload
            break;
          }
          if ((isQuotaExceeded || isServiceUnavailable || isTransientTimeout) && attempt < RETRY_MAX_ATTEMPTS) {
            const calculatedDelay = RETRY_BASE_MS * Math.pow(2, attempt - 1) + attempt * 150;
            const retryDelayMs = Math.min(RETRY_MAX_DELAY_MS, extractRetryDelayMs(message) ?? calculatedDelay);
            await sleep(retryDelayMs);
            continue;
          }
          if (!isNotFound && !isQuotaExceeded && !isRequestTooLarge) {
            throw modelError;
          }
          break;
        }
      }
    }

    throw lastModelError;
  } catch (error: any) {
    console.error("Groq server error:", error?.message || error);
    const errMsgFull = String(error?.message || "");
    const lowerMsg = errMsgFull.toLowerCase();
    const errStatus = Number(error?.status) || 0;
    const isRequestTooLarge = errStatus === 413 || lowerMsg.includes("413") || lowerMsg.includes("request_too_large") || lowerMsg.includes("too large") || lowerMsg.includes("entity too large") || lowerMsg.includes("predugo");
    if (isRequestTooLarge) {
      const msgSR = "Istorija razgovora je predugačka. Molimo obrišite istoriju chata (kanta) i pokušajte ponovo.";
      const msgEN = "Conversation history is too long. Please clear the chat history (trash) and try again.";
      return jsonResponse(413, { message: isEnglish ? msgEN : msgSR });
    }
    const isQuotaExceeded = lowerMsg.includes("429") || lowerMsg.includes("quota") || lowerMsg.includes("resource_exhausted");
    const isServiceUnavailable = lowerMsg.includes("503") || lowerMsg.includes("unavailable") || lowerMsg.includes("high demand");
    if (isQuotaExceeded) {
      return jsonResponse(429, { message: isEnglish ? "I currently have too many requests. Please wait a minute and try again." : "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo." });
    }
    if (isServiceUnavailable) {
      return jsonResponse(503, { message: isEnglish ? "The model is currently under heavy load. Please try again in a few moments." : "Model je trenutno pod velikim opterećenjem. Molimo pokušajte ponovo za nekoliko trenutaka." });
    }
    if (lowerMsg.includes("model_timeout") || error?.name === "AbortError") {
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
