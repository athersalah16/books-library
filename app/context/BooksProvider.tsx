"use client";
import React, { useEffect, useState } from "react";
import { BooksContext } from "./BooksContext";
import { toast } from "sonner";
import { Book } from "../types/book";
import { addBook } from "../lib/addBook";
import { getBooks } from "../lib/getBooks";
import { moveToTrash } from "../lib/moveToTrash";

type Props = {
  children: React.ReactNode;
};

function BooksProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const unTrashedBooks = books.filter((book) => !book.is_deleted);
  const trashedBooks = books.filter((book) => book.is_deleted);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const status = {
    totalActive: books.length,
    totalLocations: new Set(books.map((book) => book.location)).size,
    totalDeleted: trashedBooks.length ?? 0,
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    };

    fetchBooks().catch((error) => {
      toast.error("Unable to load books.");
    });
  }, []);

  const handleSave = async (
    values: Parameters<typeof addBook>[0],
    bookId?: string,
  ) => {
    if (bookId) {
      throw new Error("Editing books is not implemented yet.");
    }

    const createdBook = await addBook(values);
    setBooks((currentBooks) => [...currentBooks, createdBook]);
    toast.success(`${createdBook.title} was added to your inventory.`);
    return true;
  };

  const handleMoveToTrash = async (id: string, value: boolean) => {
    try {
      const trashedBook = await moveToTrash(id, value);

      if (trashedBook) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === id ? { ...book, is_deleted: value } : book,
          ),
        );
        toast.success(
          `${value ? "Book Moved To Trash" : "Book restored from Trash"}`,
        );
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };
  return (
    <BooksContext.Provider
      value={{
        books,
        trashedBooks,
        unTrashedBooks,
        handleSave,
        handleMoveToTrash,
        isOpen,
        setIsOpen,
        status,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
