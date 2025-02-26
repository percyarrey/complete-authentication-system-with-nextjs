"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { handleVerifyEmail } from "../../../../server actions/auth/actions";
import { useRouter } from "next/navigation";
import { BiHide, BiShow } from "react-icons/bi";
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // HANDLE CHANGE
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }
  function toggleConfirmPassword() {
    setShowConfirmPassword((prev) => !prev);
  }

  // VALIDATION
  function validate() {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!data.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!isEmailValid(data.email)) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }

    if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }

    if (!/[A-Z]/.test(data.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
      valid = false;
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        name: data.name,
        password: data.password,
        action: "signin",
        redirect: false,
      });

      if (res?.error === null) {
        toast.success("Sign Up Successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });

        await handleVerifyEmail(data.email);
        setTimeout(() => {
          router.replace("/auth/verifyemail");
        }, 500);
      } else {
        const message =
          res?.error === "Email Already Exist"
            ? res.error
            : "Something went wrong! Try Again";
        toast.warn(message, {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Try Again", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex overflow-hidden min-h-[100vh]">
      <div className="w-full flex justify-center items-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight mytxt md:text-2xl dark:text-white text-center">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <FormControl
                id="name"
                isInvalid={!!errors.name}
                isRequired={data.name === ""}
              >
                <FormLabel className="text-md font-medium text-gray-900 dark:text-white">
                  Name
                </FormLabel>
                <Input
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  variant="outline"
                  placeholder=""
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="email"
                isInvalid={!!errors.email}
                isRequired={data.email === ""}
              >
                <FormLabel className="text-md font-medium text-gray-900 dark:text-white">
                  Email
                </FormLabel>
                <Input
                  value={data.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  variant="outline"
                  placeholder="name@company.com"
                  required
                  autoComplete="off"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="password"
                isInvalid={!!errors.password}
                className="relative"
                isRequired={data.password === ""}
              >
                <FormLabel className="text-md font-medium text-gray-900 dark:text-white">
                  Password
                </FormLabel>
                <Input
                  value={data.password}
                  onChange={handleChange}
                  type={showPassword ? "password" : "text"}
                  name="password"
                  variant="outline"
                  placeholder="••••••••"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
                <span
                  onClick={togglePassword}
                  className="absolute cursor-pointer  top-[2.37rem] right-3"
                >
                  {showPassword ? <BiShow size={25} /> : <BiHide size={25} />}
                </span>
              </FormControl>

              <FormControl
                id="confirmPassword"
                isInvalid={!!errors.confirmPassword}
                className="relative"
                isRequired={data.confirmPassword === ""}
              >
                <FormLabel className="text-md font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </FormLabel>
                <Input
                  value={data.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "password" : "text"}
                  name="confirmPassword"
                  variant="outline"
                  placeholder="••••••••"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                <span
                  onClick={toggleConfirmPassword}
                  className="absolute cursor-pointer top-[2.37rem] right-3"
                >
                  {showConfirmPassword ? (
                    <BiShow size={25} />
                  ) : (
                    <BiHide size={25} />
                  )}
                </span>
              </FormControl>

              <Button
                type="submit"
                width="100%"
                variant="solid"
                colorScheme="green"
                color="white"
                isLoading={loading}
                loadingText="Registering"
              >
                <span>{!loading && "Register"}</span>
              </Button>

              <GoogleButton
                onClick={() => signIn("google")}
                style={{ width: "100%" }}
                className="mx-auto"
              />

              <div>
                <p className="text-md font-light text-gray-600 dark:text-gray-400">
                  Already have an Account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold mytxt hover:underline dark:text-blue-500"
                  >
                    Log In
                  </Link>
                </p>
                <p className="text-md font-light text-gray-600 dark:text-gray-400">
                  Don’t want to Register?{" "}
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
