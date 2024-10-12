"use client";
import BankCard from "@/components/BankCard";
import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";
import { useState } from "react";
import UpdateCheckStatus from "./UpdateCheckStatus";

export default function FindCheckContent() {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser, checks } = useAppContext();
  const [ModalOpen, setModalOpen] = useState(false);
  const customerClick = () => {
    setLoading(true);
    getUserDetails(checks?.[0]?.mobile?.number)
      .then((response) => {
        setCurrentUser((response.data as any)?.message, true);
      })
      .catch((error) => {
        setCurrentUser(undefined, true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className='flex flex-col gap-3 items-center'>
        {checks.map((item, index) => (
          <BankCard payment={item} key={`check_${index}`} />
        ))}
        {checks?.length > 0 ? (
          <div className='flex flex-col gap-[100px]  md:flex-row '>
            <button
              onClick={() => {
                setModalOpen(true)
              }}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[135px] text-white rounded-md h-[50px] min-h-[50px]'>
              تحديث حالة الشيك
            </button>
            <button
              onClick={customerClick}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[135px] text-white rounded-md h-[50px] min-h-[50px]'>
              صفحة العميل
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {ModalOpen ? <UpdateCheckStatus setShowModal={setModalOpen} /> : ""}
    </>
  );
}
