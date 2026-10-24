
'use client'
import React, { useState } from "react";
import { BooksContext } from "./BooksContext";
import { toast } from "sonner";
import { Book, BookFormValues } from "../types/book";

type Props = {
  children: React.ReactNode;
};

function BooksProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    toast.success(`"Book Title" was added to your inventory.`);
  };

  return (
    <BooksContext.Provider value={{ books, handleSave, isOpen, setIsOpen }}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
