"use server";

import { createConnection } from "./createConnection";
export async function moveToTrash(bookId: string, value: boolean) {
  const supabase = await createConnection();

  const { data, error } = await supabase
    .from("books")
    .update({ is_deleted: value })
    .eq("id", bookId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
