import { auth, currentUser } from "@clerk/nextjs/server";
import { sendToAI } from "../books/extract/lib/SendToAI";
import { getBooks } from "@/app/lib/getBooks";
import { BookForAI } from "@/app/types/book";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const { message } = await request.json();
    const books = await getBooks();

    if (!message) {
      return Response.json(
        { error: "Please get the books and message" },
        { status: 400 },
      );
    }
    if (message.length > 1000) {
      return Response.json(
        { error: "The message is greather than mas length" },
        { status: 400 },
      );
    }

    if (!books.length) {
      return Response.json({ error: "Cannot access books" }, { status: 500 });
    }
    const booksForAI:BookForAI[] = books
      .filter((book) => !book.is_deleted)
      .map(({ title, author, category, language, shelf_number, location , created_at,updated_at}) => ({
        title,
        author,
        category,
        language,
        shelf_number,
        location,
        created_at,
        updated_at
      }));
    const response = await sendToAI({
      isChatBot: true,
      userMessage: message,
      booksContext: booksForAI,
    });



    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        {
          error:
            errorData?.message ||
            "Failed to Send the message. Please try again.",
        },
        { status: 500 },
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to Send the message. Please try again." },
      { status: 500 },
    );
  }
}
