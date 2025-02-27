"use client";
/* import Image from 'next/legacy/image' */
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { BsQuestionCircle } from "react-icons/bs";

//NEXT AUTH
import { useSession } from "next-auth/react";
function Footer() {
  //SESSION
  const { status } = useSession();
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
      <footer className="container px-2 lg:px-8">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
            <div className="col-span-1">
              <div className="flex items-center">
                <Link className="navbar-brand flex items-center" href="/">
                  {/* <Image  src={logo}
              height={50} width={50} alt="Creativepart"/> */}
                  <span className="ml-2 text-green-500 text-2xl font-semibold">
                    Creative {}
                    {"Part's"}
                  </span>
                </Link>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p>
                  <strong>ADDRESS:</strong> Cameroon, Buea, Molyko
                </p>
                <p>
                  <strong>TELEPHONE:</strong> +237 6737845
                </p>
                <p>
                  <strong>EMAIL:</strong> Email@gmail.com
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mt-4">
                <h3 className="font-bold">Menu</h3>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/deals">Products</Link>
                  </li>
                  <li>
                    <Link href="/trackorder">Track Orders</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mt-4">
                <h3 className="font-bold">Account</h3>
                <ul>
                  {status !== "authenticated" ? (
                    <>
                      <li>
                        <Link href="/auth/login">Login</Link>
                      </li>
                      <li>
                        <Link href="/auth/register">Register</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/user/profile">Profile</Link>
                    </li>
                  )}
                  <li>
                    <Link href="/cart">Checkout</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mt-6">
                <div className="mt-4">
                  <h3 className="font-bold">Newsletter</h3>
                  <div className="mt-2">
                    <p>Subscribe to our newsletter and get updates daily.</p>
                  </div>
                  <div className="mt-4">
                    <form>
                      <div className="flex items-center">
                        <input
                          required
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Your Mail"
                          className="bg-white border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500 block w-full py-2 px-4 sm:text-sm"
                        />
                        <input
                          type="submit"
                          value="Subscribe"
                          className="bg-green-500 text-white px-4 py-2 rounded-r-md cursor-pointer"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <hr className="mt-2" />
      <div className=" container px-2 pb-1 lg:px-8 flex flex-wrap justify-between gap-x-4">
        <div className="flex gap-1 items-center">
          <BsQuestionCircle color="#C34482" fontSize={21} />
          <Link className=" hover:text-[#C34482]" href={"/contact"}>
            Help Center
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <Link className=" hover:text-[#C34482]" href={"/contact"}>
            Terms of Service
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <Link className=" hover:text-[#C34482]" href={"/contact"}>
            Privacy and Security
          </Link>
        </div>
      </div>

      <div className="text-center pb-2 text-green-500 text-sm">
        Copyright &copy; 2023. All rights reserved by Creative {"Part's"}.
      </div>
    </div>
  );
}

export default Footer;
