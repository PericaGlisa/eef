export async function getChatResponse(
  messages: { role: 'user' | 'assistant', content: string }[],
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
      const looksLikeHtml = /^\s*<!doctype html/i.test(errorMsg) || /^\s*<html/i.test(errorMsg);
      const safeErrorMessage = looksLikeHtml ? `Greška ${response.status}` : errorMsg;
      if (response.status === 429) {
        return safeErrorMessage.includes("Greška")
          ? "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo."
          : safeErrorMessage;
      }
      if (response.status === 502) {
        return safeErrorMessage.includes("Greška")
          ? "Servis je trenutno preopterećen. Molimo pokušajte ponovo za nekoliko trenutaka."
          : safeErrorMessage;
      }
      if (response.status === 503) {
        return safeErrorMessage.includes("Greška")
          ? "Model je trenutno pod velikim opterećenjem. Molimo pokušajte ponovo za nekoliko trenutaka."
          : safeErrorMessage;
      }
      if (response.status === 504) {
        return safeErrorMessage.includes("Greška")
          ? "Asistent trenutno odgovara sporije nego obično. Molimo pokušajte ponovo za nekoliko trenutaka."
          : safeErrorMessage;
      }
      
      if (errorMsg.includes("429") || errorMsg.includes("Quota") || errorMsg.includes("quota") || errorMsg.includes("resource_exhausted") || errorMsg.includes("rate limit")) {
         return "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo.";
      }
      if (errorMsg.includes("503") || errorMsg.includes("unavailable") || errorMsg.includes("high demand")) {
         return "Model je trenutno pod velikim opterećenjem. Molimo pokušajte ponovo za nekoliko trenutaka.";
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
