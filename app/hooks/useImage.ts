import { useEffect } from "react";
import { useBooksContext } from "../context/BooksContext";

function useImage() {
  const { coverPreview, setCoverPreview, coverInputRef, setCoverFile } =
    useBooksContext();
  useEffect(() => {
    if (!coverPreview || !coverPreview.startsWith("blob:")) return;

    return () => URL.revokeObjectURL(coverPreview);
  }, [coverPreview]);
  // Add the changes and check the field is one of BookFormValues type

  // create the preview link for user befor send it
  const createImageUrl = async (file: File | null): Promise<string> => {
    if (!file) return "";
    const imageUrl = URL.createObjectURL(file);
    setCoverPreview(imageUrl);
    return imageUrl;
  };
  const handleCoverChange = (file: File | null | undefined) => {
    if (!file) {
      setCoverPreview(null);
      setCoverFile(null);
      return;
    }
    setCoverFile(file);
    createImageUrl(file);
  };
  // this for undo the image by clear the ref
  const handleCoverUndo = () => {
    setCoverPreview(null);
    setCoverFile(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };
  return { handleCoverChange, handleCoverUndo, createImageUrl };
}

export default useImage;
