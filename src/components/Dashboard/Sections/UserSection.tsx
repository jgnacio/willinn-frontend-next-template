"use client";

import { AddUserForm } from "../Modules/AddUserForm";
import { UserTable } from "../Modules/UserTable";

// Main Component
export default function UserSection() {
  const users = [
    { id: "1", name: "Francis Santos", email: "fsantos@willinn.io" },
    { id: "2", name: "Francis Santos", email: "fsantos@willinn.io" },
    { id: "2", name: "Francis Santos", email: "fsantos@willinn.io" },
    { id: "3", name: "Francis Santos", email: "fsantos@willinn.io" },
    { id: "4", name: "Francis Santos", email: "fsantos@willinn.io" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <UserTable users={users} />
        <AddUserForm />
      </div>
    </div>
  );
}
