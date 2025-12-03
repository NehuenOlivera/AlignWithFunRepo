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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* MODAL */}
      <div className="relative z-50 w-[90%] max-w-md rounded-2xl bg-white shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center mt-2 mb-4">
          {/* Avatar circle */}
          <div className="h-20 w-20 rounded-full bg-green-200 flex items-center justify-center text-3xl font-bold text-green-700">
            {user.first_name[0]}
            {user.last_name[0]}
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <hr className="my-4 text-green-700" />

        {/* DETAILS */}
        <div className="space-y-3 text-gray-700">
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

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Waiver:</span>
            {user.waiver_signed ? (
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-semibold">
                SIGNED
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 font-semibold">
                NOT SIGNED
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
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
