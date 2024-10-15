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
  const { setSelectedType, checks, findPayment } = useAppContext();
  const [ModalOpen, setModalOpen] = useState(false);
  const customerClick = () => {
    setLoading(true);
    setSelectedType({ cat: 0, subCat: 0 });
  };
  return (
    <>
      <div className='flex flex-col gap-3 items-center'>
        {findPayment ? (
          <PaymentCard
            payment={
              {
                ...findPayment,
                adviceDate: findPayment?.date,
                paymentMethod: paymentMethods?.filter(
                  (item) => item?.label == findPayment.paymentMethod
                )?.[0]?.value,
                paymentMethodText: findPayment?.paymentMethod,
                id: findPayment?.transactionNumber,
              } as any
            }
            key={`FindPayment`}
          />
        ) : (
          ""
        )}

        {findPayment ? (
          <div className='flex flex-col gap-[100px]  md:flex-row '>
            <button
              onClick={() => {
                setModalOpen(true);
              }}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[135px] text-white rounded-md h-[50px] min-h-[50px]'>
              عرض المزيد{" "}
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
    </>
  );
}
