import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Maktabty| AI",
  description: "Books ChatBot",
};

export default function ChatBotLayout({ children }: LayoutProps<"/">) {
  return <div>{children}</div>;
}
