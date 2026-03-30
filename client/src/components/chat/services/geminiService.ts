export async function getChatResponse(messages: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    // On Netlify, we bypass the redirect rules just in case they are failing
    // and call the function directly via its full URL path.
    const isProd = import.meta.env.PROD;
    const apiUrl = isProd ? "/.netlify/functions/chat" : "/api/chat";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        return "Trenutno imam previše upita. Molim vas sačekajte jedan minut pa mi pišite ponovo.";
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
    
    const data = await response.json();
    return data.text || "Izvinite, došlo je do greške u obradi poruke.";
  } catch (error: any) {
    console.error("Chat API error:", error);
    return `[LOKALNA GREŠKA]: ${error?.message || 'Nepoznata greška prilikom poziva servera'}`;
  }
}
