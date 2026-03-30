export async function getChatResponse(
  messages: { role: 'user' | 'model', parts: { text: string }[] }[],
  onChunk?: (partialText: string) => void
) {
  try {
    // On Netlify, we bypass the redirect rules just in case they are failing
    // and call the function directly via its full URL path.
    const isProd = import.meta.env.PROD;
    const apiUrl = isProd ? "/.netlify/functions/chat" : "/api/chat";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000);

    let response: Response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }
    
    if (!response.ok) {
      if (response.status === 429) {
        return "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo.";
      }
      if (response.status === 502) {
        return "Servis je trenutno preopterećen. Molimo pokušajte ponovo za nekoliko trenutaka.";
      }
      if (response.status === 504) {
        return "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka.";
      }

      let errorMsg = `Greška ${response.status}`;
      const clonedResponse = response.clone();
      try {
        const errorData = await response.json();
        if (errorData.message) errorMsg = errorData.message;
        if (errorData.error) errorMsg += ` (${errorData.error})`;
      } catch (e) {
        errorMsg = await clonedResponse.text();
      }
      console.error(`Chat API error status: ${response.status} - ${errorMsg}`);
      
      // Ako u grešci iz samog API-ja piše da je kvota premašena
      if (errorMsg.includes("429") || errorMsg.includes("Quota") || errorMsg.includes("quota") || response.status === 500 && errorMsg.includes("exceeded")) {
         return "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo.";
      }

      return `[DIJAGNOSTIKA]: ${errorMsg}`;
    }

    const contentType = response.headers.get("content-type") || "";
    if (response.body && !contentType.includes("application/json")) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          fullText += decoder.decode(value, { stream: true });
          onChunk?.(fullText);
        }
      }
      const tail = decoder.decode();
      if (tail) {
        fullText += tail;
        onChunk?.(fullText);
      }
      return fullText || "Izvinite, došlo je do greške u obradi poruke.";
    }

    const data = await response.json();
    const text = data.text || "Izvinite, došlo je do greške u obradi poruke.";
    onChunk?.(text);
    return text;
  } catch (error: any) {
    console.error("Chat API error:", error);
    if (error?.name === "AbortError") {
      return "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka.";
    }
    return `[LOKALNA GREŠKA]: ${error?.message || 'Nepoznata greška prilikom poziva servera'}`;
  }
}
