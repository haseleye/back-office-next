"use client";
import { useEffect } from "react";

export const Modal = ({
  children,
  isTopCentered,
}: {
  children: React.ReactNode;
  isTopCentered: boolean;
}) => {
  useEffect(() => {
    (document.getElementById("body") as any).style.overflow = "hidden";
  }, []);

  return (
    <div
      id='modal'
      className={` fixed z-[1000] top-0 pt-0 md:pt-0  left-0 min-w-full  overflow-hidden flex justify-center  ${
        isTopCentered ? "items-start" : "items-center"
      } min-h-[100vh] bg-[#00000073]   px-3  ${
        isTopCentered ? "md:px-[120px]" : "md:px-[150px]"
      } `}>
      {children}
    </div>
  );
};
