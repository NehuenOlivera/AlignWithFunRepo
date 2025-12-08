import { CancelClassEmailTemplate } from "@/components/emails/CancelledClass";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { event } = await req.json();

    const { data, error } = await resend.emails.send({
      from: `AlignWithFun <${process.env.SUPPORT_EMAIL!}>`,
      to: ["nehuenolivera@gmail.com"],
      subject: "Class has been cancelled",
      react: CancelClassEmailTemplate({ event }),
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
