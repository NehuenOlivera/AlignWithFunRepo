"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    if (error.code === "email_address_invalid") {
      redirect("/signup?message=Error: invalid email address");
    } else {
      redirect("/login?message=Error signing up");
    }
  }

  redirect("/signup?message=success");
}
