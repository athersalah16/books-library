"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BooksContext } from "./BooksContext";
import { toast } from "sonner";
import { Book, BookFormValues } from "../types/book";
import { addBook } from "../lib/addBook";
import { getBooks } from "../lib/getBooks";
import { moveToTrash } from "../lib/moveToTrash";
import { deleteBook } from "../lib/deleteBook";
import { updateBook } from "../lib/updateBook";

type Props = {
  children: React.ReactNode;
};

function BooksProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookDetailsAI, setBookDetailsAI] = useState<Book | null>(null);

  const unTrashedBooks = useMemo(
    () => books.filter((book) => !book.is_deleted),
    [books],
  );
  const trashedBooks = useMemo(
    () => books.filter((book) => book.is_deleted),
    [books],
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const status = {
    totalActive: unTrashedBooks.length,
    totalDeleted: trashedBooks.length ?? 0,
    totalLocations: new Set(books.map((book) => book.location)).size,
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    };

    fetchBooks().catch(() => {
      toast.error("Unable to load books.");
    });
  }, []);

  const handleSave = async (
    values: BookFormValues | Book,
    bookId: string = "",
  ): Promise<boolean> => {
    try {
      if (bookId) {
        const updatedBook = await updateBook(bookId, values);
        setBooks((currentBooks) =>
          currentBooks.map((book) =>
            book.id === bookId ? { ...book, ...updatedBook } : book,
          ),
        );
        toast.success(`${updatedBook.title} was updated.`);
        return true;
      }

      const createdBook = await addBook(values);
      setBooks((currentBooks) => [...currentBooks, createdBook]);
      toast.success(`${createdBook.title} was added to your inventory.`);
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to add",
      );
      return false;
    }
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

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      toast.success("Book Deleted Successfully");
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
        handleDelete,
        coverInputRef,
        bookDetailsAI,
        setBookDetailsAI,
        coverPreview,
        setCoverPreview,
        coverFile,
        setCoverFile,
        status,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
