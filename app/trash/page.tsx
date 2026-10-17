"use client";

import { useState } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import Title from "@/app/components/common/Title";
import { Button } from "@/components/ui/button";
import { mockBooksRepository } from "@/lib/books/mock-books-repository";
import type { Book } from "@/app/types/book";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

function TrashPage() {
  const [books, setBooks] = useState(() => mockBooksRepository.getDeleted());

  const refreshBooks = () => setBooks(mockBooksRepository.getDeleted());

  const handleRestore = (bookId: string) => {
    const book = mockBooksRepository.getById(bookId);
    if (!book || !book.deletedAt) {
      return;
    }

    mockBooksRepository.restoreBook(bookId);
    refreshBooks();
  };

  const handlePermanentDelete = (bookId: string) => {
    const book = mockBooksRepository.getById(bookId);
    if (!book || !book.deletedAt) {
      return;
    }

    const confirmed = window.confirm(
      `Permanently delete "${book.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    mockBooksRepository.deletePermanently(bookId);
    refreshBooks();
  };

  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Title
        title="Trash"
        description="Books removed from your collection. Restore them or delete them for good."
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-muted/50 text-sm text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Deleted</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length ? (
                books.map((book: Book) => (
                  <tr key={book.id} className="border-t border-border text-sm text-foreground">
                    <td className="px-4 py-3 font-medium">{book.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{book.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{book.location}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {book.deletedAt ? formatDate(book.deletedAt) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRestore(book.id)}
                          className="gap-1"
                        >
                          <RotateCcw className="size-3.5" />
                          Restore
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handlePermanentDelete(book.id)}
                          className="gap-1"
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    The trash is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TrashPage;
