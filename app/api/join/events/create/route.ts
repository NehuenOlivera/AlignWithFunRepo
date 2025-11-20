import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      location,
      start_at,
      duration_minutes,
      max_participants,
      suggested_price,
      post_schedule_message,
    } = body;

    if (!name || !start_at || !duration_minutes || !max_participants) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // ensure user exists
    const {
      data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Insert event
    const { data, error } = await (
      await supabase
    )
      .from("events")
      .insert({
        name,
        description,
        location,
        start_at,
        duration_minutes,
        max_participants,
        suggested_price,
        post_schedule_message,
        is_cancelled: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Event created successfully",
      event: data,
    });
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
