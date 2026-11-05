"use client";

import { ChatMessage } from "@/app/types/ChatBot";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUser } from "@clerk/nextjs";
import MessageHeader from "./MessageHeader";

function ChatMessages({ message }: { message: ChatMessage }) {
  const { user } = useUser();
  const { role, content } = message;
  const isUser = role === "user";

  const label = isUser ? user?.fullName : "AI Agent";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} `}>
      <div
        className={ `overflow-auto w-full max-w-2xl rounded-[28px] border shadow-[0_18px_40px_-24px_rgba(25,59,54,0.35)] ${
          isUser
            ? "border-primary/10 bg-primary text-primary-foreground"
            : "border-border bg-card text-card-foreground"
        }`}
      >
        <MessageHeader isUser={isUser} label={label ?? "Unknown"} />

        <div
          className={`px-4 py-4 text-sm leading-7 sm:px-5 ${
            isUser ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {role === "assistant" ? (
            <div dir='auto' className="overflow-x-auto [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:mb-2 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_strong]:font-semibold [&_code]:rounded [&_code]:bg-primary/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-primary/5 [&_pre]:p-3 [&_pre]:text-[13px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessages;
