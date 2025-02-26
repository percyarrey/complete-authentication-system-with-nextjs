"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  handleVerifyEmail,
  handleVerifyEmailCode,
} from "@/server actions/auth/actions";

//NEXT AUTH
import { signOut, useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";

const Page = () => {
  const [code, setCode] = useState("");
  const [sendCode, setSendCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //SESSION
  const session = useSession();
  const data: any = session.data;
  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
  };

  const handleVerify = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      var result = await handleVerifyEmailCode(data?.user?.email, code);

      if (result.success) {
        toast.success("Email is verified! Please Login to continue");
        signOut({ redirect: false });
        setTimeout(() => {
          router.push("/auth/login");
        }, 600);
        // Navigate to desired page after successful verification
        // or wherever you want to redirect
      } else {
        toast.warn(result.message);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailFxn = async (e: any) => {
    try {
      await handleVerifyEmail(data?.user?.email);
      setSendCode(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex min-h-[95vh] justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <form onSubmit={handleVerify} className="space-y-4 mt-5">
          <div>
            <label
              htmlFor="code"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              maxLength={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
              placeholder="Enter the verification code"
              required
            />
          </div>
          <Button
            type="submit"
            width="100%"
            variant="solid"
            disabled={code.length !== 4}
            colorScheme={code.length === 4 ? "green" : "blackAlpha"}
            color="white"
            isLoading={loading}
            loadingText="Verifying..."
          >
            <span>{!loading && "Verify"}</span>
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-md font-light text-gray-500">
            {sendCode ? (
              <>New verification code has been send again to your Email.</>
            ) : (
              <>
                {"Didn't "}recieve code?{" "}
                <button
                  className=" text-green-700"
                  onClick={handleVerifyEmailFxn}
                >
                  Send code
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
