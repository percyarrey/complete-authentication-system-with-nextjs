import type { Metadata } from "next";
import "./globals.css";

//PROVIDERS
import { Providers } from "@/app/components/providers";
import AuthProvider from "./components/auth-redux/AuthProvider";

//COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import Margin from "./components/header/Margin";
export const metadata: Metadata = {
  title: "GiftApex - Swap Gift Cards for Cash",
  description:
    "GiftApex web app project outline want a website that is a blend of gift2money and faixchange for swapping gift cards for money",
};
//TOASTER JS
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { auth } from "@/auth";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <AuthProvider>
      <html lang="en" className="light">
        <body className="flex justify-between flex-col w-[100vw] overflow-x-hidden min-h-[100vh] ">
          <div className="flex-1 relative ">
            {/* REACT TOAST */}
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <Header session={session} />
            <Margin />
            <div>
              <Providers>{children}</Providers>
            </div>
          </div>
          <Footer session={session} />
        </body>
      </html>
    </AuthProvider>
  );
}
