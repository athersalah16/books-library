import { Book, BookFormValues } from "../types/book";
import { createConnection } from "./createConnection";


type AddBookResult =
  | { success: true; book: Book }
  | {
      success: false;
      code: "DUPLICATE_TITLE" | "ADD_FAILED";
      message: string;
    };

export async function addBook(
  newBook: BookFormValues,
): Promise<AddBookResult> {
  try {
    const supabase = await createConnection();

    const { data, error } = await supabase
      .from("books")
      .insert(newBook)
      .select("*")
      .single();

    if (error?.code === "23505") {
      return {
        success: false,
        code: "DUPLICATE_TITLE",
        message: "A book with this title already exists.",
      };
    }

    if (error || !data) {
     

      return {
        success: false,
        code: "ADD_FAILED",
        message: "Unable to add the book. Please try again.",
      };
    }

    return { success: true, book: data };
  } catch (error) {
  

    return {
      success: false,
      code: "ADD_FAILED",
      message: "Unable to add the book. Please try again.",
    };
  }
}