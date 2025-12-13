import { NextResponse } from "next/server";
import { getUserAuth } from "@/utils/getUserFromSupabase";
import { UserHealthFormPayload, UserHealthForm } from "@/types";

export async function POST(req: Request) {
  try {
    const { user, supabase, response } = await getUserAuth();
    if (!user) return response;

    const body: UserHealthFormPayload = await req.json();

    const { error } = await supabase.rpc("upsert_user_health_form", {
      p_user_id: user.id,
      p_current_injuries: body.current_injuries,
      p_medical_background: body.medical_background,
      p_acknowledgement: body.acknowledgement,
      p_other_injuries: body.other_injuries ?? "",
      p_completed: body.completed ?? true,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
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

export async function GET() {
  try {
    const { user, supabase, response } = await getUserAuth();
    if (!user) return response;

    const { data: userHealthForm, error } = await supabase
      .from("user_health_forms")
      .select()
      .eq("user_id", user.id)
      .single<UserHealthForm>();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      userHealthForm,
      completed: Boolean(userHealthForm?.completed_at),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
