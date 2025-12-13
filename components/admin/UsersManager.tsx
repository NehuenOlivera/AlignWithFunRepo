"use client";

import { useState } from "react";
import { Collapse } from "react-collapse";
import UserRow from "./UserRow";
import { ToggableHeader } from "../ui/ToggableHeader";

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
      <ToggableHeader
        title="Users"
        isOpen={isUsersManagementOpen}
        onToggle={usersManagerToggleCollapse}
      />
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
