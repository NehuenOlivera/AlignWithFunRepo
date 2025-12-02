"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapse } from "react-collapse";
import UserRow from "./UserRow";

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

  const usersManagerToggleCollapse = () => {
    setIsUsersManagementOpen(!isUsersManagementOpen);
  };

  return (
    <>
      <div
        className="flex items-center justify-between border-b-2 p-3"
        onClick={usersManagerToggleCollapse}
      >
        <h1 className="text-3xl font-semibold text-(--color-beige)">Users</h1>
        {isUsersManagementOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <Collapse isOpened={isUsersManagementOpen}>
        <div className="mt-4">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </Collapse>
    </>
  );
}
