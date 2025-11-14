// app/api/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_id, name, email, phone } = body;

    // Validar que todos los campos requeridos estén presentes
    if (!event_id || !name || !email || !phone) {
      return NextResponse.json(
        { error: "event_id, name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Llamada al RPC 'book_attendee'
    const { data, error } = await supabase.rpc("book_attendee", {
      p_event_id: event_id,
      p_name: name,
      p_email: email,
      p_phone: phone,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // data es un array de resultados de la función
    const result = Array.isArray(data) && data.length > 0 ? data[0] : null;

    if (!result) {
      return NextResponse.json(
        { error: "No data returned from booking function" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      attendee_id: result.attendee_id,
      booking_status: result.booking_status,
      message:
        result.booking_status === "booked"
          ? "You are successfully booked!"
          : "The class is full. You have been added to the waitlist.",
    });
  } catch (err) {
    console.error("Join API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
