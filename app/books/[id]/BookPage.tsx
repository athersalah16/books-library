"use client";

import {
  BookOpen,
  CalendarDays,
  Clock3,
  Hash,
  Languages,
  MapPin,
  Tags,
  Trash2,
  Archive,
  UserRound,
  Pen,
  ArchiveRestore,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useBooksContext } from "@/app/context/BooksContext";
import { getBookById } from "@/app/lib/getBookById";
import { useEffect, useState } from "react";
import { Book } from "@/app/types/book";
import {  useRouter } from "next/navigation";
import BookHeader from "./components/BookHeader";
import NoBookCover from "./components/NoBookCover";

type Props = { bookId: string };

function BookPage({ bookId }: Props) {
  const [book, setBook] = useState<Book>();
  const { handleMoveToTrash } = useBooksContext();
  const router = useRouter();

  useEffect(() => {
    const fetchBookById = async () => {
      const data = await getBookById(bookId);
      if (data) setBook(data);
    };
    fetchBookById();
  }, []);

  if (!book) return;

  const { id, image_url, title } = book;

  const displayBook = [
    { label: "Title", value: title, icon: BookOpen },
    { label: "Author", value: book.author, icon: UserRound },
    { label: "Category", value: book.category, icon: Tags },
    { label: "Language", value: book.language, icon: Languages },
    { label: "Location", value: book.location, icon: MapPin },
    { label: "Shelf number", value: book.shelf_number, icon: Hash },
    {
      label: "Added to library",
      value: new Date(book.created_at).toLocaleString(),
      icon: CalendarDays,
    },
    {
      label: "Last updated",
      value: new Date(book.updated_at).toLocaleString(),
      icon: Clock3,
    },
    {
      label: "Status",
      value: book.is_deleted ? "In trash" : "In library",
      icon: book.is_deleted ? Trash2 : Archive,
    },
  ];

  const handleTrash = async () => {
    await handleMoveToTrash(id!, !book.is_deleted);
    router.push("/");
  };

  const handleEdit = () => {
    router.push(`/books/edit/${id}`)
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <BookHeader title={title} />

        <div className="flex lg:justify-between lg:flex-row flex-col gap-5">
          <div className="h-full aspect-3/4 w-full lg:w-87 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            {image_url ? (
              <Image
                src={image_url}
                alt={`Cover of ${title}`}
                width={200}
                height={200}
                className=" w-full h-full object-cover"
              />
            ) : (
              <NoBookCover />
            )}
          </div>
          <div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {displayBook.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-2xl border border-border bg-muted/40 p-3.5 transition-colors duration-200 hover:bg-muted/60 sm:p-4"
                >
                  <dt className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brass"
                    />
                    {label}
                  </dt>
                  <dd className="wrap-break-word text-sm font-semibold text-foreground sm:text-base">
                    {value || "Not provided"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-border bg-card px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-end lg:px-8">
          <Button
            onClick={handleTrash}
            variant={book.is_deleted ? "outline" : "destructive"}
            className="w-full sm:w-auto"
          >
            {book.is_deleted ? (
              <>
                <ArchiveRestore className="size-4" /> Restore
              </>
            ) : (
              <>
                <Trash2 className="size-4" /> Move to trash
              </>
            )}
          </Button>
          <Button
            onClick={handleEdit}
            variant="default"
            className="w-full sm:w-auto"
          >
            <Pen className="size-4" />
            Edit Book
          </Button>
       
        </footer>
      </div>
    </main>
  );
}

export default BookPage;
