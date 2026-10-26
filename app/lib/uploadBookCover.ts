'use server'
import { createConnection } from "./createConnection";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

export async function uploadBookCover(cover: File): Promise<string> {
  const supabase = await createConnection();

  const { userId } = await auth();

  if (!cover.type.startsWith("image/")) {
    throw new Error("Cover must be an image.");
  }

  if (cover.size > 5 * 1024 * 1024) {
    throw new Error("Cover must be 5 MB or smaller.");
  }

  const extension = cover.name.split(".").pop()?.toLowerCase();

  const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error("Unsupported image format.");
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
