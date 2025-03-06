"use client";
/* import Image from 'next/legacy/image' */
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    isVerified?: boolean | null;
  };
  expires: string; // or ISODateString if you have that type defined
}

//NEXT AUTH
function Footer({ session }: { session: Session | null }) {
  //SESSION
  const data = session;
  //NAVIGATION
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };
  if (isActive("/auth")) {
    return null;
  }
  return (
    <div className=" bg-zinc-50 relative w-full mt-2">
      <footer className=" py-8">
        <div className="container-lg">
          <div className="text-start">
            <h2 className="text-3xl font-bold mb-2 mytxt">GiftApex</h2>
            <p className="mb-4 text-gray-600">
              Giftapex is your go-to platform for seamless gift card exchanges
              and money transfers. Our user-friendly interface ensures a smooth
              experience, allowing you to convert gifts into cash effortlessly.
              Join us today and make the most of your gifts! <br />
              <Link className="text-green-700" href={"/privacy-policy"}>
                privacy policy
              </Link>
            </p>
            <hr className="mb-4"></hr>
            <p className="mb-2">
              {/* Replace with dynamic balance */}
              {data && (
                <>
                  Account Balance: <span className="font-semibold">$0.00</span>{" "}
                </>
              )}
            </p>
            <p className="text-sm mytxt">
              &copy; {new Date().getFullYear()} Giftapex. All rights reserved.
            </p>
            <p className="text-sm text-gray-700">
              Currency Conversion Powered by <Link href={"#"}>GiftApex</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
