import { SupabaseClient } from "@supabase/supabase-js";
import {
  UserWithNameAndEmail,
  EventInfoForEmail,
} from "@/components/emails/JoinToClass";
import { Database } from "@/types/supabase";

type DB = SupabaseClient<Database>;

async function getUserInfoForEmail(
  supabase: DB,
  userId: string
): Promise<UserWithNameAndEmail | null> {
  const { data: userInfo } = await supabase
    .from("users")
    .select("first_name, email")
    .eq("id", userId)
    .single();

  return userInfo;
}

async function getEventInfoForEmail(
  supabase: DB,
  eventId: string
): Promise<EventInfoForEmail | null> {
  const { data: eventInfo } = await supabase
    .from("events")
    .select("name, start_at, duration_minutes")
    .eq("id", eventId)
    .single();

  return eventInfo;
}

export async function getInfoForJoinClassEmail(
  supabase: DB,
  userId: string,
  eventId: string
): Promise<{
  user: UserWithNameAndEmail | null;
  event: EventInfoForEmail | null;
}> {
  const user = await getUserInfoForEmail(supabase, userId);
  const event = await getEventInfoForEmail(supabase, eventId);
  console.log("usuario: ", user);
  console.log("Evento: ", event);
  return { user, event };
}
