"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  checked = false,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        checked ? "bg-(--color-dark-green)" : "bg-gray-300",
        "shadow-inner",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none absolute h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-out",
          checked ? "translate-x-7" : "translate-x-1"
        )}
      />
    </button>
  );
}
