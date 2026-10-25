"use server";

import { createConnection } from "./createConnection";
import { Book, BookFormValues } from "../types/book";

export async function addBook(newBook: BookFormValues): Promise<Book> {
  const supabase = await createConnection();

  const { data, error } = await supabase
    .from("books")
    .insert(newBook)
    .select("*")
    .single();

  if (error) {
    throw new Error(`${error.code} ,${error.message},${error.details}`);
  }

  return data;
}
