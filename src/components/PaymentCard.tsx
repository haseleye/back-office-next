import { Payment } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentCard({ payment }: { payment: Payment }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className='border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-3 md:px-6 md:pe-5  w-full md:w-[49%]  '>
        <div className='flex pb-4 flex-row  justify-between md:justify-start gap-0  md:gap-[86px] items-center border-b-[1px] border-[#D8D8D8] border-solid'>
          <p className='text-THEME_PRIMARY_COLOR text-[15px] md:text-xl font-semibold  flex flex-col md:flex-row gap-1'>
            {"القيمة"}{" "}
            <span>
              {Number(payment.amount).toLocaleString()} {"جنيه"}
            </span>
          </p>
          <div className='flex flex-row gap-3 items-start'>
            <img
              src={
                payment?.paymentMethod == "instaPay"
                  ? "/assets/instaPay1.svg"
                  : payment.paymentMethod == "bankTransfer"
                  ? "/assets/bank_transfer.svg"
                  : "/assets/credit.svg"
              }
              className={`${
                payment?.paymentMethod == "bankTransfer"
                  ? "w-[29px]  h-[29px] md:w-[35px] md:h-[35px]"
                  : "w-[29px]  h-[24px] md:w-[38px] md:h-[41px]"
              }`}
            />
            <div className='flex flex-col gap-1 text-[#048951]  text-sm md:text-lg'>
              <p className='font-semibold '>{payment.paymentMethodText}</p>
            </div>
          </div>
        </div>
        <div className='flex mt-6 flex-row md:gap-[5.5rem] justify-between md:justify-start  rtl:md:gap-28'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-1  text-[#555F71]  text-sm md:text-lg'>
              <p>{"التاريخ"}</p>
              <p className='font-semibold '>
                {new Date(payment.adviceDate)
                  ?.toLocaleDateString("en-AE", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })
                  ?.replaceAll("/", "-")}
              </p>
            </div>
            <div className='flex flex-col gap-1  text-[#555F71]  text-sm md:text-lg'>
              <p>{"الرقم المرجعي"}</p>
              <p
                className='font-semibold  flex flex-row gap-1 items-center'
                dir='ltr'>
                {`${payment.id?.substring(
                  0,
                  window.innerWidth > 768 ? 16 : 11
                )}...`}
                <img
                  className='cursor-pointer'
                  src={`/assets/${copied ? "copied.png" : "copyPrimary.svg"}`}
                  width={"16px"}
                  height={"16px"}
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                    navigator.clipboard.writeText(payment.id);
                  }}
                />
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-1  text-[#555F71]  text-sm md:text-lg'>
              <p>{"الوقت"}</p>
              <p className='font-semibold '>
                {new Date(payment.adviceDate)
                  ?.toLocaleTimeString("ar-AE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h12",
                  })
                  ?.replaceAll("/", "-")}
              </p>
            </div>
            <div className='flex flex-col gap-1  text-[#555F71]  text-sm md:text-lg'>
              <p>{"كود الحجز"}</p>
              <p
                className={`${payment.unitId != "" ? "" : ""} font-semibold  `}
                // onClick={() => {
                //   navigator.clipboard.writeText(payment.unitId);
                //"underline text-THEME_PRIMARY_COLOR cursor-pointer"
                // }}
                dir='ltr'>
                {payment.unitId != "" ? payment.unitId : "لا يوجد بعد"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
