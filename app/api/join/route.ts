import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

async function validateUserProfileFields(user_id: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("users")
    .select(
      "first_name, last_name, email, phone, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone"
    )
    .eq("id", user_id)
    .single();

  if (error) {
    throw new Error("Error fetching user profile: " + error.message);
  }
  if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.emergency_contact_name ||
    !data.emergency_contact_relationship ||
    !data.emergency_contact_phone
  ) {
    return NextResponse.json({
      error: "Please complete your profile to join a class",
    });
  } else {
    return null;
  }
}

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

    const validationResult = await validateUserProfileFields(user.id);
    if (validationResult) return validationResult;

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
