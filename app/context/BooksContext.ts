"use client";
import { createContext, useContext } from "react";
import { Book, BookFormValues } from "../types/book";

type Status = {
  totalActive: number;
  totalCategories: number;
  totalLocations: number;
  totalDeleted: number;
};

type BooksContextType = {
  books: Book[];
  handleSave: (values: BookFormValues, bookId?: string) => Promise<boolean>;
  isOpen: boolean;
  status: Status;
  categories: string[];
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
