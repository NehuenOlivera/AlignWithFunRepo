import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { event_id } = await req.json();
    const supabase = createClient();

    // get user
    const {
      data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to join." },
        { status: 401 }
      );
    }

    // insert attendee
    const { error } = await (await supabase).from("attendees").insert({
      event_id,
      user_id: user.id,
      status: "booked",
    });

    if (error) return NextResponse.json({ error: error.message });

    return NextResponse.json({ message: "Successfully joined!" });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (err instanceof Error ? err.message : String(err)),
      },
      { status: 500 }
    );
  }
}
