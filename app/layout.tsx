import type { Metadata } from "next";
import "./globals.css";

//PROVIDERS
import { Providers } from "@/app/components/providers";
import AuthProvider from "./components/auth-redux/AuthProvider";

//COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderToggler from "./components/header/HeaderToggler";
import { Suspense } from "react";
import Loading from "./loading";
import Margin from "./components/header/Margin";
export const metadata: Metadata = {
  title: "Complete Auth System",
  description: "Complete authentication created with next js",
};
//TOASTER JS
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="light">
        <body className="flex justify-between flex-col w-[100vw] overflow-x-hidden min-h-[100vh] ">
          <div>
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
            <HeaderToggler />

            <Header />
            <Margin />
            <div className=" px-1 lg:px-8">
              <Suspense fallback={<Loading />}>
                <Providers>{children}</Providers>
              </Suspense>
            </div>
          </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
