// pages/user-settings.tsx
"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Text,
  Avatar,
  List,
  ListItem,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi"; // Import eye icons
import { toast } from "react-toastify";
import {
  handleChangePassword,
  handleResetPassword,
} from "@/server actions/auth/actions";

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  // State for showing/hiding passwords
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(null);
  };

  // Toggle password visibility
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Validate strong password
  const validateStrongPassword = (password: string): string[] => {
    const errors: string[] = [];
    const minLength = 8;

    if (password.length < minLength) {
      errors.push(`at least ${minLength} characters long`);
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("at least one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("at least one number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("at least one special character (e.g., !@#$%^&*)");
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const passwordErrors = validateStrongPassword(password);
    if (passwordErrors.length) {
      setPasswordError(`Password must include: ${passwordErrors.join(", ")}.`);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simulate API call to change password
    try {
      console.log();
      if (session?.user?.id) {
        const result = await handleChangePassword(session?.user?.id, password);
        if (result.success) {
          toast.success("Password reset successfully!");
        } else {
          toast.warn(result.message);
        }
      } else {
        toast.error("Relogin to your account.");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex mt-20 p-6">
      <div className="flex w-full justify-between">
        {/* User Info Column */}
        <div className="flex flex-col items-center w-1/3 p-6">
          <Avatar
            size="2xl"
            name={session?.user?.name || "User"} // Provide a fallback name
            src={session?.user?.image || ""}
          />
          <Heading as="h2" size="lg" className="mt-4">
            {session?.user?.name || "User"}
          </Heading>
          <Text className="text-gray-600">{session?.user?.email}</Text>
        </div>
        {/* Password Reset Column */}
        <div className="flex flex-col justify-center w-2/3 p-6 ">
          <Heading as="h3" size="md" className="mb-4">
            Change User Password
          </Heading>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl isInvalid={!!passwordError} className="relative">
              <FormLabel htmlFor="password">New Password</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
              {passwordError && (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              )}
              <span
                onClick={togglePassword}
                className="absolute cursor-pointer top-10 right-3"
              >
                {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
              </span>
            </FormControl>

            <FormControl
              isInvalid={!!confirmPasswordError}
              className="relative"
            >
              <FormLabel htmlFor="confirm-password">
                Confirm New Password
              </FormLabel>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm new password"
                required
              />
              {confirmPasswordError && (
                <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
              )}
              <span
                onClick={toggleConfirmPassword}
                className="absolute cursor-pointer top-10 right-3"
              >
                {showConfirmPassword ? (
                  <BiHide size={25} />
                ) : (
                  <BiShow size={25} />
                )}
              </span>
            </FormControl>

            <List spacing={2} className="opacity-70 py-10">
              <ListItem display="flex" alignItems="center">
                <FaCheckCircle color="green" style={{ marginRight: "8px" }} />
                Must be at least 8 characters long
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <FaCheckCircle color="green" style={{ marginRight: "8px" }} />
                Must contain at least one uppercase letter
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <FaCheckCircle color="green" style={{ marginRight: "8px" }} />
                Must contain at least one lowercase letter
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <FaCheckCircle color="green" style={{ marginRight: "8px" }} />
                Must contain at least one number
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <FaCheckCircle color="green" style={{ marginRight: "8px" }} />
                Must contain at least one special character (e.g., !@#$%^&*)
              </ListItem>
            </List>
            <Button
              type="submit"
              width="100%"
              variant="solid"
              colorScheme="green"
              color="white"
              isLoading={loading}
              loadingText="Changing..."
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
