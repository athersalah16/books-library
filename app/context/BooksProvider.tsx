
'use client'
import React, { useEffect, useState } from "react";
import { BooksContext } from "./BooksContext";
import { toast } from "sonner";
import { Book } from "../types/book";
import { addBook } from "../lib/addBook";
import { getBooks } from "../lib/getBooks";

type Props = {
  children: React.ReactNode;
};

function BooksProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks()

      setBooks(books);
    };

    fetchBooks().catch((error) => {
      console.error(error);
      toast.error("Unable to load books.");
    });
  }, []);

  const handleSave = async (values: Parameters<typeof addBook>[0], bookId?: string) => {
    if (bookId) {
      throw new Error("Editing books is not implemented yet.");
    }

    const createdBook = await addBook(values);
    setBooks((currentBooks) => [...currentBooks, createdBook]);
    toast.success(`"${createdBook.title}" was added to your inventory.`);
  };

  return (
    <BooksContext.Provider value={{ books, handleSave, isOpen, setIsOpen }}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
