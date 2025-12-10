import {
  EventInfoForEmail,
  UserWithNameAndEmail,
  JoinClassEmailTemplate,
} from "@/components/emails/JoinToClass";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendJoinClassEmail(
  event: EventInfoForEmail,
  user: UserWithNameAndEmail
) {
  resend.emails.send({
    from: `Align With Fun <${process.env.SUPPORT_EMAIL!}>`,
    to: user.email,
    replyTo: "align.with.fun@gmail.com",
    subject: `Class Booked: ${event.name}`,
    react: JoinClassEmailTemplate({
      event,
      user,
    }),
  });
}
