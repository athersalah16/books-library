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

  if (error?.code === "23505") {
    throw new Error("A book with this title already exists.");
  }
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
