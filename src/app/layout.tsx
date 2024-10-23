"use client";
import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SideMenu } from "@/components/SideMenu";
import TopMenu from "@/components/TopMenu";
import { AppWrapper } from "@/context";
import { getCookie } from "cookies-next";

const metadata: Metadata = {
  title: "Coptic Office Back office",
  description: "Coptic Office Back office",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    // Push current page state to history
    const isLoggedIn = getCookie("authToken");
    if (!isLoggedIn) {
      router.push("/login");
    }
    window.history.pushState(null, "", window.location.href);

    // Event listener to handle back button
    const handlePopState = () => {
      // Redirect to the current URL (effectively reloading the page)
      window.location.href = location.pathname;
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location]);
  return (
    <html lang='ar'>
      <meta charSet='UTF-8' />

      <body
        dir='rtl'
        id='body'
        className={`${inter.className} flex flex-col  h-full justify-between `}>
        <AppWrapper>
          <div id='alert-container' className='alert-container'></div>

          {path?.includes("login") ? "" : <SideMenu />}

          <div
            className={`${
              path?.includes("login") ? "" : "pt-0  p-4 sm:mr-64"
            } min-h-screen`}>
            <div
              className={`w-full  ${
                path?.includes("login") || path.includes("profile")
                  ? ""
                  : "pe-0 "
              }`}>
              {path?.includes("login") || path.includes("profile") ? (
                ""
              ) : (
                <TopMenu />
              )}
              {children}
            </div>
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
