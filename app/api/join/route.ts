import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_id } = body;

    if (!event_id) {
      return NextResponse.json(
        { error: "event_id is required" },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data, error } = await (
      await supabase
    ).rpc("book_attendee", {
      p_event_id: event_id,
    });

    if (error) {
      console.error("RPC error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "RPC returned no data" },
        { status: 500 }
      );
    }

    const row = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      success: true,
      user_id: row.r_user_id,
      event_id: row.r_event_id,
      booking_status: row.r_status,
      message:
        row.r_status === "booked"
          ? "You are successfully booked!"
          : "The class is full. You have been added to the waitlist.",
    });
  } catch (err) {
    console.error("Join API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
