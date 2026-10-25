"use client";
import {useState, FormEvent} from "react";

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
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Book, BookFormDialogProps, BookFormValues, BooksFields } from "@/app/types/book";
import { validateData } from "@/app/utils/validateData";
import { useBooksContext } from "@/app/context/BooksContext";

function BookFormDialog({
  open,
  onOpenChange,
  mode,


}: BookFormDialogProps) {
  const [formValues, setFormValues] = useState<BookFormValues>({
    title: "",
    category: "",
    location: "",
    author: "",
    shelf_number: "",
    language: "",

  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSave } = useBooksContext();

  const fields: BooksFields[] = [
    { name: "title", label: "Title", placeholder: "Enter a book title" },
    { name: "author", label: "Author", placeholder: "Enter the author name" },
    { name: "category", label: "Category", placeholder: "e.g. Fiction" },
    { name: "location", label: "Location", placeholder: "e.g. Main Shelf A" },
    { name: "shelf_number", label: "Shelf number", placeholder: "e.g. A-12" },
    { name: "language", label: "Language", placeholder: "e.g. English" },
  ];

  const handleFieldChange = (field: keyof BookFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));

  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateData(formValues);
    if (!isValid) {
      setError("Please fill in all the required fields.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    
    const newBook: Book = {
      user_id: "1",
      ...formValues,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false,
    };
    await handleSave(newBook);
  };

  return (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="max-w-xl rounded-2xl border border-border bg-card shadow-dialog">
      <AlertDialogHeader className="items-start text-left">
        <span className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-brass-soft text-primary">
          <Image src={"/logo.png"} alt="Logo" width={44} height={44} />
        </span>

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
        {fields.map(({ name, label, placeholder }) => (
          <label key={name} className="flex flex-col gap-2 text-sm font-medium text-foreground">
            {label}
            <Input
              id={`book-${name}`}
              value={formValues[name]}
              onChange={(event) => handleFieldChange(name, event.target.value)}
              placeholder={placeholder}
            />
          </label>
        ))}

        {error && (
          <p className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </p>
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
  </AlertDialog >
  );
}

export default BookFormDialog;
