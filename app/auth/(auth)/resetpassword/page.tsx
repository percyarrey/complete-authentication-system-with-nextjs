"use client";

import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  handleResetPassword,
  handleVerifyResetPasswordCode,
} from "@/server actions/auth/actions";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function ResetPassword({ searchParams }: { searchParams: any }) {
  const router = useRouter();
  const { id, Code }: { id: any; Code: any } = React.use(searchParams);
  const newSearchParams: any = React.use(searchParams);
  const pathname = usePathname();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCodeVerified, setisCodeVerified] = useState(false);
  const [code, setCode] = useState(Code || "");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  //CREATE QUERY STRING
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(newSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [newSearchParams]
  );

  //VERIFY CODE
  async function verifyCode() {
    if (code.length === 4 && id) {
      try {
        const result = await handleVerifyResetPasswordCode(id, code);
        if (result.success) {
          if (!isCodeVerified) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("Code", code);

            if (!Code || Code !== code) {
              router.push(`${pathname}?${createQueryString("Code", code)}`);
            } else {
              setisCodeVerified(true);
            }
          }
        } else {
          toast.warn(result.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } catch (error) {
        console.error(error);
        toast.warn("Something went wrong. Try again!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  }

  useEffect(() => {
    if (code.length === 4 && id) {
      verifyCode();
    }
  }, [code]);

  // Handle password change
  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
    setPasswordError(null); // Clear error when user starts typing
  }

  // Handle confirm password change
  function handleConfirmPasswordChange(e: any) {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(null); // Clear error when user starts typing
  }

  // Handle code change
  function handleCodeChange(e: any) {
    setCode(e.target.value);
  }

  // Validate strong password criteria
  function validateStrongPassword(password: string) {
    const errors = [];
    const minLength = 8;

    if (password.length < minLength) {
      errors.push(`at least ${minLength} characters long`);
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("at least one uppercase letter");
    }

    return errors;
  }

  // Handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    if (loading) return;

    if (!isCodeVerified) {
      verifyCode();
      return;
    }

    if (!password || !confirmPassword) {
      return toast.warn("Please fill in all fields.");
    }

    const passwordErrors = validateStrongPassword(password);
    if (passwordErrors.length) {
      setPasswordError(`Password must include: ${passwordErrors.join(", ")}.`);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await handleResetPassword(id, code, password);
      if (result.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => router.push("/auth/login"), 500);
      } else {
        toast.warn(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[95vh] justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {isCodeVerified ? (
          <>
            <h1 className="text-2xl font-bold text-center mytxt">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <FormControl isInvalid={!!passwordError}>
                <FormLabel
                  htmlFor="password"
                  className="text-md font-medium text-gray-900"
                >
                  New Password
                </FormLabel>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />
                {passwordError && (
                  <FormErrorMessage>{passwordError}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!confirmPasswordError}>
                <FormLabel
                  htmlFor="confirm-password"
                  className="text-md font-medium text-gray-900"
                >
                  Confirm New Password
                </FormLabel>
                <Input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm new password"
                  required
                />
                {confirmPasswordError && (
                  <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                type="submit"
                width="100%"
                variant="solid"
                colorScheme="green"
                color="white"
                isLoading={loading}
                loadingText="Resetting..."
              >
                <span>{!loading && "Reset Password"}</span>
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mytxt">Enter Code</h1>
            <p className="text-center text-gray-700 mt-2">
              Check your email for a code to reset your password. If it doesn’t
              appear within a few minutes, check your spam folder.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <FormControl>
                <FormLabel
                  htmlFor="code"
                  className="text-md font-medium text-gray-900"
                >
                  Code
                </FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={code}
                  onChange={handleCodeChange}
                  maxLength={4} // Set maximum length to 4 characters
                  placeholder="Enter the code"
                  required
                />
              </FormControl>
              <Button
                type="submit"
                width="100%"
                variant="solid"
                disabled={code.length !== 4}
                colorScheme={code.length === 4 ? "green" : "blackAlpha"}
                color="white"
                isLoading={loading}
                loadingText="Checking..."
              >
                <span>{!loading && "Check Code"}</span>
              </Button>
            </form>
            <div className="text-start mt-4">
              <span className="text-gray-700">{"Didn't"} receive a code, </span>
              <Link href={"/auth/forgotpassword"} className="text-blue-500">
                Try Again
              </Link>
            </div>
          </>
        )}
        <div className="mt-6 text-center">
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
