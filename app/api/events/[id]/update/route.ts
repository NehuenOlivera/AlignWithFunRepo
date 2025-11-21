import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // <--- Aquí está el truco
  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  const supabase = createClient();

  const body = await req.json();
  const {
    name,
    start_at,
    duration_minutes,
    max_participants,
    description,
    location,
    suggested_price,
    is_cancelled,
  } = body;

  // Validación
  if (!name || !start_at || !duration_minutes || !max_participants) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data: updatedEvent, error } = await (
    await supabase
  )
    .from("events")
    .update({
      name,
      start_at,
      duration_minutes,
      max_participants,
      description: description ?? null,
      location: location ?? null,
      suggested_price: suggested_price ?? null,
      is_cancelled: is_cancelled ?? false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ event: updatedEvent });
}
