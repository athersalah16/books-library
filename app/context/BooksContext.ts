"use client";
import { createContext, useContext } from "react";
import { Book, BookFormValues } from "../types/book";

type Status = {
  totalActive: number;
  totalLocations: number;
  totalDeleted: number;
};

type BooksContextType = {
  books: Book[];
  unTrashedBooks: Book[];
  trashedBooks: Book[];
  handleSave: (values: BookFormValues | Book, bookId?: string) => Promise<boolean>;
  handleMoveToTrash: (id: string, value: boolean) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  status: Status;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
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
