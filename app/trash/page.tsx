"use client";

import Title from "@/app/components/common/Title";
import DisplayBooks from "../books/components/DisplayBooks";
import { useBooksContext } from "../context/BooksContext";

function TrashPage() {
  const { trashedBooks } = useBooksContext();
  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Title
        title="Trash"
        description="Books removed from your collection. Restore them or delete them for good."
      />
      <p className="rounded-md border border-border bg-card p-6 text-sm text-muted-foreground">
        Your trash is empty.
      </p>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 ">
        {trashedBooks.map((book, index) => (
          <DisplayBooks data={book} key={index + 1} inTrashed={true}/>
        ))}
      </div>
    </div>
  );
}

export default TrashPage;
