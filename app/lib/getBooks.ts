'use server'

import { createConnection } from "./createConnection";

export async function getBooks(trashed=false) {
  const supabase = await createConnection()

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("is_deleted", trashed);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
