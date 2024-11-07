"use client";

import { AddUserForm } from "../Modules/AddUserForm";
import { UserTable } from "../Modules/UserTable";

// Main Component
export default function UserSection() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <UserTable />
        <AddUserForm />
      </div>
    </div>
  );
}
