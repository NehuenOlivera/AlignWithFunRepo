import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const result = await resend.emails.send({
      from: process.env.SUPPORT_EMAIL!,
      to,
      subject,
      html,
    });

    return { success: true, result };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}
