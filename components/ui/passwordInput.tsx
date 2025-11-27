"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
  id,
  name,
}: {
  value: string;
  onChange: (value: string) => void;
  id: string;
  name: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white/60 border border-[#022e14]/20 text-[#022e14] placeholder-[#022e14]/40 rounded-xl h-11 pr-11"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="text-[#022e14]/60 absolute right-4"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <ul className="text-xs mt-2 text-[#022e14]/60 space-y-1">
        <li>• At least 8 characters</li>
        <li>• One uppercase letter</li>
        <li>• One lowercase letter</li>
        <li>• One number</li>
      </ul>
    </div>
  );
}
