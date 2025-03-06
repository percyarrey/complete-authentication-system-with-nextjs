import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/admin-sidebar";

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    isVerified?: boolean | null;
  };
  expires: string; // or ISODateString if you have that type defined
}

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const data = await auth();

  const session = data as CustomSession;

  if (session?.user) {
    if (session.user.role !== "admin" || !session.user.isVerified) {
      redirect("/auth/login");
    }
  } else {
    redirect("/auth/login");
  }

  return (
    <div className=" bg-gray-100">
      <div className="flex flex-col lg:flex-row h-screen container-lg">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
