import { SupabaseClient, User } from "@supabase/supabase-js";
import {
  UserWithNameAndEmail,
  EventInfoForEmail,
} from "@/components/emails/JoinToClass";
import { Database } from "@/types/supabase";

type DB = SupabaseClient<Database>;

async function getUserInfoForEmail(
  supabase: DB,
  user: User
): Promise<UserWithNameAndEmail | null> {
  const { data: userInfo } = await supabase
    .from("users")
    .select("first_name, email")
    .eq("id", user.id)
    .single();

  console.log(userInfo);

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
  user: User,
  eventId: string
): Promise<{
  userInfo: UserWithNameAndEmail | null;
  event: EventInfoForEmail | null;
}> {
  const userInfo = await getUserInfoForEmail(supabase, user);
  const event = await getEventInfoForEmail(supabase, eventId);
  return { userInfo, event };
}
