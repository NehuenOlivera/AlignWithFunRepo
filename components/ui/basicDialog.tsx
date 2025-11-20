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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#181818] border border-[#333] rounded-xl max-w-xl p-6! shadow-xl animate-in fade-in zoom-in">
        <div className="flex justify-between items-center mb-4!">
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
