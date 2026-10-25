"use server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function createConnection() {
  const supabase = await createClient(await cookies());
  return supabase;
}
