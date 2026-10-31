import { uploadBookCover } from "../lib/uploadBookCover";

export const createImageUrl = async (
  coverInputRef: React.RefObject<HTMLInputElement | null>,
) => {
    // this function get the image url by get the file from FileList  to upload it to supabase bucket and return the image url
  const coverFile = coverInputRef.current?.files?.[0];

  let imageUrl: string | undefined;
  if (coverFile) {
    imageUrl = await uploadBookCover(coverFile);
  }

  return imageUrl;
};
