'use server'

import { createConnection } from "./createConnection";

export async function getBooks() {
  const supabase = await createConnection()

  const { data, error } = await supabase
    .from("books")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
