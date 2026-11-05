"use client";
import { createContext, useContext } from "react";
import { Book, BookFormValues } from "../types/book";
import { ChatMessage } from "../types/ChatBot";

type Status = {
  totalActive: number;
  totalLocations: number;
  totalDeleted: number;
};

type BooksContextType = {
  books: Book[];
  unTrashedBooks: Book[];
  trashedBooks: Book[];
  handleSave: (
    values: BookFormValues | Book,
    bookId?: string,
  ) => Promise<boolean>;
  handleMoveToTrash: (id: string, value: boolean) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  status: Status;
  coverPreview: string | null;
  setCoverPreview: React.Dispatch<React.SetStateAction<string | null>>;
  coverInputRef: React.RefObject<HTMLInputElement>;
  bookDetailsAI: Book | null;
  setBookDetailsAI: React.Dispatch<React.SetStateAction<Book | null>>;
  coverFile: File | null;
  setCoverFile: React.Dispatch<React.SetStateAction<File | null>>;
  messages: ChatMessage[]
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;

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
