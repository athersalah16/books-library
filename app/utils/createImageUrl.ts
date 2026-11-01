import { uploadBookCover } from "../lib/uploadBookCover";

export const createImageUrl = async (
  coverInputRef: File | undefined,
) => {
    // this function get the image url by get the file from FileList  to upload it to supabase bucket and return the image url
  const coverFile = coverInputRef;

  let imageUrl: string | undefined;
  if (coverFile) {
    imageUrl = await uploadBookCover(coverFile);
  }

  return imageUrl;
};
