import { CancelClassEmailTemplate } from "@/components/emails/CancelledClass";
import { Resend } from "resend";
import { Event, Attendee } from "@/components/admin/eventsManager";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { event }: { event: Event } = await req.json();

    if (!event || !event.attendees) {
      return Response.json(
        { error: "Missing event or attendees" },
        { status: 400 }
      );
    }

    // Send all attendee emails in parallel:
    const sendPromises = event.attendees.map((attendee: Attendee) =>
      resend.emails.send({
        from: `Align With Fun <${process.env.SUPPORT_EMAIL!}>`,
        to: attendee.email,
        replyTo: "align.with.fun@gmail.com",
        subject: `Class Cancelled: ${event.name}`,
        react: CancelClassEmailTemplate({
          event,
          attendee,
        }),
      })
    );

    const results = await Promise.allSettled(sendPromises);

    // Optional: detect any failures
    const failed = results.filter((r) => r.status === "rejected");

    if (failed.length > 0) {
      console.log("Some emails failed:", failed);
      return Response.json(
        { warning: "Some emails failed", results },
        { status: 207 }
      );
    }

    return Response.json({ success: true, results });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
