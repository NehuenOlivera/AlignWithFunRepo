"use server";

import { sendContactUsEmail } from "@/lib/email";

export async function sendMessage(formData: FormData) {
  const startedAt = Number(formData.get("formStartedAt"));
  const now = Date.now();

  if (!startedAt || now - startedAt < 3000) {
    return { success: false };
  }
  if (formData.get("company")) {
    return { success: false };
  }
  const data = {
    name: formData.get("name") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const emailRes = await sendContactUsEmail(data);

  return {
    success: emailRes.success,
  };
}
