import { currentUser } from "@clerk/nextjs/server";
import { sendToAI } from "./lib/SendToAI";
import { validateImage } from "@/app/utils/validateImage";

export async function POST(request: Request) {
  try {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
      throw new Error("User not authenticated");
    }

    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const isValidImage = validateImage(image);
    if (isValidImage) {
      return new Response(JSON.stringify({ error: isValidImage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const imageDataUrl = `data:${image.type};base64,${base64}`;
    const response = await sendToAI(imageDataUrl);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? "Failed to extract book details");
    }

    const result = await response.json();
    console.log("AI Response:", result); // Log the entire response for debugging
    const content = result.choices?.[0]?.message?.content;
    console.log("Extracted Content:", content); // Log the extracted content for debugging

    return Response.json({ data: JSON.parse(content) });
  } catch (error) {
    return Response.json(
      { error: "Failed to extract book details. Please try again." },
      { status: 500 },
    );
  }
}
