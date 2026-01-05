"use client";

import { useMemo, useState } from "react";
import { Collapse } from "react-collapse";
import UserRow from "./UserRow";
import { ToggableHeader } from "../ui/ToggableHeader";
import { User } from "lucide-react";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: number;
  waiver_signed: boolean;
}

export default function UsersManager({ users }: { users: User[] }) {
  const [isUsersManagementOpen, setIsUsersManagementOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    if (!search) return users;

    const s = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.first_name.toLowerCase().startsWith(s) ||
        user.last_name.toLowerCase().startsWith(s)
      );
    });
  }, [users, search]);

  const usersManagerToggleCollapse = () => {
    setIsUsersManagementOpen(!isUsersManagementOpen);
  };

  return (
    <>
      <ToggableHeader
        title="Users"
        isOpen={isUsersManagementOpen}
        onToggle={usersManagerToggleCollapse}
      />
      <Collapse isOpened={isUsersManagementOpen}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="text-(--color-dark-green) placeholder-gray-500 border border-(--color-dark-green) rounded-2xl w-full pl-4 py-2 mt-2"
        />
        <div className="mt-4">
          {filteredUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </Collapse>
    </>
  );
}
