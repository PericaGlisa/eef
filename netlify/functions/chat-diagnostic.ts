import { KNOWLEDGE_BASE } from "../../server/chatKnowledgeBase";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_CANDIDATES = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile"];
const MODEL_TIMEOUT_MS = Math.max(6000, Math.min(20000, Number(process.env.GROQ_MODEL_TIMEOUT_MS || 14000)));
const RETRY_MAX_ATTEMPTS = Math.max(1, Math.min(3, Number(process.env.GROQ_RETRY_MAX_ATTEMPTS || 2)));
const RETRY_BASE_MS = Math.max(300, Math.min(3000, Number(process.env.GROQ_RETRY_BASE_MS || 900)));
const RETRY_MAX_DELAY_MS = Math.max(1000, Math.min(8000, Number(process.env.GROQ_RETRY_MAX_DELAY_MS || 5000)));

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jsonResponse(statusCode: number, payload: unknown) {
  return {
    statusCode,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    },
    body: JSON.stringify(payload),
  };
}

export async function handler(event: { httpMethod?: string; path?: string }) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { message: "Method Not Allowed" });
  }

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
    console.error("❌ [DIAGNOSTIC] API key not configured in Netlify");
    return jsonResponse(500, diagnosticResult);
  }

  try {
    const startTime = Date.now();
    const testModel = MODEL_CANDIDATES[0];
    
    console.log(`📡 [DIAGNOSTIC] Testing connection with model: ${testModel}`);
    
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

    console.log(`📊 [DIAGNOSTIC] Response status: ${response.status}, time: ${responseTime}ms`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`❌ [DIAGNOSTIC] API error: ${response.status} - ${errorBody}`);
      diagnosticResult.connectionTest.error = `Groq API error ${response.status}: ${errorBody}`;
      return jsonResponse(response.status, diagnosticResult);
    }

    const data = await response.json();
    console.log("✅ [DIAGNOSTIC] Got successful response from Groq");
    
    const reply = data.choices?.[0]?.message?.content || '';
    
    diagnosticResult.connectionTest.success = true;
    diagnosticResult.connectionTest.error = null;
    diagnosticResult.testResponse = reply.trim();

    console.log("✓ Groq API diagnostic test passed", {
      status: response.status,
      responseTime,
      model: testModel,
      reply: reply.trim()
    });

    return jsonResponse(200, diagnosticResult);
  } catch (error: any) {
    console.error("✗ [DIAGNOSTIC] Error during test:", error);
    console.error("✗ [DIAGNOSTIC] Error stack:", error?.stack);
    diagnosticResult.connectionTest.error = error?.message || "Unknown error";
    return jsonResponse(500, diagnosticResult);
  }
}
