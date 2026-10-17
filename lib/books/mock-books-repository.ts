import { mockBooks } from "@/data/mock-books";
import type { Book, BookFormValues } from "@/types/book";
import type { BooksRepository } from "@/lib/books/books-repository";

let books: Book[] = mockBooks.map((book) => ({ ...book }));

const normalizeValue = (value: string) => value.trim();

const findBookById = (id: string) => books.find((book) => book.id === id);

const isIsoTimestamp = (value: string | null | undefined) => {
  if (!value) {
    return false;
  }

  return !Number.isNaN(new Date(value).getTime());
};

const isDuplicateBook = (title: string, category: string, location: string) => {
  const normalizedTitle = normalizeValue(title).toLowerCase();
  const normalizedCategory = normalizeValue(category).toLowerCase();
  const normalizedLocation = normalizeValue(location).toLowerCase();

  return books.some((book) => {
    if (book.deletedAt !== null) {
      return false;
    }

    return (
      normalizeValue(book.title).toLowerCase() === normalizedTitle &&
      normalizeValue(book.category).toLowerCase() === normalizedCategory &&
      normalizeValue(book.location).toLowerCase() === normalizedLocation
    );
  });
};

const createBook = (input: BookFormValues): Book => {
  const title = normalizeValue(input.title);
  const category = normalizeValue(input.category);
  const location = normalizeValue(input.location);
  const now = new Date().toISOString();

  if (!title || !category || !location) {
    throw new Error("Title, category, and location are required.");
  }

  if (isDuplicateBook(title, category, location)) {
    throw new Error("This book already exists in the active inventory.");
  }

  return {
    id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    category,
    location,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };
};

const sortByNewest = (items: Book[]) =>
  [...items].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

export const mockBooksRepository: BooksRepository = {
  listActive() {
    return sortByNewest(books.filter((book) => book.deletedAt === null));
  },

  getById(id: string) {
    return books.find((book) => book.id === id);
  },

  getDeleted() {
    return sortByNewest(books.filter((book) => book.deletedAt !== null));
  },

  search(query: string, category?: string) {
    const trimmed = normalizeValue(query).toLowerCase();
    const selectedCategory = category ? normalizeValue(category) : "";

    return this.listActive().filter((book) => {
      const titleMatches = !trimmed || book.title.toLowerCase().includes(trimmed);
      const categoryMatches = !selectedCategory || book.category === selectedCategory;
      return titleMatches && categoryMatches;
    });
  },

  getRecent(limit = 5) {
    return this.listActive().slice(0, limit);
  },

  getDashboardStats() {
    const activeBooks = this.listActive();
    const deletedBooks = this.getDeleted();
    const categories = new Set(activeBooks.map((book) => book.category));
    const locations = new Set(activeBooks.map((book) => book.location));

    return {
      totalActive: activeBooks.length,
      totalDeleted: deletedBooks.length,
      totalCategories: categories.size,
      totalLocations: locations.size,
    };
  },

  getCategories() {
    return Array.from(new Set(books.map((book) => book.category))).sort((a, b) =>
      a.localeCompare(b)
    );
  },

  addBook(input: BookFormValues) {
    const nextBook = createBook(input);
    books = [nextBook, ...books];
    return nextBook;
  },

  updateBook(id: string, input: BookFormValues) {
    const existingBook = findBookById(id);
    if (!existingBook) {
      return undefined;
    }

    const title = normalizeValue(input.title);
    const category = normalizeValue(input.category);
    const location = normalizeValue(input.location);

    if (!title || !category || !location) {
      throw new Error("Title, category, and location are required.");
    }

    const duplicate = books.some((book) => {
      if (book.id === id || book.deletedAt !== null) {
        return false;
      }

      return (
        normalizeValue(book.title).toLowerCase() === title.toLowerCase() &&
        normalizeValue(book.category).toLowerCase() === category.toLowerCase() &&
        normalizeValue(book.location).toLowerCase() === location.toLowerCase()
      );
    });

    if (duplicate) {
      throw new Error("This book already exists in the active inventory.");
    }

    existingBook.title = title;
    existingBook.category = category;
    existingBook.location = location;
    existingBook.updatedAt = new Date().toISOString();

    return existingBook;
  },

  moveToTrash(id: string) {
    const existingBook = findBookById(id);
    if (!existingBook || existingBook.deletedAt !== null) {
      return undefined;
    }

    const deletedAt = new Date().toISOString();
    existingBook.deletedAt = deletedAt;
    existingBook.updatedAt = deletedAt;
    return existingBook;
  },

  restoreBook(id: string) {
    const existingBook = findBookById(id);
    if (!existingBook || existingBook.deletedAt === null) {
      return undefined;
    }

    existingBook.deletedAt = null;
    existingBook.updatedAt = new Date().toISOString();
    return existingBook;
  },

  deletePermanently(id: string) {
    const existingBook = findBookById(id);
    if (!existingBook) {
      return false;
    }

    const hasValidTimestamp = isIsoTimestamp(existingBook.deletedAt);
    if (!hasValidTimestamp) {
      return false;
    }

    books = books.filter((book) => book.id !== id);
    return true;
  },
};

export const resetBooksRepository = () => {
  books = mockBooks.map((book) => ({ ...book }));
};
