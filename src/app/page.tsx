"use client";
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
            <>
              <div className='bg-white   w-full p-6 pt-10  flex flex-col gap-5 md:gap-7 rounded-b-lg items-center px-3 md:px-10 '>
                <div className='flex flex-col  gap-3 md:gap-[50px] md:flex-row w-full justify-around  '>
                  <div className='gap-5 md:gap-7 flex flex-col'>
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
                      <p className='text-xl font-medium'>تاريخ الاستحقاق : </p>

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
                  <div className='gap-5 flex flex-col md:gap-7'>
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
                <div className='flex flex-col gap-y-2 md:flex-row w-full justify-center'>
                  <button
                    onClick={() => {
                      (document.getElementById("body") as any).style.overflow =
                        "scroll";
                      // setShowModal(false);
                    }}
                    className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                    إضافة
                  </button>
                </div>
              </div>
            </>
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
