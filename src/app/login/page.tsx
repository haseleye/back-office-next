"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Login } from "@/network/auth";
import { Auth } from "@/components/auth";
import { LoadingSpinner } from "@/components/loading";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const [error, setError] = useState<{
    mobile: null | boolean;
    password: null | boolean;
    api: null | boolean | string;
  }>({
    mobile: null,
    password: null,
    api: null,
  });
  const [loading, setLoading] = useState(false);
  const inputRef: any = useRef(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showForget, setShowForget] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedIn = getCookie("authToken");

  const router = useRouter();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, []);
  const onSubmit = () => {
    setLoading(true);
    if (!mobileNumber) {
      setError({ ...error, mobile: true });
      setLoading(false);
      return;
    }
    if (!password) {
      setError({ ...error, password: true });
      setLoading(false);
      return;
    } else {
      Login({
        mobileNumber: `+20${
          mobileNumber?.[0] == "0"
            ? mobileNumber?.slice(1, mobileNumber.length)
            : mobileNumber
        }`,
        password: password,
      })
        .then((response: any) => {
          setLoading(false);
          setCookie("user", JSON.stringify(response?.data?.message?.user));
          setCookie("authToken", response?.data?.message?.accessToken);
          localStorage.setItem(
            "authToken",
            response?.data?.message?.accessToken
          );
          router.push("/");
        })
        .catch((err: any) => {
          setError({
            ...error,
            api:
              (err?.response?.data?.message?.info ||
                err?.response?.data?.error) ??
              true,
          });
          setLoading(false);
        });
    }
  };
  return (
    <React.Fragment>
      <div className=' items-center  justify-items-center min-h-screen gap-16 bg-hero-login-mobile  z-30 relative  md:bg-hero-login bg-cover bg-no-repeat'>
        <div className='absolute left-0 top-0 min-w-full  min-h-full bg-[#ffffff80] '>
          <img
            src='/assets/blacklogo.svg'
            className='absolute start-5 top-5 h-[100px] z-[1000] w-[260px]'
          />
        </div>
        <div className='h-screen z-50 relative   bg-[#ffffff66]  flex flex-col items-center pt-[30px] gap-2 md:gap-3 w-full'>
          <img
            src='/assets/Header1.svg'
            className=' w-[350px] h-[44px]  md:w-[430px] md:h-[70px]'
          />

          <img
            src='/assets/Header2.svg'
            className=' w-[200px] h-[35px]  md:w-[270px] md:h-[50px]'
          />
          <div className='w-full px-3 flex justify-center '>
            <div className='bg-[#d9d9d999]  gap-0 md:gap-[60px] w-[80%] flex  flex-col-reverse md:flex-row  border-[1px] border-solid border-white rounded-lg'>
              <div className='flex flex-col flex-1 items-center pt-6 md:pt-10 pb-3 md:pb-6 pe-3 md:pe-0 ps-3 md:ps-[30px] gap-6  '>
                <img src='/assets/signin.svg' className='w-[160px] ' />
                <div className='flex p-3 items-center bg-[#F2F0EF] w-full h-[47px] rounded-[10px]'>
                  <p className='text-lg text-THEME_SECONDARY_COLOR w-[150px]'>
                    الهاتف المحمول
                  </p>
                  <input
                    autoComplete='new-password'
                    ref={inputRef}
                    dir='ltr'
                    className='bg-[#F2F0EF] w-full outline-none text-base'
                    value={mobileNumber}
                    type='tel'
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (error.mobile) setError({ ...error, mobile: null });
                    }}
                    placeholder='100 123 456'
                  />
                  <img
                    src='/assets/egypt.png'
                    className='mx-2'
                    width={30}
                    height={30}
                  />
                </div>
                <div className='flex p-3 items-center bg-[#F2F0EF] w-full h-[47px] rounded-[10px]'>
                  <p className='text-lg text-THEME_SECONDARY_COLOR w-[150px]'>
                    كلمة المرور
                  </p>
                  <input
                    dir='ltr'
                    autoComplete='new-password'
                    className='bg-[#F2F0EF] w-full outline-none text-base'
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error.password)
                        setError({ ...error, password: null });
                    }}
                    placeholder='100 123 456'
                  />
                  <img
                    src={
                      showPassword
                        ? "/assets/hidePassword.png"
                        : "/assets/passwordOpen.svg"
                    }
                    className='mx-2 cursor-pointer'
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    width={24}
                    height={24}
                  />
                </div>
                <div className='flex flex-col md:flex-row items-center mt-[30px] md:mt-0 gap-6 w-full  md:gap-[100px]'>
                  <button
                    onClick={onSubmit}
                    className='w-full md:w-[160px] bg-THEME_PRIMARY_COLOR h-[50px] flex items-center justify-center rounded-lg text-white text-base'>
                    {loading ? <LoadingSpinner /> : "تسجيل الدخول"}
                  </button>
                  <button
                    onClick={() => {
                      (document.getElementById("body") as any).style.overflow =
                        "hidden";
                      setShowForget(true);
                    }}
                    className={`'w-full md:w-[160px] ${
                      loading ? "opacity-50" : ""
                    } bg-THEME_PRIMARY_COLOR h-[50px] flex items-center justify-center rounded-lg text-white text-base'`}>
                    {"نسيت كلمة المرور"}
                  </button>
                </div>
              </div>
              <div className='flex flex-col flex-1 items-start pt-4 md:pt-8 ps-3 md:ps-10 pe-3 md:pe-[30px] gap-5 md:gap-[30px] border-b-[1px] md:border-s-[1px] border-white border-solid'>
                <img
                  src='/assets/helloText.svg'
                  className='mb-2.5 w-[101px] '
                />
                <p className='text-black text-xl'>
                  هذه البوابة مخصصة للموظفين العاملين في المكتب القبطي الفني.
                </p>
                <p className='text-black text-xl'>
                  إذا لم يكن لديك اسم مستخدم وكلمة مرور فبرجاء الاتصال بالمدير
                  المسئول للحصول عليهم.
                </p>
                <img />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Auth
        closeModal={() => {
          (document.getElementById("body") as any).style.overflow = "scroll";
          setShowForget(false);
        }}
        isModalOpen={showForget}
      />
    </React.Fragment>
  );
}
