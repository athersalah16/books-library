import { systemPromptChatBot } from "@/app/api/chat/lib/prompt";
import { systemPrompt } from "./prompt";
import type { Book } from "@/app/types/book";

type AIRequest =
  | {
      isChatBot: true;
      userMessage: string;
      booksContext: Book[];
      imageDataUrl?: never;
    }
  | {
      isChatBot: false;
      imageDataUrl: string;
      userMessage?: never;
      booksContext?: never;
    };

export const sendToAI = async (params: AIRequest) => {
  const { isChatBot } = params;
// Get the righ apiKey for this 
  const apiKey = isChatBot
    ? process.env.AI_CHATBOT_API_KEY
    : process.env.AI_API_KEY;

  const model = isChatBot ? process.env.AI_CHATBOT_MODEL : process.env.AI_MODEL;

  if (!apiKey || !model || !process.env.AI_BASE_URL) {
    throw new Error("Missing AI configuration");
  }
// this message for extract the book Details
  const extractBookDetailsMessage = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Extract the details of this book.",
        },
        {
          type: "image_url",
          image_url: {
            url: params.imageDataUrl,
          },
        },
      ],
    },
  ];
// the message for chat bot
  const chatBotMessage = [
    {
      role: "system",
      content: `${systemPromptChatBot}

              User's books inventory:
              ${JSON.stringify(params.booksContext)}`,
    },
    {
      role: "user",
      content: params.userMessage,
    },
  ];
  // set the message for send to AI
  const messages = isChatBot ? chatBotMessage : extractBookDetailsMessage;

  return fetch(`${process.env.AI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: isChatBot,
      messages,
    }),
  });
};
