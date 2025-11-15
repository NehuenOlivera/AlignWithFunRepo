import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

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

    const { data, error } = await supabase.rpc("book_attendee", {
      p_event_id: event_id,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const result = Array.isArray(data) && data.length > 0 ? data[0] : null;

    if (!result) {
      return NextResponse.json(
        { error: "No data returned from booking function" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user_id: result.user_id,
      event_id: result.event_id,
      booking_status: result.final_status,
      message:
        result.final_status === "booked"
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
