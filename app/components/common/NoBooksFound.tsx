import { BookOpen } from "lucide-react";

function NoBooksFound({ message = "No books found in your collection yet." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <BookOpen className="h-12 w-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold">No books found</h3>

      <p className="max-w-sm text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

export default NoBooksFound;
