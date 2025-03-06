// app/components/ClientRedirect.js
"use client";

import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

import { useSession } from "next-auth/react";

export default function ClientRedirect() {
  //SESSION
  const session: any = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session.data?.user) {
      // If the user is not verified and not on the verify email page, redirect
      if (!session.data?.user?.isVerified && pathname !== "/auth/verifyemail") {
        redirect("/auth/verifyemail");
      }
    } else {
      if (pathname === "/auth/verifyemail") {
        redirect("/auth/login");
      }
    }
  }, [session?.data, pathname]);

  return null; // Render nothing since this component only handles redirects
}
