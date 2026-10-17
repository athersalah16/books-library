"use client";

import { useMemo, useState } from "react";
import Title from "@/app/components/common/Title";
import AddBtn from "@/app/components/common/AddBtn";
import BookFormDialog from "@/app/books/components/BookFormDialog";
import { Input } from "@/components/ui/input";
import { mockBooksRepository } from "@/lib/books/mock-books-repository";
import { Book, BookFormValues } from "@/app/types/book";
import BooksTable from "./components/BooksTable";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

function BooksPage() {
  const [books, setBooks] = useState(() => mockBooksRepository.listActive());
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(books.map((book) => book.category))],
    [books]
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

    const handleSave = async (values: BookFormValues) => {
    if (editingBook) {
      const updatedBook = mockBooksRepository.updateBook(editingBook.id, values);
      if (!updatedBook) {
        throw new Error("This book no longer exists in the inventory.");
      }
    } else {
      mockBooksRepository.addBook(values);
    }

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
          onClick={() => {
            setEditingBook(null);
            setIsDialogOpen(true);
          }}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-6">
          <div className="w-full md:max-w-sm">
            <label htmlFor="book-search" className="mb-2 block text-sm font-medium text-foreground">
              Search by title
            </label>
            <Input
              id="book-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books..."
            />
          </div>

          <div className="w-full md:max-w-xs">
            <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      <BooksTable books={filteredBooks} setBooks={setBooks} formatDate={formatDate} editingBook={editingBook} setEditingBook={setEditingBook} setIsDialogOpen={setIsDialogOpen}/>

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
        onSave={handleSave}
      />
    </div></div>
  );
}

export default BooksPage;
