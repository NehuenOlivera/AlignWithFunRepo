"use client";

import { sendMessage } from "@/app/contactus/actions";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";

export default function ContactUsForm() {
  const [isPending, startTransition] = useTransition();
  const formStartedAt = useRef<number>(Date.now());

  async function action(formData: FormData) {
    startTransition(async () => {
      const res = await sendMessage(formData);

      if (res.success) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Something went wrong, try again later.");
      }
    });
  }

  return (
    <form action={action} className="flex justify-center">
      <div className="bg-(--color-light-green) w-full max-w-md lg:max-w-2xl rounded-2xl border mt-4 mx-4 p-4 space-y-2">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-(--color-dark-green) font-semibold"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="bg-(--color-beige) text-(--color-dark-green) h-8 rounded-2xl pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="lastname"
            className="text-(--color-dark-green) font-semibold"
          >
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            required
            className="bg-(--color-beige) text-(--color-dark-green) h-8 rounded-2xl pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-(--color-dark-green) font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="bg-(--color-beige) text-(--color-dark-green) h-8 rounded-2xl pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="subject"
            className="text-(--color-dark-green) font-semibold"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            className="bg-(--color-beige) text-(--color-dark-green) h-8 rounded-2xl pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="text-(--color-dark-green) font-semibold"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            className="bg-(--color-beige) text-(--color-dark-green) min-h-22 rounded-2xl pl-3 field-sizing-content"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="text-(--color-beige) text-2xl bg-(--color-terracota) mt-2 rounded-2xl p-2"
          >
            {isPending ? "Sending..." : "Send message"}
          </button>
        </div>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
        <input
          type="hidden"
          name="formStartedAt"
          value={formStartedAt.current}
        />
      </div>
    </form>
  );
}
