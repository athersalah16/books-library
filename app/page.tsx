"use client";

import { useState } from "react";
import AddBtn from "@/app/components/common/AddBtn";
import Title from "@/app/components/common/Title";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import Summary from "./components/Summary";
import { useBooksContext } from "./context/BooksContext";

export default function Home() {
  const { books, handleSave,  isOpen, setIsOpen } = useBooksContext();

  const handleClick =() => {
    setIsOpen(true);
  }
  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 ">
      <div className="flex w-full flex-col gap-3 px-6 sm:flex-row sm:items-end sm:justify-between">
        <Title
          title="Dashboard"
          description="Your collection at a glance."
        />
        <AddBtn handleClick={handleClick} />
      </div>

      <Summary books={books} />

      <BookFormDialog
        key={isOpen ? "dashboard-create-open" : "dashboard-create-closed"}
        open={isOpen}
        onOpenChange={setIsOpen}
        mode="create"
        onSave={handleSave}
      />
    </div>
  );
}
