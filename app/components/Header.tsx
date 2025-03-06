"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineLogin } from "react-icons/ai"; // Login Icon
import { BiSolidUser, BiSolidUserPlus, BiMenu } from "react-icons/bi"; // User Icon
import { signOut } from "next-auth/react"; // Import signOut function
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Box,
} from "@chakra-ui/react"; // Chakra UI components
import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdMonetizationOn,
  MdHelpOutline,
  MdSettings,
  MdDashboard,
} from "react-icons/md"; // Import outline icons

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    isVerified?: boolean | null;
    balance?: {
      available: number;
      pending: number;
    };
  };
  expires: string; // or ISODateString if you have that type defined
}

function Header({ session }: { session: CustomSession | null }) {
  const data = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI drawer state
  if (isActive("/auth")) {
    return null;
  }
  return (
    <div className="bg-[#F9F9F9] border-b-2 border-gray-100 fixed w-screen z-10">
      <header className={`container-lg ${data ? "py-2" : "py-4"}`}>
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/" className="flex gap-1">
              <Image src={"/favicon.png"} height={30} width={30} alt="logo" />
              <span className="self-center text-2xl font-bold whitespace-nowrap mytxt">
                GiftApex
              </span>
            </Link>
          </div>
          {/* Menu Button for Drawer */}

          {data && (
            <IconButton
              aria-label="Open Menu"
              icon={<BiMenu size={30} className="lg:hidden" />}
              onClick={() => {
                if (isOpen) {
                  onClose();
                  setTimeout(() => {
                    if (isOpen) {
                      onOpen();
                    }
                  }, 200);
                } else {
                  onOpen();
                }
              }}
            />
          )}
          {/* Navigation Links for larger screens */}
          {data ? (
            <div className="hidden lg:flex  flex-grow justify-center space-x-4">
              <Link
                href="/user/sell-code"
                className={`text-gray-700 hover:font-semibold hover:text-green-500 py-2 ${
                  isActive("/user/sell-code")
                    ? "border-b-2 border-green-500 font-semibold text-green-500"
                    : ""
                }`}
              >
                Sell Code
              </Link>
              <Link
                href="/user/codes"
                className={`text-gray-700 hover:font-semibold hover:text-green-500 py-2 ${
                  isActive("/user/codes")
                    ? "border-b-2 border-green-500 font-semibold text-green-500"
                    : ""
                }`}
              >
                Codes
              </Link>
              <Link
                href="/user/wallet"
                className={`text-gray-700 hover:font-semibold hover:text-green-500 py-2 ${
                  isActive("/user/wallet")
                    ? "border-b-2 border-green-500 font-semibold text-green-500"
                    : ""
                }`}
              >
                Wallet
              </Link>
              <Link
                href="/user/payout"
                className={`text-gray-700 hover:font-semibold hover:text-green-500 py-2 ${
                  isActive("/user/payout")
                    ? "border-b-2 border-green-500 font-semibold text-green-500"
                    : ""
                }`}
              >
                Payout
              </Link>
              <Link
                href="/faq"
                className={`text-gray-700 hover:font-semibold hover:text-green-500 py-2 ${
                  isActive("/faq")
                    ? "border-b-2 border-green-500 font-semibold text-green-500"
                    : ""
                }`}
              >
                FAQ
              </Link>
            </div>
          ) : (
            <div className="flex justify-end flex-1">
              <Link
                href="/auth/login"
                className="flex items-center text-gray-700 hover:font-semibold hover:bg-gray-100 rounded-md py-[0.35rem] px-4 transition duration-300"
              >
                <AiOutlineLogin className="mr-1" />
                Login
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center text-white hover:font-semibold bg-green-500 hover:bg-green-600 rounded-md py-[0.35rem] px-4 transition duration-300 shadow-md"
              >
                <BiSolidUserPlus className="mr-1" size={20} />
                Register
              </Link>
            </div>
          )}
          {/* User Icon and Balance for larger screens */}
          {data && (
            <div className="hidden lg:flex relative items-center">
              <div className="relative group">
                <button className="flex items-center text-green-500 hover:text-green-700 py-2">
                  <BiSolidUser className="mr-1" />
                  <span className="text-gray-500 capitalize">{data.role}</span>
                </button>
                <div className="absolute -right-14 w-50 bg-white border border-gray-200 rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  {/* User Information */}
                  <div className="px-4 py-2 text-gray-800">
                    <div className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {data.name}
                    </div>
                    <div className="text-sm whitespace-nowrap text-gray-500 overflow-hidden text-ellipsis">
                      {data.email}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="border-t border-gray-200 my-1"></div>
                  {data.role === "admin" && (
                    <Link
                      href="/admin/recent-requests"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/user/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    User Settings
                  </Link>
                  <button
                    onClick={() => signOut()} // Call signOut on click
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
              {/* User Balance Display */}
              <div className="text-gray-700 text-sm text-right ml-2 bg-gray-100 rounded-md p-2">
                <div className="text-green-600">
                  Available:{" "}
                  <span className="text-gray-700 font-semibold">
                    US${data.balance?.available.toFixed(2)}0.00
                  </span>
                </div>
                <div className="text-orange-600">
                  Pending:{" "}
                  <span className="text-gray-700 font-semibold">
                    US${data.balance?.pending.toFixed(2)}0.00
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Drawer for Navigation Links and User Info */}
      <Drawer isOpen={isOpen} placement="left" size={"full"} onClose={onClose}>
        <DrawerOverlay className="bg-gray-100" />
        <DrawerContent className="px-4 pt-5">
          <div className="flex justify-between">
            <DrawerHeader className="mytxt font-bold text-2xl">
              GiftApex
            </DrawerHeader>
            <DrawerCloseButton className="text-red-500 border-2 border-red-400 bg-red-500 bg-opacity-10 px-2 py-1 rounded-md" />
          </div>
          <DrawerBody>
            <>
              <div>
                <button
                  className={`text-start mt-4 w-full px-2 rounded-sm py-2 hover:text-green-500 ${
                    isActive("/user/sell-code") &&
                    "border-r-2 border-green-500 bg-gray-200 text-green-500"
                  }`}
                  onClick={() => {
                    onClose();
                    router.push("/user/sell-code");
                  }}
                >
                  <MdAttachMoney className="inline-block mr-2" />
                  Sell Code
                </button>
              </div>

              <div>
                <button
                  className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                    isActive("/user/wallet") &&
                    "border-r-2 border-green-500 bg-gray-200 text-green-500"
                  }`}
                  onClick={() => {
                    onClose();
                    router.push("/user/wallet");
                  }}
                >
                  <MdAccountBalanceWallet className="inline-block mr-2" />
                  Wallet
                </button>
              </div>

              <div>
                <button
                  className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                    isActive("/user/payout") &&
                    "border-r-2 border-green-500 bg-gray-200 text-green-500"
                  }`}
                  onClick={() => {
                    onClose();
                    router.push("/user/payout");
                  }}
                >
                  <MdMonetizationOn className="inline-block mr-2" />
                  Payout
                </button>
              </div>

              <div>
                <button
                  className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                    isActive("/faq") &&
                    "border-r-2 border-green-500 bg-gray-200 text-green-500"
                  }`}
                  onClick={() => {
                    onClose();
                    router.push("/faq");
                  }}
                >
                  <MdHelpOutline className="inline-block mr-2" />
                  FAQ
                </button>
              </div>

              <div>
                {data?.role === "admin" && (
                  <>
                    <button
                      className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                        isActive("/admin/recent-requests") &&
                        "border-r-2 border-green-500 bg-gray-200 text-green-500"
                      }`}
                      onClick={() => {
                        onClose(); // Close any menus or overlays
                        router.push("/admin/recent-requests"); // Navigate to admin recent requests
                      }}
                    >
                      <MdDashboard className="inline-block mr-2" />{" "}
                      {/* New icon here */}
                      Admin Panel
                    </button>
                  </>
                )}
                <button
                  className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                    isActive("/user/settings") &&
                    "border-r-2 border-green-500 bg-gray-200 text-green-500"
                  }`}
                  onClick={() => {
                    onClose();
                    router.push("/user/settings");
                  }}
                >
                  <MdSettings className="inline-block mr-2" />
                  User Settings
                </button>
              </div>

              <Box className="p-4 border rounded-lg shadow-md bg-slate-50 mt-6">
                <div className="font-semibold text-lg mytxt">
                  User Information
                </div>
                <div className="mt-1 text-md">{data?.name}</div>
                <div className=" text-sm text-gray-500">{data?.email}</div>
                <div className="text-green-600 text-sm mt-3">
                  Available:{" "}
                  <span className="text-gray-700 font-semibold">
                    US${data?.balance?.available.toFixed(2)}0.00
                  </span>
                </div>
                <div className="text-orange-600 text-sm">
                  Pending:{" "}
                  <span className="text-gray-700 font-semibold">
                    US${data?.balance?.pending.toFixed(2)}0.00
                  </span>
                </div>
              </Box>
              <div className="mt-4">
                <Button
                  width="100%"
                  colorScheme="red"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="py-2 font-medium hover:bg-red-600 transition duration-200"
                >
                  Log Out
                </Button>
              </div>
            </>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;
