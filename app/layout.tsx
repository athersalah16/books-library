import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import HeaderAtMobile from "./components/common/SideBarAtMobile";
import SideBar from "./components/common/SideBar";
import BooksProvider from './context/BooksProvider';
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/common/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maktabty",
  description: "Your personal library management app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-background text-foreground">
        <ClerkProvider>
          <BooksProvider>
            <div className="md:flex hidden w-16">
              <SideBar />
            </div>
            <HeaderAtMobile />
            <main className=" min-h-dvh bg-background sm:ml-64">
       
              {children}
            </main>
            <Toaster />
          </BooksProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
