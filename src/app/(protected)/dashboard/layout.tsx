import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="flex justify-between px-10 py-4 border-b bg-sidebar">
        <h1>Logo</h1>
        <nav className="flex gap-x-6 items-center">
          <Link href={"/posts"} className="text-sm hover:underline">
            Posts
          </Link>
          <UserButton />
        </nav>
      </header>

      {children}
    </div>
  );
};

export default DashboardLayout;
