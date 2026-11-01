import { useBooksContext } from "@/app/context/BooksContext";
import useImage from "@/app/hooks/useImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  preview?: string | null;
};

function ImagePreviewSection({ preview }: Props) {
  const { coverInputRef, coverPreview } = useBooksContext();
  const { handleCoverChange, handleCoverUndo } = useImage();

  return (
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

      {preview || coverPreview ? (
        <div className="flex items-center relative gap-3">
          <Image
            src={preview ? preview : coverPreview!}
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
      ) : (
        <p className="text-sm text-muted-foreground">
          No cover image selected. Please choose an image file.
        </p>
      )}
    </section>
  );
}

export default ImagePreviewSection;
