"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Book } from "@/app/types/book";
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
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  data: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function BookInformation({ data, open, onOpenChange }: Props) {
  const {
    image_url,
    title,
    author,
    category,
    shelf_number,
    location,
    language,
    is_deleted,
    created_at,
    updated_at,
  } = data;
  const displayData = [
    { label: "Title", value: title, icon: BookOpen },
    { label: "Author", value: author, icon: UserRound },
    { label: "Category", value: category, icon: Tags },
    { label: "Language", value: language, icon: Languages },
    { label: "Location", value: location, icon: MapPin },
    { label: "Shelf number", value: shelf_number, icon: Hash },
    {
      label: "Added to library",
      value: new Date(created_at).toLocaleString(),
      icon: CalendarDays,
    },
    {
      label: "Last updated",
      value: new Date(updated_at).toLocaleString(),
      icon: Clock3,
    },
    {
      label: "Status",
      value: is_deleted ? "In trash" : "In library",
      icon: is_deleted ? Trash2 : Archive,
    },
  ];
  const handleMoveToTrah = () => {};
  const handleEdit = () => {};
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-3xl max-h-[90dvh] gap-0 overflow-y-auto rounded-2xl border border-border bg-card p-0 shadow-dialog">
        <div className="p-5 sm:p-7 flex flex-col">
          <AlertDialogHeader className="mb-6 items-start text-left">
            <span className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
              Book details
            </span>
            <AlertDialogTitle className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {title || "Untitled book"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Review the book information and its place in your library.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-6 sm:gap-7">
            <div className="relative mx-auto aspect-3/4 w-36 overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:w-44">
              {image_url ? (
                <Image
                  src={image_url}
                  alt={`Cover of ${title}`}
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-muted-foreground">
                  <BookOpen aria-hidden="true" className="size-10 text-brass" />
                  <span className="text-sm">No cover available</span>
                </div>
              )}
            </div>

            <div className="grid  grid-cols-1 gap-3 sm:grid-cols-2">
              {displayData.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border border-border bg-muted/40 p-3.5"
                >
                  <dt className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brass"
                    />
                    {label}
                  </dt>
                  <dd className="break-words text-sm font-semibold text-foreground">
                    {value || "Not provided"}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AlertDialogFooter className="mx-0 mb-0 rounded-b-2xl px-5 py-4 sm:px-7">
          <Button onClick={handleMoveToTrah} variant="destructive">
            <Trash2 /> Move to trash
          </Button>
          <Button onClick={handleMoveToTrah} variant="default">
            <Pen />
            Edit Book
          </Button>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BookInformation;
