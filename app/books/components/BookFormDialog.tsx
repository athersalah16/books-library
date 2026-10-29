"use client";
import { useEffect, useState, FormEvent } from "react";
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
import {
  Book,
  BookFormDialogProps,
  BookFormValues,
  BooksFields,
} from "@/app/types/book";
import { validateData } from "@/app/utils/validateData";
import { useBooksContext } from "@/app/context/BooksContext";
import { uploadBookCover } from "@/app/lib/uploadBookCover";
import CategorySelector from "./CategorySelector";

function BookFormDialog({
  open,
  onOpenChange,
  mode,
  initialBook,
}: BookFormDialogProps) {
  const [formValues, setFormValues] = useState<BookFormValues>(() => ({
    title: initialBook?.title ?? "",
    category: initialBook?.category ?? "",
    location: initialBook?.location ?? "",
    author: initialBook?.author ?? "",
    shelf_number: initialBook?.shelf_number ?? "",
    language: initialBook?.language ?? "",
  }));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialBook?.image_url ?? null,
  );
  const { handleSave, selectedCategory, setSelectedCategory } =
    useBooksContext();

  const fields: BooksFields[] = [
    { name: "title", label: "Title", placeholder: "Enter a book title" },
    { name: "author", label: "Author", placeholder: "Enter the author name" },
    { name: "language", label: "Language", placeholder: "e.g. English" },
    { name: "shelf_number", label: "Shelf number", placeholder: "e.g. A-12" },
    { name: "location", label: "Location", placeholder: "e.g. Main Shelf A" },
  ];

  useEffect(() => {
    if (!coverPreview) return;

    return () => URL.revokeObjectURL(coverPreview);
  }, [coverPreview]);

  const handleFieldChange = (field: keyof BookFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleCoverChange = (file: File | undefined) => {
    setCoverFile(file ?? null);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
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

    try {
      const formData = new FormData();
      if (coverFile) formData.append("cover", coverFile);

      let imageUrl: string | undefined;
      const coverFileFromFormData = formData.get("cover");
      if (coverFileFromFormData instanceof File) {
        imageUrl = await uploadBookCover(coverFileFromFormData);
      }

      const categoryValue =
        mode === "edit" ? formValues.category : selectedCategory || formValues.category;

      const newBook: Book = {
        ...formValues,
        category: categoryValue,
        created_at: initialBook?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: initialBook?.is_deleted ?? false,
        image_url: imageUrl || initialBook?.image_url || "",
      };

      const saved = await handleSave(newBook, initialBook?.id);
      if (saved) onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save the book. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="w-[calc(100%-2rem)] max-w-2xl
    max-h-[90dvh] overflow-y-auto rounded-2xl border border-border bg-card shadow-dialog"
      >
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
          {fields.slice(0, 1).map(({ name, label, placeholder }) => (
            <label
              key={name}
              className="flex flex-col gap-2 text-sm font-medium text-foreground"
            >
              {label}
              <Input
                id={`book-${name}`}
                value={formValues[name]}
                onChange={(event) =>
                  handleFieldChange(name, event.target.value)
                }
                placeholder={placeholder}
              />
            </label>
          ))}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fields.slice(1).map(({ name, label, placeholder }) => (
              <label
                key={name}
                className="flex flex-col gap-2 text-sm font-medium text-foreground"
              >
                {label}
                <Input
                  id={`book-${name}`}
                  value={formValues[name]}
                  onChange={(event) =>
                    handleFieldChange(name, event.target.value)
                  }
                  placeholder={placeholder}
                />
              </label>
            ))}
          </div>
          <div className="w-full">
            <CategorySelector
              mode="add"
              value={mode === "edit" ? formValues.category : selectedCategory}
              onValueChange={(category) => {
                setFormValues((current) => ({ ...current, category }));
                if (mode === "create") {
                  setSelectedCategory(category);
                }
              }}
            />
          </div>

          <section className="space-y-3 rounded-xl border border-border p-3">
            <label
              htmlFor="book-cover"
              className="flex flex-col gap-2 text-sm font-medium text-foreground"
            >
              Cover image
              <Input
                id="book-cover"
                type="file"
                accept="image/*"
                onChange={(event) => handleCoverChange(event.target.files?.[0])}
              />
            </label>
            {coverPreview && (
              <div className="flex items-center gap-3">
                <Image
                  src={coverPreview}
                  alt="Selected book cover preview"
                  width={72}
                  height={96}
                  unoptimized
                  className="rounded-md object-cover"
                />
                <span className="text-sm text-muted-foreground">
                  {coverFile?.name}
                </span>
              </div>
            )}
          </section>

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
    </AlertDialog>
  );
}

export default BookFormDialog;
