import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function getUserAuth() {
  const supabase = createClient();
  const sb = await supabase;
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      ),
    };
  }

  return { user, supabase: sb };
}
