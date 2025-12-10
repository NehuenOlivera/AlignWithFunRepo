import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { sendJoinClassEmail } from "@/utils/sendJoinClassEmail";
import { getInfoForJoinClassEmail } from "@/utils/getInfoForEmails";

async function getUserAuth() {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function validateUserProfileFields(user_id: string, supabase: any) {
  const { data, error } = await (await supabase)
    .from("users")
    .select(
      "first_name, last_name, email, phone, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone, waiver_signed"
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
  } else if (!data.waiver_signed) {
    return NextResponse.json({
      error:
        "Please agree to the Waiver & Release of Liability to join a class",
    });
  } else {
    return null;
  }
}

async function checkIfCancelled(
  event_id: string,
  user_id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
) {
  const { data, error } = await supabase.rpc("is_booking_cancelled", {
    p_event_id: event_id,
    p_user_id: user_id,
  });

  if (error) {
    return { error: error.message, status: 500 };
  }
  let cancelled = false;

  if (typeof data === "boolean") {
    cancelled = data;
  } else if (Array.isArray(data) && data.length > 0) {
    const first = data[0];
    if (typeof first === "boolean") cancelled = first;
    else if (typeof first === "object") {
      const vals = Object.values(first);
      const boolVal = vals.find((v) => typeof v === "boolean");
      if (typeof boolVal === "boolean") cancelled = boolVal;
    }
  } else if (data && typeof data === "object") {
    const vals = Object.values(data);
    const boolVal = vals.find((v) => typeof v === "boolean");
    if (typeof boolVal === "boolean") cancelled = boolVal;
  }

  return { cancelled };
}

export async function POST(req: Request) {
  try {
    const { event_id } = await req.json();

    const { user, supabase, response } = await getUserAuth();
    if (!user) return response;

    const validationResult = await validateUserProfileFields(user.id, supabase);
    if (validationResult) return validationResult;

    // insert attendee
    const { error } = await (await supabase).from("attendees").insert({
      event_id,
      user_id: user.id,
      status: "booked",
    });

    // get event data (name, start_at, duration_minutes, ) and user data (first_name, email) to send email
    const emailInfo = await getInfoForJoinClassEmail(
      supabase,
      user.id,
      event_id
    );
    console.log(emailInfo);
    sendJoinClassEmail(emailInfo.event!, emailInfo.user!);

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

export async function PUT(req: Request) {
  try {
    const { event_id } = await req.json();

    const { user, supabase, response } = await getUserAuth();
    if (!user) return response;

    const validationResult = await validateUserProfileFields(user.id, supabase);
    if (validationResult) return validationResult;

    const result = await checkIfCancelled(event_id, user.id, supabase);
    if (result.error)
      return NextResponse.json({ error: result.error }, { status: 500 });
    const cancelled = result.cancelled;

    if (!cancelled) {
      return NextResponse.json(
        { error: "Cannot rejoin: booking is not cancelled." },
        { status: 400 }
      );
    }
    // Update user_status from "cancelled" to "booked"
    const { error: updateError } = await (await supabase)
      .from("attendees")
      .update({ status: "booked" })
      .eq("user_id", user.id)
      .eq("event_id", event_id);

    if (updateError) return NextResponse.json({ error: updateError.message });

    return NextResponse.json({ message: "Successfully re-joined!" });
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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const event_id = url.searchParams.get("event_id");

    if (!event_id) {
      return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
    }

    const { user, supabase, response } = await getUserAuth();
    if (!user) return response;

    const { cancelled, error } = await checkIfCancelled(
      event_id,
      user.id,
      supabase
    );
    if (error) return NextResponse.json({ error: error.message });

    return NextResponse.json({ cancelled });
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
