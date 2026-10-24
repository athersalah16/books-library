"use client";
import { createContext, useContext } from "react";
import { Book, BookFormValues } from "../types/book";

type BooksContextType = {
  books: Book[];
  handleSave: (values: BookFormValues, bookId?: string) => Promise<void>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined,
);

export function useBooksContext() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
}
