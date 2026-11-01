"use client";
import ImagePreviewSection from "@/app/books/components/common/ImagePreviewSection";
import { useBooksContext } from "@/app/context/BooksContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddBtnAI({ open, onOpenChange }: Props) {
  const router = useRouter();
  const { coverInputRef, setBookDetailsAI } = useBooksContext();
  const [isExtracting, setIsExtracting] = useState(false);



  async function handleExtractDetails() {
      const selectedFile = coverInputRef.current?.files?.[0];
    if (!selectedFile) return;

    try {
      setIsExtracting(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/books/extract", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Could not extract book details.");
      }
      if (data.data) {
        setIsExtracting(false);
        setBookDetailsAI(data.data);
        onOpenChange(false);
        router.push("/books/new?mode=ai");
        return;
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Extraction failed.",
      );
    } finally {
      setIsExtracting(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    
        <DialogTrigger
          render={
            <Button variant="outline" className="bg-none border-none">
              Add Book With AI
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Book With AI</DialogTitle>
            <DialogDescription>
              Provide details about the book you want to add. The AI will help
              you fill in the information.
            </DialogDescription>
          </DialogHeader>

          <ImagePreviewSection />
          <DialogFooter>
            <DialogClose
              onClick={() => onOpenChange(false)}
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button type="submit" onClick={handleExtractDetails} disabled={isExtracting}>
              {isExtracting ? "Extracting..." : "Extract Details"}
            </Button>
          </DialogFooter>
        </DialogContent>
   
    </Dialog>
  );
}
export default AddBtnAI;
