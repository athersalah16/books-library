import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Maktabty| Trash",
  description: "Trash page for Maktabty",
};

export default function TrashLayout({ children }: LayoutProps<"/">) {
  return <>{children}</>

}
