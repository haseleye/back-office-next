"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import PaymentCard from "./PaymentCard";
import { paymentMethods } from "./constants";
import { Modal } from "./Modal";

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
                id: findPayment?.id,
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
      {ModalOpen ? (
        <Modal setShowModal={setModalOpen} isTopCentered={false}>
          <div className=' w-auto  min-w-full   md:min-w-[450px] md:w-auto mt-[60px] '>
            <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
              <p className='text-base md:text-lg  text-white font-semibold'>
                {" بيانات المعاملة"}
              </p>
              <img
                src='/assets/close.png'
                className='w-5 h-5 cursor-pointer'
                width={20}
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setModalOpen(false);
                }}
                height={20}
              />
            </div>
            <div className='bg-white h-[450px] md:h-auto max-h-auto overflow-auto w-auto p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
              <div className='gap-5 flex justify-between flex-col'>
                <p className='text-black text-base md:text-lg font-semibold'>
                  رقم المعاملة :{" "}
                  <span className='font-normal text-lg truncate'>
                    {findPayment?.transactionNumber}
                  </span>
                </p>
                <p className='text-black text-base md:text-lg font-semibold'>
                  الحالة :{" "}
                  <span className='font-normal text-lg truncate'>
                    {findPayment?.status}
                  </span>
                </p>
                <p className='text-black text-base md:text-lg font-semibold'>
                  ملاحظات :{" "}
                  <span className='font-normal text-lg truncate'>
                    {findPayment?.comments}
                  </span>
                </p>
                <div className='w-full flex items-center justify-center'>
                  <button
                    onClick={() => {
                      (document.getElementById("body") as any).style.overflow =
                        "scroll";
                      setModalOpen(false);
                    }}
                    className='w-full md:w-[181px] mb-6 mt-3 flex justify-center items-center rounded-lg h-12 disabled:opacity-40 bg-THEME_PRIMARY_COLOR text-white text-center'>
                    {"اغلاق"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
