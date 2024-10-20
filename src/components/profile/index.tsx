"use client";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { UserInfo } from "@/types";
import { getUserInfo } from "@/network/auth";
import { ProfileImage } from "./components/profileImage";
import { useAppContext } from "@/context";

export default function PersonalProfile() {
  const isLoggedIn = getCookie("user");
  const [userData, setUserData] = useState<UserInfo | null>();
  const router = useRouter();
  const { currentUser } = useAppContext();
  console.log("currentUser", currentUser);
  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else {
      getUserInfo().then((response) => {
        setUserData(response.data.Message.user);
        setCookie("user", JSON.stringify(response.data.Message.user));
      }).catch(() => {
        setUserData(JSON.parse(isLoggedIn))
      });
    }
  }, []);
  console.log("USE DA",userData)
  const refreshData = (callback: VoidFunction) => {
    getUserInfo().then((response) => {
      setUserData(response.data.Message.user);
      setCookie("user", JSON.stringify(response.data.Message.user));
      callback();
    });
  };

  return (
    <div className='z-10  flex-col gap-4 items-center justify-center  pt-0  text-sm lg:flex w-full px-4 md:px-3  bg-transparent'>
      <div
        id='myprofile'
        className='w-full  bg-white flex flex-col gap-4 rounded-2xl   border-[#E5EAF4] border-b-[1px] p-4 md:p-6'>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-base md:text-2xl text-[#183B56] font-semibold rtl:font-medium'>
            {"الملف الشخصي"}
          </p>
        </div>
        <ProfileImage
          setUserData={setUserData}
          isEditOpen={true}
          user={userData}
          refreshData={refreshData}
        />
        <div className='flex flex-col md:flex-row  gap-5 md:gap-[50px] w-full'>
          <Input
            value={
              (userData?.email?.primary as string) ?? currentUser?.info?.email
            }
            isVerified={userData?.email?.isVerified}
            label='البريد الإلكتروني'
            refreshData={refreshData}
          />
          <Input
            isRtl={true}
            value={
              (userData?.mobile?.primary?.number as string) ??
              currentUser?.info.mobile
            }
            isVerified={userData?.mobile?.isVerified}
            label='رقم الهاتف المحمول'
            refreshData={refreshData}
            itemDisabled={true}
          />
        </div>
        <div className='flex flex-row  gap-5 md:gap-[50px] w-full '>
          <Input
            isPassword
            value={"1234567890"}
            label={"كلمة المرور"}
            refreshData={refreshData}
          />
          <div className='hidden md:flex flex-1'></div>
        </div>
        <div className='w-full flex flex-col gap-[6px]'></div>
      </div>
    </div>
  );
}
