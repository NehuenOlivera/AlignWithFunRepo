import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-side key

  // cookies() ya es un objeto RequestCookies, no un Promise
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  console.log("Cookie Header:", cookieHeader);

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
    global: { headers: { cookie: cookieHeader } },
  });
}
