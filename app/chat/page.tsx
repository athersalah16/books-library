"use client";
import Header from "@/app/components/common/Header";
import { useRef } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { useBooksContext } from "../context/BooksContext";

function ChatBotPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { messages } = useBooksContext();
  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Header
        title="Maktabty AI"
        description="Ask questions, explore books, and get smart recommendations with your AI reading assistant."
      />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-1 pb-6">
        {messages.length === 0 ? (
          <div className="mt-6 rounded-[28px] border border-dashed border-border bg-card/70 p-8 text-center text-sm text-muted-foreground shadow-[0_18px_40px_-30px_rgba(25,59,54,0.35)]">
            Start a conversation with your IR agent and discover insights from your book collection.
          </div>
        ) : (
          messages.map((message) => <ChatMessages message={message} key={message.id} />)
        )}
      </div>

      <div className="flex-1" />
      <div className="mx-auto w-full max-w-5xl">
        <ChatInput inputRef={inputRef} />
      </div>
    </div>
  );
}

export default ChatBotPage;
