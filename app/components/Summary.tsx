import { BookOpen, Library, Plus, Trash2 } from "lucide-react";
import type { Book } from "@/app/types/book";

type Props = {
  books: Book[];
};

function Summary({ books }: Props) {
  const activeBooks = books;
  const deletedBooks = books.filter((book) => book.is_deleted) ?? 0;
  const stats = {
    totalActive: activeBooks.length,
    totalCategories: new Set(activeBooks.map((book) => book.category)).size,
    totalLocations: new Set(activeBooks.map((book) => book.location)).size,
    totalDeleted: deletedBooks.length,
  };

  const summary = [
    { name: "Active books", icon: Library, value: stats.totalActive },
    { name: "Categories", icon: BookOpen, value: stats.totalCategories },
    { name: "Locations", icon: Plus, value: stats.totalLocations },
    { name: "In trash", icon: Trash2, value: stats.totalDeleted },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summary.map(({ name, icon: Icon, value }) => (
        <div
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          key={name}
        >
          <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
            <Icon size={20} />
          </div>
          <p className="text-sm text-muted-foreground">{name}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Summary;
