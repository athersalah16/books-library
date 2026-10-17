import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBooksRepository } from "@/lib/books/mock-books-repository";
import type { Book } from "@/app/types/book";

type Props = {
  books: Book[];
  setIsDialogOpen: (open: boolean) => void;
  setBooks: (books: Book[]) => void;
  formatDate: (value: string) => string;
  editingBook: Book | null;
  setEditingBook: (book: Book | null) => void;
};

function BooksTable({
  books,
  setBooks,
  formatDate,
  setIsDialogOpen,
  setEditingBook,
}: Props) {
  const filteredBooks = books;
  const refreshBooks = () => setBooks(mockBooksRepository.listActive());

  const handleMoveToTrash = (bookId: string) => {
    const book = mockBooksRepository.getById(bookId);
    if (!book) {
      return;
    }

    const confirmed = window.confirm(
      `Move "${book.title}" to the trash? It will stay in the inventory until restored.`,
    );

    if (!confirmed) {
      return;
    }

    mockBooksRepository.moveToTrash(bookId);
    refreshBooks();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-muted/50 text-sm text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length ? (
              filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-t border-border text-sm text-foreground"
                >
                  <td className="px-4 py-3 font-medium">{book.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {book.category}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {book.location}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(book.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(book)}
                        className="gap-1"
                      >
                        <Pencil className="size-3.5" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleMoveToTrash(book.id)}
                        className="gap-1"
                      >
                        <Trash2 className="size-3.5" />
                        Trash
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No books match your current search and filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BooksTable;
