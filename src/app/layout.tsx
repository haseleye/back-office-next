"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const metadata: Metadata = {
  title: "Coptic Office Back office",
  description: "Coptic Office Back office",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  console.log("path", path);
  return (
    <html lang='en'>
      <body dir='rtl' className={`${inter.className} flex flex-col`}>
        <div className='flex flex-row gap-6'>
          {path?.includes("login") ? (
            ""
          ) : (
            <div className='bg-THEME_SECONDARY_COLOR h-screen w-[270px] flex flex-col rounded-lg '>
              <div className='flex flex-col gap-2 items-center'>
                <img src='/assets/logo.svg' />
                <img
                  src='/assets/user.svg'
                  width={100}
                  height={100}
                  className='rounded-full'
                />
                <p className='text-white font-semibold text-2xl'>إيهاب صابر</p>
              </div>
              <div className='flex flex-col mt-6 gap-6 px-3'>
                <div className='flex flex-row gap-3 items-center'>
                  <img src='/assets/down.png' width={15} height={15} />
                  <p className='text-white font-semibold text-2xl'> العملاء</p>
                </div>
                <div className='w-full flex justify-center'>
                  <img src='/assets/customers.svg' width={80} height={80} />
                </div>
                <div className='flex bg-[#A9A9A9] p-[6px] rounded-md flex-row gap-2 items-end'>
                  <img src='/assets/cash.svg' width={40} height={40} />
                  <p className='text-white font-semibold text-2xl'>
                    المدفوعات النقدية
                  </p>
                </div>
                <div className='flex flex-row gap-2 ps-[6px] items-end'>
                  <img src='/assets/check.svg' width={40} height={40} />
                  <p className='text-white font-semibold text-2xl'>الشيكات</p>
                </div>
                <div className='flex flex-row gap-2 ps-[6px] items-end'>
                  <img src='/assets/unit.svg' width={40} height={40} />
                  <p className='text-white font-semibold text-2xl'>الوحدات</p>
                </div>
                <div className='flex flex-row gap-3 ps-[6px] items-center'>
                  <img src='/assets/left.png' width={15} height={15} />
                  <p className='text-white font-semibold text-2xl'>
                    {" "}
                    المدفوعات
                  </p>
                </div>
                <div className='flex flex-row gap-3 ps-[6px] items-center'>
                  <img src='/assets/left.png' width={15} height={15} />
                  <p className='text-white font-semibold text-2xl'> التقارير</p>
                </div>
              </div>
            </div>
          )}
          <div className='w-full pe-10 '>
            {path?.includes("login") ? (
              ""
            ) : (
              <div className='bg-THEME_SECONDARY_COLOR p-10 gap-10 flex flex-col rounded-lg  mt-2  w-full'>
                <div className='flex p-3 items-center gap-[30px]  w-full h-[47px] rounded-[10px]'>
                  <img src='/assets/search_white.svg' width={50} height={50} />
                  <img src='/assets/mobNumberWhite.svg' />
                  <div className='flex flex-row bg-[#F2F0EF]  w-[340px]  p-1 pe-4 rounded-lg'>
                    <input
                      dir='ltr'
                      className='bg-[#F2F0EF] w-full outline-none text-base'
                    />
                    <img
                      src='/assets/egypt.png'
                      className='mx-2'
                      width={30}
                      height={30}
                    />
                  </div>
                  <button className='bg-white rounded-lg px-4 py-1'>
                    ابحث
                  </button>
                </div>
                <div className='flex flex-col gap-10'>
                  <p className='text-white text-xl font-semibold'>الاسم:</p>
                  <div className='flex flex-row w-full'>
                    <div className='flex flex-col gap-10 flex-1'>
                      <p className='text-white text-xl font-semibold'>
                        الهاتف المحمول:
                      </p>
                      <p className='text-white text-xl font-semibold'>
                        بطاقة الرقم القومي:
                      </p>
                    </div>
                    <div className='flex flex-col gap-10 flex-1'>
                      <p className='text-white text-xl font-semibold'>
                        البريد الإلكتروني:
                      </p>
                      <p className='text-white text-xl font-semibold'>
                        حالة الحساب:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </body>
      {path?.includes("login") ? "" : <Footer />}
    </html>
  );
}
