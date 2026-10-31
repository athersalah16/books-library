"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, BookFormValues, BooksFields } from "@/app/types/book";
import { validateData } from "@/app/utils/validateData";
import { useBooksContext } from "@/app/context/BooksContext";
import CategorySelector from "../components/CategorySelector";
import { createImageUrl } from "@/app/utils/createImageUrl";
import { defaultFormValues } from "@/app/utils/defaultFormValues";
import { redirect, useRouter } from "next/navigation";

function NewBookPage() {
  const [formValues, setFormValues] = useState<BookFormValues>({
    ...defaultFormValues,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { handleSave, selectedCategory, setSelectedCategory } =
    useBooksContext();

  const fields: BooksFields[] = [
    { name: "title", label: "Title", placeholder: "Enter a book title" },
    { name: "author", label: "Author", placeholder: "Enter the author name" },
    { name: "language", label: "Language", placeholder: "e.g. English" },
    { name: "shelf_number", label: "Shelf number", placeholder: "e.g. A-12" },
    { name: "location", label: "Location", placeholder: "e.g. Main Shelf A" },
  ];
  //clear unused photos before generate new one
  useEffect(() => {
    if (!coverPreview || !coverPreview.startsWith("blob:")) return;

    return () => URL.revokeObjectURL(coverPreview);
  }, [coverPreview]);
  // Add the changes and check the field is one of BookFormValues type
  const handleFieldChange = (field: keyof BookFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };
  // create the preview link for user befor send it
  const handleCoverChange = (file: File | undefined) => {
    if (!file) {
      setCoverPreview(null);
      return;
    }

    setCoverPreview(URL.createObjectURL(file));
  };
  // this for undo the image by clear the ref
  const handleCoverUndo = () => {
    setCoverPreview(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };
  // this function to handle submit form by create the image url and make the new book object
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const valuesToValidate = {
      ...formValues,
      category: selectedCategory,
    };

    if (!validateData(valuesToValidate)) {
      setError("Please fill in all the required fields.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const imageUrl = await createImageUrl(coverInputRef);

      const newBook: Book = {
        ...formValues,
        category: selectedCategory,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
        image_url: imageUrl,
      };

      const saved = await handleSave(newBook);
      if (saved) {
        setError("");
        router.push("/books");
      }
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
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-dialog">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brass-soft text-primary">
            <Image src="/logo.png" alt="Logo" width={44} height={44} />
          </span>

          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Add a new book
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a book to your physical inventory and place it in the right
              shelf.
            </p>
          </div>
        </div>

        <form id="book-form" onSubmit={handleSubmit} className="space-y-4">
          {fields.slice(0, 1).map(({ name, label, placeholder }) => (
            <label
              key={name}
              className="flex flex-col gap-2 text-sm font-medium text-foreground"
            >
              {label}
              <Input
                id={`book-${name}`}
                value={formValues[name] ?? ""}
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
                  value={formValues[name] ?? ""}
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
              value={selectedCategory}
              onValueChange={(category) => {
                setFormValues((current) => ({ ...current, category }));

                setSelectedCategory(category);
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
                ref={coverInputRef}
                id="book-cover"
                type="file"
                accept="image/*"
                onChange={(event) => handleCoverChange(event.target.files?.[0])}
              />
            </label>

            {coverPreview && (
              <div className="flex items-center relative gap-3">
                <Image
                  src={coverPreview}
                  alt="Selected book cover preview"
                  width={72}
                  height={96}
                  unoptimized
                  className="rounded-md object-cover"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleCoverUndo}
                  className="absolute right-0 top-0"
                >
                  <X />
                </Button>
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

        <div className="mt-6 flex justify-end">
          <Button type="submit" form="book-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Add Book"}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default NewBookPage;
