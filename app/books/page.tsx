"use client";

import { useMemo, useState } from "react";
import Title from "@/app/components/common/Title";
import AddBtn from "@/app/components/common/AddBtn";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import { Book } from "@/app/types/book";
import BaseTable from "../components/common/BaseTable";
import BooksSearch from "./components/BooksSearch";
import CategorySelector from "./components/CategorySelector";
import { useBooksContext } from "../context/BooksContext";

function BooksPage() {
  const { books, handleSave } = useBooksContext();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(books.map((book) => book.category))],
    [books],
  );

  const filteredBooks = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesQuery =
        !normalizedQuery || book.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [books, search, selectedCategory]);

  const saveBook = async (values: Parameters<typeof handleSave>[0]) => {
    await handleSave(values, editingBook?.id);
    setEditingBook(null);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <div className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:items-end sm:justify-between">
        <Title
          title="All Books"
          description="Browse your entire book collection."
        />
        <AddBtn
         
        />
      </div>

      <BaseTable>
        <>
          <BooksSearch search={search} setSearch={setSearch} />
          
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          <BookFormDialog
            key={`${editingBook?.id ?? "new-book"}-${isDialogOpen ? "open" : "closed"}`}
            open={isDialogOpen}
            onOpenChange={(nextOpen) => {
              if (!nextOpen) {
                setEditingBook(null);
              }
              setIsDialogOpen(nextOpen);
            }}
            mode={editingBook ? "edit" : "create"}
            initialBook={editingBook}
            onSave={saveBook}
          />
        </>
      </BaseTable>
    </div>
  );
}

export default BooksPage;
