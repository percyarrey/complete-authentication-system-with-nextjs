"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Margin() {
  const pathname = usePathname();

  // Function to check if the path is active
  const isActive = (path: string) => pathname.startsWith(path);

  // Return null if the current path is /auth
  if (isActive("/auth")) {
    return null;
  }
  if (isActive("/admin")) {
    return <div className="mt-[3rem] lg:mt-[4.5rem]"></div>;
  }

  return <div className="mt-[4.5rem]"></div>;
}
