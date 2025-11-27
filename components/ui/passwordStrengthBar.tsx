"use client";

import { useEffect } from "react";

export default function PasswordStrengthBar({
  password,
  onStrengthChange,
}: {
  password: string;
  onStrengthChange: (strength: number) => void;
}) {
  const strength = getStrength(password);

  const colors: Record<number, string> = {
    0: "bg-red-500",
    1: "bg-orange-500",
    2: "bg-yellow-500",
    3: "bg-green-500",
  };

  useEffect(() => {
    onStrengthChange(strength);
  }, [onStrengthChange, strength]);

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-[#022e14]/20 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${colors[strength]} `}
          style={{ width: `${((strength + 1) / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  return Math.min(score - 1, 3);
}
