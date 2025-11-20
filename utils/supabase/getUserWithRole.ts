import { createClient } from "./server";

export async function getUserWithRole() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: userInfo } = await supabase
    .from("users")
    .select("id, role")
    .eq("id", user.id)
    .single();

  return {
    ...user,
    role: userInfo?.role || "user",
  };
}
