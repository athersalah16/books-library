"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BookFormDialogProps, BookFormValues } from "@/app/types/book";

const emptyForm = (): BookFormValues => ({
  title: "",
  category: "",
  location: "",
});

function BookFormDialog({
  open,
  onOpenChange,
  mode,
  initialBook,
  onSave,
}: BookFormDialogProps) {
  const defaultValues: BookFormValues = initialBook
    ? {
        title: initialBook.title,
        category: initialBook.category,
        location: initialBook.location,
      }
    : emptyForm();

  const [formValues, setFormValues] = useState<BookFormValues>(defaultValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof BookFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedValues: BookFormValues = {
      title: formValues.title.trim(),
      category: formValues.category.trim(),
      location: formValues.location.trim(),
    };

    if (
      !cleanedValues.title ||
      !cleanedValues.category ||
      !cleanedValues.location
    ) {
      setError("Please complete title, category, and location before saving.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(cleanedValues);
      onOpenChange(false);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to save this book right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xl rounded-2xl border border-border bg-card shadow-dialog">
        <AlertDialogHeader className="items-start text-left">
          <div className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-brass-soft text-primary">
            <Image src={"/logo.png"} alt="Logo" width={44} height={44} />{" "}
          </div>

          <AlertDialogTitle>
            {mode === "create" ? "Add a new book" : "Edit book details"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {mode === "create"
              ? "Add a book to your physical inventory and place it in the right shelf."
              : "Update the book metadata and storage location."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form id="book-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="book-title"
            >
              Title
            </label>
            <Input
              id="book-title"
              value={formValues.title}
              onChange={(event) =>
                handleFieldChange("title", event.target.value)
              }
              placeholder="Enter a book title"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="book-category"
              >
                Category
              </label>
              <Input
                id="book-category"
                value={formValues.category}
                onChange={(event) =>
                  handleFieldChange("category", event.target.value)
                }
                placeholder="e.g. Fiction"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="book-location"
              >
                Location
              </label>
              <Input
                id="book-location"
                value={formValues.location}
                onChange={(event) =>
                  handleFieldChange("location", event.target.value)
                }
                placeholder="e.g. Main Shelf A"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <Button type="submit" form="book-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : mode === "create"
                ? "Add Book"
                : "Save Changes"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BookFormDialog;
