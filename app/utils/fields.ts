import { BooksFields } from "../types/book";

export const fields: BooksFields[] = [
  { name: "title", label: "Title", placeholder: "Enter a book title" },
  { name: "author", label: "Author", placeholder: "Enter the author name" },
  { name: "language", label: "Language", placeholder: "e.g. English" },
  { name: "shelf_number", label: "Shelf number", placeholder: "e.g. 12" },
  { name: "location", label: "Location", placeholder: "e.g. A" },
];