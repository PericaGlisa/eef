export async function getChatResponse(messages: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });
    
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
      return `[DIJAGNOSTIKA]: ${errorMsg}`;
    }
    
    const data = await response.json();
    return data.text || "Izvinite, došlo je do greške u obradi poruke.";
  } catch (error: any) {
    console.error("Chat API error:", error);
    return `[LOKALNA GREŠKA]: ${error?.message || 'Nepoznata greška prilikom poziva servera'}`;
  }
}
