"use server";
import { createClient } from "@/app/utils/supabase/server";

export async function createConnection() {
  const supabase = await createClient();
  return supabase;
}
