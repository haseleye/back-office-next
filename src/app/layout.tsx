"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
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

  return (
    <html lang='en' style={{ minHeight: "100vh" }}>
      <body
        dir='rtl'
        id='body'
        className={`${inter.className} flex flex-col  justify-between min-h-screen`}>
        <AppWrapper>
          {path?.includes("login") ? "" : <SideMenu />}

          <div className={path.includes?.("login") ? "" : "p-4 sm:mr-64"}>
            <div
              className={`w-full  ${
                path.includes("login") ? "" : "pe-0 md:pe-10"
              }`}>
              {path?.includes("login") ? "" : <TopMenu />}
              {children}
            </div>
          </div>
        </AppWrapper>
        {path?.includes("login") ? "" : <Footer />}
      </body>
    </html>
  );
}
