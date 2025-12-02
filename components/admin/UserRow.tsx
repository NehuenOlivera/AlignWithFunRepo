"use client";

import { Eye } from "lucide-react";
import { User } from "./UsersManager";

export default function UserRow({ user }: { user: User }) {
  return (
    <>
      <div className="flex items-center justify-between border-b px-3 py-3 border-green-600">
        <div>
          <h1 className="font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <p>{user.email}</p>
        </div>
        <div className="flex justify-center">
          <button className="justify-center rounded-full">
            <Eye className="w-7 h-7 text-(--color-yellow)" />
          </button>
        </div>
      </div>
    </>
  );
}
