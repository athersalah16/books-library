"use server";
import { createConnection } from "./createConnection";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { validateImage } from "../utils/validateImage";

export async function uploadBookCover(
  cover: File | null | undefined,
): Promise<string> {
  if (!cover) {
    return "";
  }

  const supabase = await createConnection();

  const { userId } = await auth();

  const extension = cover.name.split(".").pop()?.toLowerCase();
  const isValidImage = validateImage(cover);

  if (isValidImage) {
    throw new Error(`Invalid image: ${isValidImage}`);
  }

  const uploadedPath = `${userId}/books/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("book-covers")
    .upload(uploadedPath, cover, {
      contentType: cover.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Cover upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from("book-covers")
    .getPublicUrl(uploadedPath);

  return data.publicUrl;
}
