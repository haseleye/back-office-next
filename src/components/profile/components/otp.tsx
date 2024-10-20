import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { resendOtpApi, resendOtpApiEmail, verifyOtp, verifyOtpEmail } from "@/network/auth";
import { usePathname } from "next/navigation";
import { LoadingSpinner } from "../../auth/components/loading";
import { Header } from "../../auth/components/Header";
let interval: any = null;
export const OtpStep = ({
  mobileNumber,
  resend,
  isEmail,
  setOpenOtp,
  setResend,
  onClose,
  isResend,
}: {
  mobileNumber: string;
  resend: string;
  isEmail: boolean;
  setResend: (value: any) => void;
  isResend?: boolean;
  setOpenOtp: Dispatch<
    SetStateAction<{
      open: boolean;
      resend: string;
      success: string | null;
    }>
  >;
  onClose: VoidFunction;
}) => {
  const [error, setError] = useState(false);
  const [resended, setResended] = useState(false);

  const [loading, setLoading] = useState({
    resendLoading: false,
    verifyLoading: false,
  });
  const [otp, setOtp] = useState("");
  const [resendTime, setResendTime] = useState<number | null>();
  const pathname = usePathname();
  const verify = () => {
    setLoading({ ...loading, verifyLoading: true });
    if (!otp || otp.length < 6) {
      setError(true);
      setLoading({ ...loading, verifyLoading: false });
      return;
    } else {
      if (isEmail)
      { 
         verifyOtpEmail(
           {
             email: mobileNumber,
             otp: otp,
           },
           pathname?.includes("/ar") ? "ar" : "en"
         )
           .then((response) => {
             setLoading({ ...loading, verifyLoading: false });
             setOpenOtp({
               open: true,
               resend: "",
               success: response.data.message.info,
             });
           })
           .catch((err) => {
             setError(err?.response?.data?.error ?? true);
             setLoading({ ...loading, resendLoading: false });
           });
      }
      else
      {
         verifyOtp(
           {
             mobileNumber: mobileNumber,
             otp: otp,
           },
           pathname?.includes("/ar") ? "ar" : "en"
         )
           .then((response) => {
             setLoading({ ...loading, verifyLoading: false });
             setOpenOtp({
               open: true,
               resend: "",
               success: response.data.message.info,
             });
           })
           .catch((err) => {
             setError(err?.response?.data?.error ?? true);
             setLoading({ ...loading, resendLoading: false });
           });
        }
    }
  };
  const resendOtp = () => {
    setError(false);
    if (!loading.resendLoading) {
      setLoading({ ...loading, resendLoading: true });
      if (isEmail) {
        resendOtpApiEmail(mobileNumber)
          .then((response) => {
            setLoading({ ...loading, resendLoading: false });
            setResend(response.data.message.otpResend);
          })
          .catch((err) => {
            setError(
              (err?.response?.data?.message?.info ||
                err?.response?.data?.error) ??
                true
            );
             if (err?.response?.data?.message?.otpResend) {
               setOpenOtp((prev) => {
                 return {
                   ...prev,
                   resend: err?.response?.data?.message?.otpResend,
                 };
               });
             }

            setLoading({ ...loading, resendLoading: false });
          });
      } else {
        resendOtpApi(mobileNumber)
          .then((response) => {
            setLoading({ ...loading, resendLoading: false });
          })
          .catch((err) => {
            setError(
              (err?.response?.data?.message?.info ||
                err?.response?.data?.error) ??
                true
            );
            if (err?.response?.data?.message?.otpResend) {
              setOpenOtp((prev) => {
                return {
                  ...prev,
                  resend: err?.response?.data?.message?.otpResend,
                };
              });
            }

            setLoading({ ...loading, resendLoading: false });
          });
      }
    }
  };
  useEffect(() => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      let newDiff = (new Date(resend) as any) - (new Date() as any);
      setResendTime(Math.floor(newDiff / 1000));
    }, 1000);
  }, [resend]);

  useEffect(() => {
    if (isResend && !resended) {
      setResended(true);
      resendOtp();
    }
  }, [isResend]);
  return (
    <div className='flex flex-col items-start w-full p-6'>
      <Header
        description={
          isEmail ? "Verification_Code_Text_Email" : "Verification_Code_Text"
        }
        title='Verification_Code'
        marginBottom={"mb-3"}
      />
      <div className='w-full flex flex-col items-center'>
        <div
          className='flex justify-center   mt-2 md:mt-0 w-full md:w-fit flex-row gap-1  items-center '
          dir='ltr'>
          <p className='text-sm text-black font-semibold rtl:font-semibold'>
            {mobileNumber}
          </p>
          <img
            src='/assets/Edit.svg'
            className='cursor-pointer'
            onClick={onClose}
            width={"24px"}
            height={"24px"}
          />
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
                  className={`bg-white text-base !h-[40px] !w-[40px] md:!h-[50px] md:!w-[50px] text-black  !rounded-md  !border-[1px] !border-solid ${
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
            {"لم يصلك الكود؟"}
          </p>
          {resendTime && !Number.isNaN(resendTime) && resendTime > 0 ? (
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
            <>
              {resendTime != null ? (
                <p
                  className='text-sm text-center  text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium mt-3 cursor-pointer'
                  onClick={resendOtp}>
                  {" "}
                  {loading?.resendLoading ? (
                    <LoadingSpinner />
                  ) : (
                    "إعادة الإرسال"
                  )}
                </p>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        <div className='flex justify-center w-full'>
          <button
            disabled={!otp && !error && !loading.verifyLoading}
            onClick={verify}
            className={`h-[55px] w-full md:w-[343px]  bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
              loading.verifyLoading ? "!opacity-45" : ""
            } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] mb-4 md:mt-[60px]`}>
            {loading.verifyLoading ? <LoadingSpinner /> : "التحقق"}
          </button>
        </div>
      </div>
    </div>
  );
};
