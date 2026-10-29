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
import { useParams } from "next/navigation";


function BookPage() {
  const {id:bookId} = useParams<{ id: string }>()
    const [book, setBook] = useState<Book>();

  useEffect(() => {
    const fetchBookById = async () => {
      const data = await getBookById(bookId);
      if (data) setBook(data);
    };
    fetchBookById();
  }, []);
  if (!book) return;

  const { id, image_url, title } = book;
  const { handleMoveToTrash, isOpen, setIsOpen } = useBooksContext();

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
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {};

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 border-b border-border pb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brass">
                Book details
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                {title || "Untitled book"}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Library</span>
              <span>/</span>
              <span className="font-medium text-foreground">Overview</span>
            </div>
          </div>
        </header>

        <article className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-dialog">
          <div className="border-b border-border bg-muted/30 px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground">
              Review the book information and its place in your library.
            </p>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,280px)_1fr] md:gap-8">
              <div className="flex justify-center md:justify-start">
                <div className="relative aspect-3/4 w-full max-w-55 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                  {image_url ? (
                    <Image
                      src={image_url}
                      alt={`Cover of ${title}`}
                      fill
                      sizes="(max-width: 768px) 220px, 280px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center text-muted-foreground">
                      <BookOpen
                        aria-hidden="true"
                        className="size-10 text-brass"
                      />
                      <span className="text-sm">No cover available</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0">
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </footer>
        </article>
      </div>
    </main>
  );
}

export default BookPage;
