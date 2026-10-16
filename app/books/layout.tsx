import type { Metadata } from "next";
import "@/app/globals.css";




export const metadata: Metadata = {
  title: "Maktabty| Books",
  description: "Books page for Maktabty",
};

export default function BooksLayout({ children }: LayoutProps<"/">) {
  return <div>{children}</div>

}
