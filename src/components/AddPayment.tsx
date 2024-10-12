"use client";;
import {
  bankNames,
  paymentMethods,
  paymentTypes,
} from "@/components/constants";
import { Modal } from "@/components/Modal";
import { useAppContext } from "@/context";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import AddPaymentContent from "./AddPaymentContent";

export default function AddPayment({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal:any
}) {
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

  const bookingCodes = useMemo(() => {
    let checks =
      currentUser?.bankChecks.map((item) => {
        return item.unitId;
      }) ?? [];
    let payments = currentUser?.payments.map((item) => item.unitId) ?? [];
    let newArray = [...(new Set([...checks, ...payments]) as any)];
    newArray = newArray
      .filter((item) => item != "")
      ?.sort((item1, item2) => item1?.split("/")[1] - item2?.split("/")[1]);
    newArray = newArray.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    return [{ value: "-1", label: "حجز جديد" }, ...newArray];
  }, [currentUser]);
  return (
    <>
      {showModal ? (
        <Modal setShowModal={setShowModal} isTopCentered={true}>
          <div className=' w-auto  min-w-full md:min-w-[600px] mt-10 '>
            <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
              <p className='text-base md:text-xl  text-white font-semibold'>
                {selectedType?.subCat == 0
                  ? "  إضافة مدفوعات"
                  : "إضافة شيك بنكي"}
              </p>
              <img
                src='/assets/close.png'
                className='w-5 h-5 cursor-pointer'
                width={20}
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setShowModal(false);
                }}
                height={20}
              />
            </div>
            {selectedType.subCat == 0 ? (
              <>
                <div className='bg-white h-[450px] md:h-auto max-h-auto overflow-auto w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                  <AddPaymentContent isModal={true} setShowModal={setShowModal} />
                </div>
              </>
            ) : (
              <>
                <div className='bg-white h-[450px] md:h-auto max-h-auto overflow-auto w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                  <div className='flex flex-col  gap-3 md:gap-[80px] md:flex-row w-full  justify-between '>
                    <div className='gap-5 flex flex-col'>
                      <p className='text-black text-base md:text-xl font-semibold'>
                        الاسم :{" "}
                        <span className='font-normal text-lg truncate'>
                          {currentUser?.info.firstName}{" "}
                          {currentUser?.info.lastName}
                        </span>
                      </p>
                      <p className='text-black md:hidden text-base md:text-xl font-semibold '>
                        الهاتف المحمول :{" "}
                        <span dir='ltr' className='font-normal text-lg'>
                          {currentUser?.info.mobile}
                        </span>
                      </p>
                      <div className='flex flex-row gap-1 items-center'>
                        <p className='text-xl font-medium'>كود الحجز : </p>
                        <div className='w-[230px]'>
                          <Select
                            noOptionsMessage={() => "لا يوجد  "}
                            className='basic-single  h-11 rounded-md  text-base border-none'
                            classNamePrefix='select'
                            placeholder=''
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={true}
                            isSearchable={true}
                            name='color'
                            options={bookingCodes}
                          />
                        </div>
                      </div>
                      <div className='flex flex-row gap-1 items-center'>
                        <p className='text-xl font-medium'>اسم البنك : </p>
                        <div className='w-[200px] md:w-[330px]'>
                          <Select
                            noOptionsMessage={() => "لا يوجد  "}
                            className='basic-single  h-11 rounded-md  text-base border-none'
                            classNamePrefix='select'
                            placeholder=''
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={true}
                            isSearchable={true}
                            options={bankNames}
                          />
                        </div>
                      </div>
                      <div className='flex flex-row w-full gap-1 items-center'>
                        <p className='text-xl font-medium'>
                          تاريخ الاستحقاق :{" "}
                        </p>

                        <input
                          aria-label='Date'
                          placeholder='يوم/شهر/سنة'
                          value={formatDateToYYYYMMDD(new Date())}
                          onChange={(e) => {
                          }}
                          className='bg-[#F2F0EF]  w-[200px] md:w-[270px]  h-11 rounded-[10px] px-2 text-base'
                          type='date'
                        />
                      </div>
                    </div>
                    <div className='gap-5 flex flex-col'>
                      <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                        الهاتف المحمول :{" "}
                        <span dir='ltr' className='font-normal text-lg'>
                          {currentUser?.info.mobile}
                        </span>
                      </p>
                      <div className='flex flex-row gap-2 items-center'>
                        <p className='text-xl font-medium'> القيمة : </p>

                        <input
                          className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
                          type='text'
                        />
                        <p className='text-xl '> جنيه </p>
                      </div>
                      <div className='flex flex-row gap-2 items-center'>
                        <p className='text-xl font-medium'> رقم الشيك : </p>

                        <input
                          className='bg-[#F2F0EF] h-11  rounded-[10px] w-[170px] px-2 text-base'
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                  <label className='file-upload'>
                    <input type='file' accept='image/*' />
                    <span>تحميل صورة الشيك</span>
                    <img
                      src='/assets/uploadImage.svg'
                      width={40}
                      alt='Upload Icon'
                    />
                  </label>
                  <div className='flex flex-col gap-y-2 md:flex-row w-full justify-around'>
                    <button
                      onClick={() => {
                        (
                          document.getElementById("body") as any
                        ).style.overflow = "scroll";
                        setShowModal(false);
                      }}
                      className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                      إضافة
                    </button>
                    <button
                      onClick={() => {
                        (
                          document.getElementById("body") as any
                        ).style.overflow = "scroll";
                        setShowModal(false);
                      }}
                      className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                      إلغاء
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
