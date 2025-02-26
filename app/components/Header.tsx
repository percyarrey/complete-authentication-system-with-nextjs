"use client";
import React, { useState } from "react";
//LINK
import Link from "next/link";
import { usePathname } from "next/navigation";

//ICONS
import { BsX } from "react-icons/bs";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";

//COMPONENT
import Image from "next/image";

//NEXT AUTH
import { signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";

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

function Header() {
  //SESSION
  const { data, status } = useSession();
  // Type assertion for the session
  const session = data as CustomSession;
  //NAVIGATION
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const [Menu, setMenu] = useState(false);

  //HANDLE NAVBAR
  const handleNavbar = (e: any) => {
    document?.getElementById("navbar-sticky")?.classList.toggle("hidden");
    setMenu((prev) => !prev);
    if (document.getElementById("NavbarClose")?.classList.contains("hidden")) {
      document.getElementById("NavbarClose")?.classList.toggle("hidden");
    }
  };
  const handleDropdown = (e: any) => {
    document.getElementById("user-dropdown")?.classList.toggle("hidden");
    document.getElementById("user-dropdown")?.classList.toggle("absolute");
  };
  const DropdownClose = (e: any) => {
    document.getElementById("user-dropdown")?.classList.toggle("hidden");
    document.getElementById("user-dropdown")?.classList.toggle("absolute");
  };

  if (isActive("/auth")) {
    return null;
  }
  return (
    <>
      <header>
        {/* NAVIGATION HEADER */}
        <nav className="fixed h-[4rem] bg-white w-full z-20  left-0 border-b  border-gray-200 dark:border-gray-600 lg:px-8 pl-2">
          <div className="flex flex-wrap  items-center  mx-auto py-4 w-full  justify-between">
            <Link
              href="/"
              className="flex w-2/12 mb-3 sm:w-4/12 md:w-3/12 items-center"
            >
              <span className="self-center  hidden  sm:flex text-2xl font-bold  whitespace-nowrap mytxt">
                {"CreativePart's"}
              </span>
            </Link>
            <div
              id="toggle"
              className="flex w-4/12 sm:w-2/12 lg:w-1/12 justify-end lg:flex lg:order-3"
            >
              <button
                type="button"
                onClick={handleDropdown}
                className="flex justify-center items-center text-sm bg-transparent w-8 h-8 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 mt-2"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                {status === "authenticated" ? (
                  <FaUser size={32} className="w-8 h-8 rounded-full" />
                ) : (
                  <AiOutlineUser size={32} className="w-8 h-8 rounded-full" />
                )}
              </button>
              <div
                className="z-10 hidden top-[2.6rem] right-[3rem] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 "
                id="user-dropdown"
              >
                <button
                  className="w-[100vw] z-[-1] h-[100vh] cursor-default fixed top-0 left-0"
                  onClick={DropdownClose}
                ></button>

                {status === "authenticated" ? (
                  <>
                    <div className="px-4 py-3 z-10">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {session?.user?.name}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {session?.user?.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      {session?.user?.role === "admin" && (
                        <>
                          <li>
                            <Link
                              href="/admin/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/manageproduct"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Add Product
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <Link
                          href="/user/recentorders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Recent orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/user/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            signOut();
                          }}
                          className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <div className="px-0 py-3">
                      <ul className="py-0" aria-labelledby="user-menu-button">
                        <li>
                          <Link
                            href="/auth/login"
                            className="min-w-[8rem] px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-md dark:text-gray-200 dark:hover:text-white flex gap-5"
                          >
                            <FaSignInAlt className="mr-2 mt-1" />
                            Login
                          </Link>
                        </li>
                        <hr />
                        <li>
                          <Link
                            href="/auth/register"
                            className="flex gap-4 px-4 py-2 text-md w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            <FaUserPlus className="mr-2 mt-1" />
                            Register
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div className="relative top-[-0.2rem]">
                <button
                  data-collapse-toggle="navbar-sticky"
                  onClick={handleNavbar}
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 cursor-pointer justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
                  aria-controls="navbar-sticky"
                  aria-expanded="true"
                >
                  <span className="sr-only">Open main menu</span>
                  {Menu ? (
                    <BsX size={40} />
                  ) : (
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
