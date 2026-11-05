"use client";
import { useBooksContext } from "@/app/context/BooksContext";
import { ChatMessage } from "@/app/types/ChatBot";
import { cleanUpChatBotResponse } from "@/app/utils/cleanUpChatBotResponse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = { inputRef: React.RefObject<HTMLInputElement | null> };

function ChatInput({ inputRef }: Props) {
  const { setMessages } = useBooksContext();

  const handleSend = async () => {
    const asisstantId = crypto.randomUUID();
    const userPrompt = inputRef.current?.value ?? "";
    if (!userPrompt.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userPrompt.trim(),
    };

    const assistantMessage: ChatMessage = {
      id: asisstantId,
      role: "assistant",
      content: "",
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    inputRef.current && (inputRef.current.value = "");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          typeof errorData?.error === "string"
            ? errorData.error
            : "Failed to send message",
        );
      }

      await cleanUpChatBotResponse(response, (text) => {
        setMessages((current) =>
          current.map((item) =>
            item.id === asisstantId
              ? { ...item, content: item.content + text }
              : item,
          ),
        );
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Faild to Send to Chatbot",
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSend();
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
      <div className="w-[75%]">
        <Input
          ref={inputRef}
          maxLength={1000}
          className="h-14 p-5 text-base text-muted-foreground"
          placeholder="Send your message..."
        />
      </div>

      <Button
        type="submit"
        onClick={handleSend}
        className="h-14 w-14 rounded-full p-0 shadow-sm"
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}

export default ChatInput;
