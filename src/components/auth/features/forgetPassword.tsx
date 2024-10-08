import { forgotPassword } from "@/network/auth";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingSpinner } from "../components/loading";
import { Header } from "../components/Header";
import { AUTH_STEP_ENUM, checkUserModal } from "@/types";
import { usePathname } from "next/navigation";

export const ForgetPassword = ({
  mobileNumber,
  setMobileNumber,
  handleChangeStep,
  setCheckUserData,
  checkUserData,
}: {
  mobileNumber: string;
  setMobileNumber(mobile: string): void;
  handleChangeStep(step: AUTH_STEP_ENUM): void;
  setCheckUserData: Dispatch<SetStateAction<checkUserModal>>;
  checkUserData: checkUserModal;
}) => {
  const [error, setError] = useState<string | boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const translate = (value: any) => value;
  const pathname = usePathname();

  const onSubmit = () => {
    setLoading(true);
    if (!mobileNumber) {
      setError(true);
      setLoading(false);
      return;
    } else {
      forgotPassword(mobileNumber, pathname?.includes("/ar") ? "ar" : "en")
        .then((response) => {
          setCheckUserData({
            ...checkUserData,
            otpSent: (response.data as any)?.message?.otpSent,
            otpResend: (response.data as any)?.message?.otpResend,
            mobileNumber: (response.data as any)?.message?.mobileNumber,
          });
          setLoading(false);
          handleChangeStep(AUTH_STEP_ENUM.FORGET_PASSWORD_OTP);
        })
        .catch((err) => {
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
    <div>
      <Header
        description="برجاء إدخال رقم الهاتف المحمول المسجل لدينا"
        title='نسيت كلمة المرور'
      />
      <div
        dir='ltr'
        className='relative h-[55px] w-full  rounded-lg border-0 mb-2'>
        <div className='absolute top-[14.5px] start-0 flex items-center ps-3 pointer-events-none'>
          <img src='/assets/egypt.png' width={"24px"} height={"24px"} />
        </div>
        <input
          autoFocus
          type='tel'
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              onSubmit();
            }
          }}
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
            if (error) setError(null);
          }}
          className={`text-base block w-full p-4 ps-10  text-gray-900 ${
            error ? "border-[1px] border-THEME_ERROR_COLOR" : ""
          } rounded-lg focus:outline-none bg-gray-50`}
          placeholder='100 123 456'
        />

        {mobileNumber != "" ? (
          <div className='absolute top-[22px] end-0 flex items-center pe-3 cursor-pointer'>
            <img
              src='/assets/close.png'
              width={"12px"}
              height={"15px"}
              onClick={() => {
                if (error) setError(null);
                setMobileNumber("");
              }}
            />
          </div>
        ) : null}
      </div>
      {error && typeof error == "string" ? (
        <p className='text-THEME_ERROR_COLOR text-sm '>{error}</p>
      ) : (
        ""
      )}
      {!error ? "" : ""}
      <button
        disabled={!mobileNumber && !error}
        className={`h-[55px] w-full  bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
          loading ? "!opacity-45" : ""
        } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[40px] md:mt-[90px]`}
        onClick={onSubmit}>
        {loading ? <LoadingSpinner /> : "استمرار"}
      </button>
    </div>
  );
};
