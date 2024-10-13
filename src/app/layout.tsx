"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { SideMenu } from "@/components/SideMenu";
import TopMenu from "@/components/TopMenu";
import { AppWrapper, useAppContext } from "@/context";

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
 useEffect(() => {
   // Push current page state to history
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
      <body
        dir='rtl'
        id='body'
        className={`${inter.className} flex flex-col  h-full justify-between `}>
        <AppWrapper>
          <div id='alert-container' className='alert-container'></div>

          {path?.includes("login") ? "" : <SideMenu />}

          <div
            className={`${
              path.includes?.("login") ? "" : "pt-0 md:pt-4 p-4 sm:mr-64"
            } min-h-screen`}>
            <div
              className={`w-full  ${
                path.includes("login") ? "" : "pe-0 md:pe-10"
              }`}>
              {path?.includes("login") ? "" : <TopMenu />}
              {children}
            </div>
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
