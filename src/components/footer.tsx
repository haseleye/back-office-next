"use client";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import React from "react";

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const userData = getCookie("user");
  return (
    <div className='w-full bg-white  z-[1000]'>
      <div className='bg-THEME_PRIMARY_COLOR text-white flex flex-col w-full items-center  pt-5 pb-8 '>
        <div className='flex flex-col md:flex-row justify-between items-center w-full px-9 md:px-[80px] mb-[38px] md:mb-4'>
          <img
            src='https://s3.eu-west-3.amazonaws.com/images.copticoffice.com/logo_white_256x158.svg'
            className='cursor-pointer w-[150px] md:w-[150px] h-[80px] md:h-[80px]'
            onClick={() => {
              // router.push(`/${lang}`);
            }}
          />
          <p className='text-[#FDFCFF] opacity-50 text-base' dir='ltr'>
            جميع الحقوق محفوظة لبطريركية الأقباط الأرثوذكس
          </p>
          <div className='flex flex-col w-full md:w-auto  md:flex-row gap-[43px] md:gap-[84px]'>
            <p
              onClick={() => {
                // router.push(`/${lang}#home`);
              }}
              className={`cursor-pointer   text-base font-semibold rtl:font-medium `}>
              العملاء
            </p>
            <p
              onClick={() => {
                // router.push(`/${lang}/payments#mypayments`);
              }}
              className={`cursor-pointer   text-base font-semibold rtl:font-medium `}>
              المدفوعات
            </p>
            <p
              onClick={() => {
                // router.push(`/${lang}/units#myunits`);
              }}
              className={`cursor-pointer   text-base font-semibold rtl:font-medium `}>
              الوحدات
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
