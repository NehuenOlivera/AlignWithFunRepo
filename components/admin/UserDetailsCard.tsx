"use client";

import { X } from "lucide-react";
import { User } from "./UsersManager";

export default function UserDetailsCard({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* MODAL */}
      <div className="relative z-50 w-[90%] max-w-md rounded-2xl shadow-xl p-7 bg-[#FAF4EB]">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center mt-2 mb-6">
          {/* Avatar con degradado */}
          <div
            className="h-20 w-20 rounded-full text-3xl font-bold text-white flex items-center justify-center shadow-md"
            style={{
              background: "linear-gradient(135deg, #F5877B 0%, #FFB36B 100%)",
            }}
          >
            {user.first_name[0]}
            {user.last_name[0]}
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800 tracking-wide">
            {user.first_name} {user.last_name}
          </h1>

          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        </div>

        {/* Divider con degradado */}
        <div
          className="h-0.5 w-full rounded-full my-6"
          style={{
            background:
              "linear-gradient(90deg, #B8CDB0 0%, #4CA6C8 50%, #FFB36B 100%)",
          }}
        />

        {/* DETAILS */}
        <div className="space-y-5 text-gray-700">
          <Detail label="Phone" value={user.phone?.toString() ?? "—"} />
          <Detail
            label="Emergency Contact"
            value={user.emergency_contact_name ?? "—"}
          />
          <Detail
            label="Relationship"
            value={user.emergency_contact_relationship ?? "—"}
          />
          <Detail
            label="Emergency Contact Phone"
            value={user.emergency_contact_phone?.toString() ?? "—"}
          />

          {/* WAIVER */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Waiver
            </span>
            {user.waiver_signed ? (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
                style={{
                  backgroundColor: "#B8CDB0",
                  color: "#2D4A2F",
                }}
              >
                Signed
              </span>
            ) : (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
                style={{
                  backgroundColor: "#F5877B",
                  color: "white",
                }}
              >
                Not Signed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-lg font-semibold text-gray-900 max-w-[60%] text-right leading-snug">
        {value}
      </span>
    </div>
  );
}
