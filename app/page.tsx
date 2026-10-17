"use client";

import { useState } from "react";
import AddBtn from "@/app/components/common/AddBtn";
import Title from "@/app/components/common/Title";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import { mockBooksRepository } from "@/lib/books/mock-books-repository";
import Summary from "./components/Summary";
import RecentBooks from "./components/RecentBooks";
import { toast } from "sonner";
import { BookFormValues } from "./types/book";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default function Home() {
  const [books, setBooks] = useState(() => mockBooksRepository.listActive());
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (values: BookFormValues) => {
    const newBook = mockBooksRepository.addBook(values);
    setBooks(mockBooksRepository.listActive());
    toast.success(`"${newBook.title}" was added to your inventory.`);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <div className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:items-end sm:justify-between">
        <Title
          title="Dashboard"
          description="Your collection at a glance. Sample data shown for illustration."
        />
        <AddBtn onClick={() => setIsOpen(true)} />
      </div>

      <Summary />

      <RecentBooks books={books} formatDate={formatDate} />

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
