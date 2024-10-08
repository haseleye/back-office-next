"use client";
import BankCard from "@/components/BankCard";
import PaymentCard from "@/components/PaymentCard";
import { useAppContext } from "@/context";
import { UserDetails } from "@/types";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({
  selectedCategory,
  currentSelectedUser,
}: {
  currentSelectedUser: UserDetails;
  selectedCategory: {
    cat: number;
    subCat: number;
  };
}) {
  const isLoggedIn = getCookie("authToken");
  const router = useRouter();
  console.log("selectedCategory", currentSelectedUser);
  const { currentUser, selectedType } = useAppContext();
  // console.log("selectedCategory", selectedCategory);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  console.log("selectedType", selectedType);
  console.log("currentUser", currentUser);
  return (
    <div className='flex justify-between flex-wrap mt-4 gap-3 mb-3 '>
      {currentUser &&selectedType.cat == 0 ? (
        <>
          {selectedType.subCat == 0 ? (
            currentUser?.payments?.length ? (
              currentUser?.payments.map((item, index) => (
                <PaymentCard payment={item} key={`payment_${index}`} />
              ))
            ) : (
              <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                {" "}
                لا يوجد مدفوعات
              </p>
            )
          ) : selectedType.subCat == 1 ? (
            currentUser?.bankChecks?.length ? (
              currentUser?.bankChecks.map((item, index) => (
                <BankCard payment={item} key={`check_${index}`} />
              ))
            ) : (
              <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                {" "}
                لا يوجد شيكات
              </p>
            )
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
