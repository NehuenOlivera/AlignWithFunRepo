"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  disabled,
  text,
  pendingText,
}: {
  disabled: boolean;
  text: string;
  pendingText: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      className="w-full h-11 rounded-xl bg-(--color-dark-green) text-white font-semibold"
    >
      {pending ? pendingText : text}
    </Button>
  );
}
