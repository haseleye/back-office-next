"use client";
import BankCard from "@/components/BankCard";
import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";
import { useState } from "react";
import UpdateCheckStatus from "./UpdateCheckStatus";
import PaymentCard from "./PaymentCard";
import { paymentMethods } from "./constants";

export default function FindPaymentType() {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser, checks, findPayment } = useAppContext();
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
        {findPayment ? (
          <PaymentCard
            payment={{
              ...findPayment,
              adviceDate: findPayment?.date,
              paymentMethod: paymentMethods?.filter(
                (item) => item?.label == findPayment.paymentMethod
              )?.[0]?.value,
              paymentMethodText: findPayment?.paymentMethod
            } as any}
            key={`FindPayment`}
          />
        ) : (
          ""
        )}

        {checks?.length > 0 ? (
          <div className='flex flex-col gap-[100px]  md:flex-row '>
            <button
              onClick={() => {
                setModalOpen(true);
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
