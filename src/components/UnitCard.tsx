"use client";;
import { Unit } from "@/types";
import { Dispatch, SetStateAction } from "react";

export default function UnitCard({
  item,
  setShowUnitModal,
}: {
  item: Unit;
  setShowUnitModal: Dispatch<SetStateAction<boolean>>;
}) {
  // const { setCurrentModal, setUnitId } = useAppContext();
  return (
    <>
      <div
        id={item.id}
        className=' relative border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-4 md:px-6 md:pe-5  w-full md:w-[49%]  '>
        <div className='flex flex-row justify-between items-start'>
          <div className='flex flex-col gap-1'>
            <p className='text-[#048951]  text-sm md:text-lg font-semibold '>
              {item.category}
            </p>
            <p className='text-[#555F71]  text-sm md:text-lg flex flex-row items-center ltr:gap-6 rtl:gap-2.5 '>
              {"رقم الوحدة"}{" "}
              <span className='text-THEME_PRIMARY_COLOR'>
                {item.unitNumber}
              </span>
            </p>
          </div>
          {item?.contract ? (
            <a href={item?.contract?.pdfUrl} target="_blank">
              <img
                src='/assets/contract.svg'
                className='cursor-pointer '
                width={30}
               
              />
            </a>
          ) : (
            <img
              className='cursor-pointer'
              src='/assets/add_contract.svg'
              width={30}
              onClick={() => {
                setShowUnitModal(true);
              }}
            />
          )}
        </div>
        <div className='flex flex-row justify-between items-center'>
          <p className='mt-1 text-[#555F71] text-sm md:text-lg flex flex-row items-center rtl:gap-[21px] ltr:gap-2.5 '>
            {"كود الحجز"}{" "}
            <span className='text-THEME_PRIMARY_COLOR' dir='ltr'>
              {item.id}
            </span>
          </p>
          {/* {item?.discount ? (
            <button
              onClick={() => {
                // setCurrentModal(`Discount_${item?.discount}`);
              }}
              className='bg-THEME_PRIMARY_COLOR  py-1 px-3 text-white text-sm rounded-lg'>
              {"خصم"}
            </button>
          ) : (
            ""
          )} */}
        </div>
        <hr className='border-[0.5px]  my-2.5 md:my-5 md:block border-[#E5EAF4] w-full ' />

        <div className='flex flex-row gap-[55px] rtl:gap-6 '>
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"تاريخ الحجز"}
              </p>

              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {new Date(item.bookingDate)
                  ?.toLocaleDateString("en-AE", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })
                  ?.replaceAll("/", "-")}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"تاريخ العقد"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {item.contractDate
                  ? new Date(item.contractDate)
                      ?.toLocaleDateString("en-AE", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })
                      ?.replaceAll("/", "-")
                  : "لم يتم بعد"}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"إجمالي المدفوعات"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {Number(item.totalCashAmount).toLocaleString()} {"جنيه"}
              </p>
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"تاريخ دفعة التعاقد"}
              </p>

              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {item.contractingDate
                  ? new Date(item.contractingDate)
                      ?.toLocaleDateString("en-AE", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })
                      ?.replaceAll("/", "-")
                  : "لم يتم بعد"}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"سعر الوحدة"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {`${
                  item.totalAmount
                    ? `${item.totalAmount.toLocaleString()} ${"جنيه"}`
                    : "بعد اختيار الوحدة"
                }`}
              </p>
            </div>

            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"إجمالي قيمة الشيكات"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {`${
                  item.totalChecksAmount
                    ? `${item.totalChecksAmount.toLocaleString()} ${"جنيه"}`
                    : "لا يوجد شيكات"
                }`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
