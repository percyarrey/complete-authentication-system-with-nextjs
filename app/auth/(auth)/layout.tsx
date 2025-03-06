// app/auth/layout.js
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import ClientRedirect from "../components/ClientRedirect";
import { redirect } from "next/navigation";
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
export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await auth();
  // Type assertion for the session
  const session = data as CustomSession;
  if (session?.user && session?.user?.isVerified) {
    if (session?.user.role === "admin") {
      redirect("/admin/recent-requests");
    } else {
      redirect("/user/sell-code");
    }
  }

  return (
    <div className="px-4">
      <ClientRedirect />
      {children}
    </div>
  );
}
