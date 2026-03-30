export async function getChatResponse(messages: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });
    
    if (!response.ok) {
      throw new Error("Greška sa servera.");
    }
    
    const data = await response.json();
    return data.text || "Izvinite, došlo je do greške u obradi poruke.";
  } catch (error) {
    console.error("Chat API error:", error);
    return "Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte ponovo za nekoliko trenutaka.";
  }
}
