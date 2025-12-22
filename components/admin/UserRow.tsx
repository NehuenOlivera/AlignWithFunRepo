"use client";

import { Dot, Eye } from "lucide-react";
import { User } from "./UsersManager";
import UserDetailsCard from "./UserDetailsCard";
import { useState } from "react";

export default function UserRow({ user }: { user: User }) {
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b px-3 py-3 border-(--color-dark-green)">
        <div>
          <h1 className="font-semibold text-(--color-dark-green)">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-(--color-dark-green)">{user.email}</p>
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
            <Eye className="w-7 h-7 text-(--color-terracota)" />
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
