"use client";

import { useMemo, useState } from "react";
import Title from "@/app/components/common/Title";
import AddBtn from "@/app/components/common/AddBtn";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import { Book } from "@/app/types/book";
import BooksSearch from "./components/BooksSearch";
import CategorySelector from "./components/CategorySelector";
import { useBooksContext } from "../context/BooksContext";
import Header from "../components/common/Header";

function BooksPage() {
  const { books, isOpen, handleSave, setIsOpen } = useBooksContext();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const saveBook = async (values: Parameters<typeof handleSave>[0]) => {
    // await handleSave(values, editingBook?.id);
    setEditingBook(null);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">

      <Header title="All Books" description="Browse your entire book collection." handleClick={handleClick} />


      <div className="flex justify-between gap-4 px-2 ">
        <BooksSearch search={search} setSearch={setSearch} />

        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={[]}
        />
      </div>

      <BookFormDialog
        key={`${isOpen ? "open" : "closed"}`}
        open={isOpen}
        onOpenChange={handleClick}
        mode={editingBook ? "edit" : "create"}
        initialBook={editingBook}
        onSave={saveBook}
      />

    </div>
  );
}

export default BooksPage;
