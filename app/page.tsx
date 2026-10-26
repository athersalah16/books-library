"use client";

import AddBtn from "@/app/components/common/AddBtn";
import Title from "@/app/components/common/Title";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import Summary from "./components/Summary";
import { useBooksContext } from "./context/BooksContext";
import Header from "./components/common/Header";

export default function Home() {
  const { books, handleSave, isOpen, setIsOpen } = useBooksContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 ">
      <Header title="Dashboard" description="Your collection at a glance." handleClick={handleClick}/>

      <Summary  />

      <BookFormDialog
        key={isOpen ? "dashboard-create-open" : "dashboard-create-closed"}
        open={isOpen}
        onOpenChange={setIsOpen}
        mode="create"
      />
    </div>
  );
}
