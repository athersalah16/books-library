"use server";

import { createConnection } from "./createConnection";

export async function deleteBook(id: string): Promise<void> {
  const supabase = await createConnection();

  const { error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
