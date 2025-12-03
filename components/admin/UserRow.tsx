"use client";

import { Dot, Eye } from "lucide-react";
import { User } from "./UsersManager";
import UserDetailsCard from "./UserDetailsCard";
import { useState } from "react";

export default function UserRow({ user }: { user: User }) {
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

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
          {!user.waiver_signed ? (
            <Dot size={48} className="text-red-500" />
          ) : (
            ""
          )}
          <button
            className="justify-center rounded-full"
            onClick={() => setIsUserDetailsOpen(true)}
          >
            <Eye className="w-7 h-7 text-(--color-yellow)" />
          </button>
        </div>
        <UserDetailsCard
          open={isUserDetailsOpen}
          onOpenChange={setIsUserDetailsOpen}
          user={user}
        />
      </div>
    </>
  );
}
