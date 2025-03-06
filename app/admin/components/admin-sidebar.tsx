"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdMonetizationOn,
  MdPeople,
  MdSettings,
} from "react-icons/md"; // Import your icons

export default function AdminSidebar() {
  const router = useRouter();
  const currentPath = usePathname(); // Get the current path

  // Function to check if a link is active
  const isActive = (path: string) => currentPath === path;

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <div className="lg:w-1/4 p-4 lg:h-full">
        <button
          className={`w-full  text-start mt-4 px-2 rounded-sm py-2 flex justify-between items-center hover:text-green-500`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
        >
          <span className="text-xl font-semibold mb-1">Admin Panel</span>
          <div className="border-2 text-green bg-green-50 rounded-md shadow-md lg:hidden">
            {isDropdownOpen ? (
              <MdArrowDropUp size={30} />
            ) : (
              <MdArrowDropDown size={30} />
            )}
          </div>
        </button>
        {isDropdownOpen && (
          <div className="lg:hidden mt-3">
            <button
              className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                isActive("/admin/recent-requests") &&
                "border-r-2 border-green-500 bg-gray-200 text-green-500"
              }`}
              onClick={() => handleNavigation("/admin/recent-requests")}
            >
              <MdMonetizationOn className="inline-block mr-2" />
              Recent Requests
            </button>

            <button
              className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                isActive("/admin/users") &&
                "border-r-2 border-green-500 bg-gray-200 text-green-500"
              }`}
              onClick={() => handleNavigation("/admin/users")}
            >
              <MdPeople className="inline-block mr-2" />
              Users
            </button>

            <button
              className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
                isActive("/admin/commission-rate") &&
                "border-r-2 border-green-500 bg-gray-200 text-green-500"
              }`}
              onClick={() => handleNavigation("/admin/commission-rate")}
            >
              <MdSettings className="inline-block mr-2" />
              Commission Rate
            </button>
          </div>
        )}
        <div className="hidden lg:block">
          <button
            className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
              isActive("/admin/recent-requests") &&
              "border-r-2 border-green-500 bg-gray-200 text-green-500"
            }`}
            onClick={() => handleNavigation("/admin/recent-requests")}
          >
            <MdMonetizationOn className="inline-block mr-2" />
            Recent Requests
          </button>

          <button
            className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
              isActive("/admin/users") &&
              "border-r-2 border-green-500 bg-gray-200 text-green-500"
            }`}
            onClick={() => handleNavigation("/admin/users")}
          >
            <MdPeople className="inline-block mr-2" />
            Users
          </button>

          <button
            className={`w-full text-start mt-4 px-2 rounded-sm py-2 hover:text-green-500 ${
              isActive("/admin/commission-rate") &&
              "border-r-2 border-green-500 bg-gray-200 text-green-500"
            }`}
            onClick={() => handleNavigation("/admin/commission-rate")}
          >
            <MdSettings className="inline-block mr-2" />
            Commission Rate
          </button>
        </div>
      </div>
    </>
  );
}
