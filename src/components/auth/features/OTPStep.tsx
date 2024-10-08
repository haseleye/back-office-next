import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Header } from "../components/Header";
import OTPInput from "react-otp-input";
import { AUTH_STEP_ENUM, checkUserModal } from "@/types";
import { LoadingSpinner } from "../components/loading";
import { resendOtpApi, verifyOtp } from "@/network/auth";
import { usePathname } from "next/navigation";
let interval: any = null;
export const OtpStep = ({
  handleChangeStep,
  checkUserData,
  setCheckUserData,
  currentStep,
}: {
  handleChangeStep(step: AUTH_STEP_ENUM): void;
  checkUserData: checkUserModal;
  setCheckUserData: Dispatch<SetStateAction<checkUserModal>>;
  currentStep: AUTH_STEP_ENUM;
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState({
    resendLoading: false,
    verifyLoading: false,
  });
  const [otp, setOtp] = useState("");
  const [resendTime, setResendTime] = useState<number | null>();

  useEffect(() => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      let newDiff =
        (new Date(checkUserData.otpResend) as any) - (new Date() as any);
      setResendTime(Math.floor(newDiff / 1000));
    }, 1000);
  }, [checkUserData]);
  const translate = (value: any) => value;

  const pathname = usePathname();

  const verify = () => {
    setLoading({ ...loading, verifyLoading: true });
    if (!otp || otp.length < 6) {
      setError(true);
      setLoading({ ...loading, verifyLoading: false });
      return;
    } else {
      verifyOtp(
        {
          mobileNumber: checkUserData.mobileNumber,
          otp: otp,
        },
        pathname?.includes("/ar") ? "ar" : "en"
      )
        .then((response) => {
          setLoading({ ...loading, verifyLoading: false });
          setCheckUserData({
            ...checkUserData,
            verificationCode: (response.data as any)?.message?.verificationCode,
          });
          if (currentStep == AUTH_STEP_ENUM.FORGET_PASSWORD_OTP)
            handleChangeStep(AUTH_STEP_ENUM.RESET_PASSWORD);
          else handleChangeStep(AUTH_STEP_ENUM.CREATE_USER);
        })
        .catch((err) => {
          setError(err?.response?.data?.error ?? true);
          setLoading({ ...loading, resendLoading: false });
        });
    }
  };
  const resendOtp = () => {
    setError(false);
    if (!loading.resendLoading) {
      setLoading({ ...loading, resendLoading: true });
      resendOtpApi(
        checkUserData.mobileNumber,
        pathname?.includes("/ar") ? "ar" : "en"
      )
        .then((response) => {
          setCheckUserData({
            ...checkUserData,
            otpResend: (response.data as any)?.message?.otpResend,
          });
          setLoading({ ...loading, resendLoading: false });
        })
        .catch((err) => {
          setError(
            (err?.response?.data?.message?.info ||
              err?.response?.data?.error) ??
              true
          );
          if (err?.response?.data?.message?.otpResend) {
            setCheckUserData({
              ...checkUserData,
              otpResend: err?.response?.data?.message?.otpResend,
            });
          }

          setLoading({ ...loading, resendLoading: false });
        });
    }
  };
  return (
    <div>
      <Header
        description='تم إرسال كود التحقق إلى هاتفك المحمول'
        title='كود التحقق'
        marginBottom={"mb-3"}
      />
      <div
        className='flex justify-center md:justify-start   mt-2 md:mt-0 w-full md:w-fit flex-row gap-1  items-center '
        dir='ltr'>
        <p className='text-sm text-black font-semibold rtl:font-medium'>
          {checkUserData?.mobileNumber}
        </p>
        {currentStep == AUTH_STEP_ENUM.FORGET_PASSWORD_OTP ? (
          ""
        ) : (
          <img
            src='/assets/Edit.svg'
            className='cursor-pointer'
            onClick={() => {
              handleChangeStep(AUTH_STEP_ENUM.MOBILE_NUMBER);
            }}
            width={"24px"}
            height={"24px"}
          />
        )}
      </div>
      <div className='mt-5 md:mt-6 mb-5 md:mb-[38px]'>
        <div className='flex justify-center ' dir='ltr'>
          <OTPInput
            value={otp}
            onChange={(otp) => {
              setError(false);
              setOtp(otp);
            }}
            numInputs={6}
            inputType='tel'
            renderSeparator={<span className='mx-1' />}
            renderInput={(props: any) => (
              <input
                {...props}
                className={`bg-white !h-[50px] text-base !w-[50px] text-black  !rounded-md  !border-[1px] !border-solid ${
                  error
                    ? "!border-THEME_ERROR_COLOR"
                    : "!border-[#0000001f] focus:bg-[#88735026] focus:outline-none"
                }`}
                type='tel'
              />
            )}
          />
        </div>
        {error && typeof error == "string" ? (
          <p className='text-THEME_ERROR_COLOR text-sm  mt-4 text-center'>
            {error}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className='flex justify-center flex-col gap-0 items-center '>
        <p className='text-sm  text-[#00000099]  text-center '>
          لم يصلك الكود؟
        </p>
        {resendTime && resendTime > 0 ? (
          <p className='text-sm  text-[#00000099]  text-center '>
            {"برجاء الانتظار"}{" "}
            <span className='text-sm text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium'>
              {`${
                resendTime > 60
                  ? `${Math.floor(resendTime / 60)}:${
                      resendTime % 60 < 10
                        ? `0${resendTime % 60}`
                        : resendTime % 60
                    }`
                  : `00:${resendTime < 10 ? `0${resendTime}` : resendTime}`
              }`}
            </span>
          </p>
        ) : (
          <div>
            {resendTime != null ? (
              <p
                className='text-sm text-center  text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium mt-3 cursor-pointer'
                onClick={resendOtp}>
                {" "}
                {"إعادة الإرسال"}
              </p>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className='flex justify-center w-full'>
        <button
          disabled={!otp && !error && !loading.verifyLoading}
          onClick={verify}
          className={`h-[55px] w-full md:w-[343px]  bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
            loading.verifyLoading ? "!opacity-45" : ""
          } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] md:mt-[90px]`}>
          {loading.verifyLoading ? <LoadingSpinner /> : "التحقق"}
        </button>
      </div>
    </div>
  );
};
