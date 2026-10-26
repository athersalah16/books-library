"use client";

import { useState } from "react";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import { Book } from "@/app/types/book";
import BooksSearch from "./components/BooksSearch";
import CategorySelector from "./components/CategorySelector";
import { useBooksContext } from "../context/BooksContext";
import Header from "../components/common/Header";
import DisplayBook from "./components/DisplayBook";

function BooksPage() {
  const { books, isOpen, handleSave, setIsOpen,categories } = useBooksContext();
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


      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 px-6 ">
        <BooksSearch search={search} setSearch={setSearch} />

        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      </div>
      <div className="w-full grid lg:grid-cols-4 grid-cols-2  gap-4 ">
        {books.map((book, index) => (
          <DisplayBook data={book} key={index + 1} />
        ))}
      </div>


      <BookFormDialog
        key={`${isOpen ? "open" : "closed"}`}
        open={isOpen}
        onOpenChange={handleClick}
        mode={editingBook ? "edit" : "create"}
        initialBook={editingBook}
      />

    </div>
  );
}

export default BooksPage;
