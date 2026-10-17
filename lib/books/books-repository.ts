import type { Book, BookFormValues } from "@/types/book";

export interface BooksRepository {
  listActive(): Book[];
  getById(id: string): Book | undefined;
  getDeleted(): Book[];
  search(query: string, category?: string): Book[];
  getRecent(limit?: number): Book[];
  getDashboardStats(): {
    totalActive: number;
    totalDeleted: number;
    totalCategories: number;
    totalLocations: number;
  };
  getCategories(): string[];
  addBook(input: BookFormValues): Book;
  updateBook(id: string, input: BookFormValues): Book | undefined;
  moveToTrash(id: string): Book | undefined;
  restoreBook(id: string): Book | undefined;
  deletePermanently(id: string): boolean;
}
