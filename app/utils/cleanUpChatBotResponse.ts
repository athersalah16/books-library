export const cleanUpChatBotResponse = async (
  response: any,
  onText: (text: string) => void,
) => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;

      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;

      const chunk = JSON.parse(data);
      const text = chunk.choices?.[0]?.delta?.content ?? "";
      if (text) onText(text);
    }
  }
};
