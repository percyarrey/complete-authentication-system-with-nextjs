"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react"; // Import Chakra UI components
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { BiHide, BiShow } from "react-icons/bi";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  function isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { email, password, rememberMe } = data;

    if (loading || !email || !password) {
      toast.warn(
        !email || !password
          ? "Please fill required Information"
          : "Enter a valid email",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      return;
    }

    if (!isEmailValid(email)) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        rememberMe,
        action: "login",
        redirect: false,
      });

      if (res?.error) {
        const errorMessage =
          res.error === "Wrong Username and Password"
            ? res.error
            : "Something went wrong! Try Again";
        toast.warn(errorMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setTimeout(() => router.refresh(), 500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Try Again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    await signIn("google", {
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
  }

  return (
    <section className="flex overflow-hidden min-h-[95vh]">
      <div className="w-full flex justify-center items-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight mytxt md:text-2xl dark:text-white text-center">
              Log in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <FormControl isRequired={data.email == ""}>
                <FormLabel
                  htmlFor="email"
                  className="text-md font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </FormLabel>
                <Input
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="on"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </FormControl>
              <FormControl isRequired={data.password == ""}>
                <FormLabel
                  htmlFor="password"
                  className="text-md font-medium text-gray-900 dark:text-white"
                >
                  Password
                </FormLabel>
                <Input
                  value={data.password}
                  autoComplete="on"
                  onChange={handleChange}
                  type={showPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
                <span
                  onClick={togglePassword}
                  className="absolute cursor-pointer bottom-2 right-3"
                >
                  {showPassword ? <BiShow size={25} /> : <BiHide size={25} />}
                </span>
              </FormControl>
              <div className="flex items-center justify-between">
                <Checkbox
                  id="remember"
                  name="rememberMe"
                  onChange={handleChange}
                  className="mt-2"
                >
                  Remember me
                </Checkbox>
                <Link
                  href="/auth/forgotpassword"
                  className="text-md font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                width="100%"
                variant={"solid"}
                colorScheme="green"
                color={"white"}
                isLoading={loading}
                loadingText="Logging In"
              >
                <span>{!loading && "Log In"}</span>
              </Button>

              <GoogleButton
                onClick={handleGoogle}
                style={{ width: "100%" }}
                className="mx-auto"
              />

              <div>
                <p className="text-md font-light text-gray-600 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/auth/register"
                    className="font-semibold mytxt hover:underline dark:text-blue-500"
                  >
                    Register
                  </Link>
                </p>
                <p className="text-md font-light text-gray-600 dark:text-gray-400">
                  Don’t want to Login?{" "}
                  <Link
                    href="/"
                    className="font-semibold text-red-600 hover:underline dark:text-red-500"
                  >
                    Return Home
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
