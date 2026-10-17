import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import HeaderAtMobile from "./components/common/HeaderAtMobile";
import SideBar from "./components/common/SideBar";

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
        <div className="md:flex hidden">
          <SideBar />
        </div>
        <HeaderAtMobile />
        <main className="ml-16 min-h-dvh bg-background sm:ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}
