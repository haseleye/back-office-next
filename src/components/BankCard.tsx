import { bankChecks } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BankModal } from "./BankModal";

export default function BankCard({ payment }: { payment: bankChecks }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => {
          setShowModal(true);
        }}
        className='border-[1px] cursor-pointer  border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-3 md:px-6 md:pe-[20px]  w-full md:w-[49%]  '>
        <div className='flex pb-4 flex-row  gap-6   justify-between items-center border-b-[1px] border-[#D8D8D8] border-solid'>
          <p className='text-THEME_PRIMARY_COLOR text-sm md:text-lg font-semibold flex flex-col md:flex-row gap-1  w-[46%] md:w-[50%]'>
            {"القيمة"}{" "}
            <span>
              {Number(payment.amount).toLocaleString()} {"جنيه"}
            </span>
          </p>
          <div className='flex flex-row gap-3 items-center tracking-tighter  w-[55%] md:w-[50%] '>
            <img
              src={"/assets/bank.svg"}
              className='w-[29px]  h-[24px] md:w-[41px] md:h-[41px]'
            />
            <div className='flex flex-col gap-1 text-[#048951]   text-sm md:text-[17px]'>
              {payment.bankName}
            </div>
          </div>
        </div>
        <div className='flex mt-6 flex-row flex-wrap gap-y-8 justify-between'>
          <div className='flex flex-col gap-1 w-[52%] text-[#555F71]  text-sm md:text-lg'>
            <p>{"رقم الشيك"}</p>
            <p className='font-semibold'>{payment.number}</p>
          </div>
          <div className='flex flex-col gap-1 w-[48%]  text-[#555F71]  text-sm md:text-lg'>
            <p>{"حالة الشيك"}</p>
            <p
              className={`font-semibold ${
                payment?.status?.current == "outstanding"
                  ? "text-[#FF9500]"
                  : payment?.status?.current == "rejected"
                  ? "text-THEME_ERROR_COLOR"
                  : "text-[#048951]"
              }`}>
              {payment.statusText}
            </p>
          </div>
          <div className='flex flex-col gap-1 w-[52%]  text-[#555F71]  text-sm md:text-lg'>
            <p>{"تاريخ الاستحقاق"}</p>
            <p className='font-semibold flex flex-row gap-1 items-center'>
              {new Date(payment.dueDate)
                ?.toLocaleDateString("en-AE", {
                  day: "numeric",
                  month: "2-digit",
                  year: "numeric",
                })
                ?.replaceAll("/", "-")}
            </p>
          </div>
          <div className='flex flex-col gap-1 w-[48%] text-[#555F71]  text-sm md:text-lg'>
            <p>{"كود الحجز"}</p>
            <p
              // onClick={() => {
              //   router.push(`/${local}/units`);
              //hover:text-THEME_PRIMARY_COLOR
              // }}
              className='cursor-pointer  font-semibold rtl:text-end'
              dir='ltr'>
              {payment.unitId}
            </p>
          </div>
        </div>
      </div>
      {showModal ? (
        <BankModal img={payment?.image} setShowModal={setShowModal} />
      ) : (
        ""
      )}
    </>
  );
}
