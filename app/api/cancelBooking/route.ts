import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(req: Request) {
  try {
    const { event_id } = await req.json();
    const supabase = createClient();

    const {
      data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in for this action." },
        { status: 401 }
      );
    }

    const { data: isCancelled, error } = await (
      await supabase
    ).rpc("cancel_booking", { eid: event_id });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (isCancelled) {
      return NextResponse.json({ message: "Successfully cancelled." });
    }

    return NextResponse.json(
      { error: "No booking found to cancel." },
      { status: 404 }
    );
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
