"use client";
import AddCheckContent from "@/components/AddCheck";
import AddPaymentContent from "@/components/AddPaymentContent";
import BankCard from "@/components/BankCard";
import {
  bankNames,
  paymentMethods,
  paymentTypes,
} from "@/components/constants";
import Customers from "@/components/customers";
import FindCheckContent from "@/components/FindCheckContent";
import { useAppContext } from "@/context";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Select from "react-select";

export default function Home() {
  const isLoggedIn = getCookie("authToken");
  const router = useRouter();
  const { currentUser, selectedType, checks } = useAppContext();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function formatTimeToHHMM(date: any) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className=' mt-4 mb-3 '>
      {currentUser && selectedType.cat == 0 ? (
        <Customers />
      ) : selectedType.cat == 1 ? (
        <>
          {selectedType.subCat == 0 ? (
            <div className='bg-white mb-[80px] md:mb-0 md:h-auto max-h-auto  w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
              <AddPaymentContent isModal={false} setShowModal={() => {}} />
            </div>
          ) : selectedType.subCat == 3 ? (
           <AddCheckContent/>
          ) : selectedType.subCat == 4 ? (
            <FindCheckContent />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
