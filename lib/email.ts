import { ContactUsEmailTemplate } from "@/components/emails/ContactUsMessage";
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

export async function sendContactUsEmail({
  name,
  lastname,
  email,
  subject,
  message,
}: {
  name: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const result = await resend.emails.send({
      from: `Align With Fun <${process.env.SUPPORT_EMAIL!}>`,
      to: "align.with.fun@gmail.com",
      subject: `New enquiry: ${subject}`,
      replyTo: `${email}`,
      react: ContactUsEmailTemplate({
        name,
        lastname,
        email,
        message,
      }),
    });

    return { success: true, result };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}
