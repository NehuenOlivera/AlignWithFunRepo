"use client";

import { ReactNode } from "react";

export default function BasicDialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="dialog-wrapper">
      <div className="dialog-card">
        <div className="dialog-header">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={() => onOpenChange(false)}
            className="text-[#f5ece5]/70 hover:text-[#f5ece5]"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
