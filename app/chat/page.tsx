'use client'
import Header from "@/app/components/common/Header";
import { useRef } from "react";
import ChatInput from "./components/ChatInput";

function ChatBotPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Header
        title="Maktabty AI"
        description="Ask questions, explore books, and get smart recommendations with your AI reading assistant."
      />
      <ChatInput inputRef={inputRef}/>
      
    </div>
  );
}

export default ChatBotPage;
