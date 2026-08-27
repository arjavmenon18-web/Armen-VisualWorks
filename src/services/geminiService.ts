interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export async function getPixelResponse(history: ChatMessage[]) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    return data.text || "I'm ready to assist with your exploration of Armen GlobalWorks.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the studio archives. Please try again shortly!";
  }
}

export async function* getPixelResponseStream(
  history: ChatMessage[],
  currentPath: string
): AsyncGenerator<string, void, unknown> {
  try {
    const res = await fetch("/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, context: currentPath }),
    });

    if (!res.ok || !res.body) {
      yield "I'm sorry, I encountered an issue connecting to the studio assistant.";
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data: ")) {
          const rawData = trimmed.slice(6);
          if (rawData === "[DONE]") {
            return;
          }
          try {
            const parsed = JSON.parse(rawData);
            if (parsed.chunk) {
              yield parsed.chunk;
            } else if (parsed.error) {
              yield parsed.error;
            }
          } catch {
            // Ignore parse errors on partial chunks
          }
        }
      }
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    yield "I'm sorry, I encountered an error while processing your request.";
  }
}

