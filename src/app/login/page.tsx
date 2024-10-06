"use client";
import { Header1 } from "@/svg/header1";
import { Header2 } from "@/svg/header2";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { checkUser } from "@/network/auth";

export default function Home() {
  const [error, setError] = useState<string | boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef: any = useRef(null);
  const pathname = usePathname();
  const [mobileNumber, setMobileNumber] = useState("");
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  const onSubmit = () => {
    setLoading(true);
    if (!mobileNumber) {
      setError(true);
      setLoading(false);
      return;
    } else {
      checkUser(mobileNumber, pathname?.includes("/ar") ? "ar" : "en")
        .then((response: any) => {
          setLoading(false);
        })
        .catch((err: any) => {
          setError(
            (err?.response?.data?.message?.info ||
              err?.response?.data?.error) ??
              true
          );
          setLoading(false);
        });
    }
  };
  return (
    <div className=' items-center justify-items-center min-h-screen gap-16 bg-hero-login-mobile   md:bg-hero-login bg-cover bg-no-repeat'>
      <div className='h-screen   bg-[#ffffff66] flex flex-col items-center pt-[30px] md:pt-[60px] gap-2 md:gap-5 w-full'>
        <img
          src='/assets/Header1.svg'
          className=' w-[350px] h-[44px]  md:w-[922px] md:h-[116px]'
        />

        <img
          src='/assets/Header2.svg'
          className=' w-[200px] h-[35px]  md:w-[500px] md:h-[90px]'
        />
        <div className='w-full px-3 md:px-[80px]'>
          <div className='bg-[#d9d9d999]  gap-0 md:gap-[60px] flex  flex-col-reverse md:flex-row w-full border-[1px] border-solid border-white rounded-lg'>
            <div className='flex flex-col flex-1 items-center pt-6 md:pt-[50px] pb-3 md:pb-10 pe-3 md:pe-0 ps-3 md:ps-[50px] gap-6  md:gap-10 '>
              <img
                src='/assets/signin.svg'
                className='w-[160px] md:w-[208px]'
              />
              <div className='flex p-3 items-center bg-[#F2F0EF] w-full h-[47px] rounded-[10px]'>
                <img src='/assets/mobNumber.svg' />
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
              <div className='flex p-3 items-center bg-[#F2F0EF] w-full h-[47px] rounded-[10px]'>
                <img src='/assets/passwordText.svg' />
                <input
                  dir='ltr'
                  className='bg-[#F2F0EF] w-full outline-none text-base'
                />
                <img
                  src='/assets/passwordOpen.svg'
                  className='mx-2'
                  width={30}
                  height={30}
                />
              </div>
              <div className='flex flex-col md:flex-row items-center mt-[30px] md:mt-0 gap-6 w-full  md:gap-[100px]'>
                <button className='w-full md:w-[160px] bg-THEME_PRIMARY_COLOR h-[50px] flex items-center justify-center rounded-lg text-white text-[20px]'>
                  تسجيل الدخول
                </button>
                <button className='w-full md:w-[160px] bg-THEME_PRIMARY_COLOR h-[50px] flex items-center justify-center rounded-lg text-white text-[20px]'>
                  نسيت كلمة المرور
                </button>
              </div>
            </div>
            <div className='flex flex-col flex-1 items-start pt-4 md:pt-[45px] ps-3 md:ps-10 pe-3 md:pe-[50px] gap-5 md:gap-[30px] border-b-[1px] md:border-s-[1px] border-white border-solid'>
              <img
                src='/assets/helloText.svg'
                className='mb-2.5 w-[101px] md:w-[140px]'
              />
              <p className='text-black text-xl md:text-2xl'>
                هذه البوابة مخصصة للموظفين العاملين في المكتب القبطي الفني.
              </p>
              <p className='text-black text-xl md:text-2xl'>
                إذا لم يكن لديك اسم مستخدم وكلمة مرور فبرجاء الاتصال بالمدير
                المسئول للحصول عليهم.
              </p>
              <img />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
