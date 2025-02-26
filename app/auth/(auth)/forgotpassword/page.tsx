"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleForgotPassword } from "@/server actions/auth/actions";

import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle email change
  function handleChange(e: any) {
    setEmail(e.target.value);
  }

  // Validate email format
  function isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    if (!email || !isEmailValid(email)) {
      toast.warn("Please enter a valid email address.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
      return;
    }

    setLoading(true);
    try {
      const { success, id, message } = await handleForgotPassword(email);

      toast[success ? "success" : "warn"](
        success ? "Recovery email sent successfully!" : message,
        {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        }
      );

      if (success) {
        setTimeout(() => {
          router.push(`/auth/resetpassword?id=${id}`);
        }, 500);
      }
    } catch (error: any) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[95vh] justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
              placeholder="name@company.com"
              required
            />
          </div>
          <Button
            type="submit"
            width="100%"
            variant={"solid"}
            colorScheme="green"
            color={"white"}
            isLoading={loading}
            loadingText="Sending..."
          >
            <span>{!loading && "Send Verification Code"}</span>
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-md font-light text-gray-500">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
