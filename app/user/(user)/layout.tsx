import { ReactNode } from "react";
import { auth } from "@/auth";
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

  if (!session?.user) redirect("/auth/login");
  if (!session?.user?.isVerified) redirect("/auth/verifyemail");

  return <div className="container-lg">{children}</div>; // Wrap children in a fragment
}
