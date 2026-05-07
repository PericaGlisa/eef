import { Handler } from "@netlify/functions";

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const jsonResponse = (statusCode: number, body: any) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async (event) => {
  console.log("[chat-transcript] Function triggered");
  
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    let rawBody = event.body;
    if (event.isBase64Encoded && rawBody) {
      rawBody = Buffer.from(rawBody, 'base64').toString();
    }
    
    const { messages } = JSON.parse(rawBody || "{}");
    console.log("[chat-transcript] Received messages:", Array.isArray(messages) ? messages.length : "invalid");
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return jsonResponse(400, { error: "Invalid messages" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[chat-transcript] RESEND_API_KEY not configured in Netlify environment variables");
      return jsonResponse(500, { error: "Email service not configured (API Key missing)" });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "office@eef.rs";
    const fromEnv = process.env.RESEND_FROM || "noreply@eef.co.rs";
    
    // Ensure from field is correctly formatted and not double-nested
    // If fromEnv already contains <...>, use it as is, otherwise wrap it
    const from = fromEnv.includes('<') ? fromEnv : `Eko Elektrofrigo Chat <${fromEnv}>`;
    
    console.log("[chat-transcript] Config - To:", adminEmail, "| From:", from);

    // Format messages into HTML
    const messagesHtml = messages
      .map((msg: ChatMessage) => {
        const role = msg.role === "user" ? "Korisnik" : "AI Asistent";
        const bgColor = msg.role === "user" ? "#f0f9ff" : "#f0fdf4";
        const borderColor = msg.role === "user" ? "#3b82f6" : "#10b981";
        const time = new Date(msg.timestamp).toLocaleTimeString("sr-RS", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
          <div style="margin-bottom: 16px; padding: 12px; background: ${bgColor}; border-left: 3px solid ${borderColor}; border-radius: 4px;">
            <div style="font-size: 11px; font-weight: bold; color: ${borderColor}; margin-bottom: 4px; text-transform: uppercase;">
              ${role} • ${time}
            </div>
            <div style="font-size: 14px; color: #1f2937; line-height: 1.5;">
              ${msg.text.replace(/\n/g, "<br>")}
            </div>
          </div>
        `;
      })
      .join("");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #171A54 0%, #56AA4A 100%); padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">💬 Chat Transkript</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Nova prepiska sa AI asistentom</p>
        </div>
        
        <div style="padding: 24px; background: #ffffff;">
          <div style="background: #f3f4f6; padding: 12px; border-radius: 6px; margin-bottom: 24px; font-size: 13px; color: #6b7280;">
            <div><strong>Datum:</strong> ${new Date().toLocaleDateString("sr-RS")}</div>
            <div><strong>Ukupno poruka:</strong> ${messages.length}</div>
            <div><strong>Trajanje:</strong> ${Math.round((new Date(messages[messages.length - 1].timestamp).getTime() - new Date(messages[0].timestamp).getTime()) / 60000)} min</div>
          </div>
          
          ${messagesHtml}
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;">
            <p>Ovaj email je automatski generisan sa eef.rs</p>
          </div>
        </div>
      </div>
    `;

    console.log("[chat-transcript] Sending request to Resend API...");
    const resendPayload = {
      from,
      to: [adminEmail],
      subject: `💬 Chat Transkript - ${new Date().toLocaleDateString("sr-RS")}`,
      html,
    };
    console.log("[chat-transcript] Resend payload from:", resendPayload.from);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    if (response.ok) {
      console.log("[chat-transcript] Resend API success");
      return jsonResponse(200, { success: true });
    } else {
      const errorText = await response.text();
      console.error("[chat-transcript] Resend API error:", response.status, errorText);
      return jsonResponse(500, { error: "Failed to send email via Resend API", details: errorText });
    }
  } catch (error: any) {
    console.error("[chat-transcript] Critical error:", error);
    return jsonResponse(500, { error: "Internal server error", message: error?.message });
  }
};
