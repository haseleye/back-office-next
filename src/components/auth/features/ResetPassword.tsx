import { useState } from "react";
import { Header } from "../components/Header";
import { AUTH_STEP_ENUM, checkUserModal } from "@/types";
import { LoadingSpinner } from "../components/loading";
import { PasswordInput } from "../components/passwordInput";
import { resetPassword } from "@/network/auth";
import { usePathname } from "next/navigation";
let interval: any = null;
export const ResetPassword = ({
  closeModal,
  checkUserData,
}: {
  closeModal(): void;
  checkUserData: checkUserModal;
}) => {
  const [error, setError] = useState({
    password: false,
    api: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const [regextError, setRegexError] = useState<string[]>([]);

  const pathname = usePathname();

  const onSubmit = () => {
    if (
      password == "" ||
      password.length < 8 ||
      !new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ _%^&*-]).{8,20}$"
      ).test(password)
    ) {
      setError({ ...error, password: true });
      setRegexError([
        "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل ",
        "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل ",
        "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل )",
        "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل",
        "يجب أن تتكون كلمة المرور من 8 إلى 20 حرفًا",
      ]);
      return;
    }

    setLoading(true);
    resetPassword(
      {
        mobileNumber: checkUserData?.mobileNumber,
        verificationCode: checkUserData?.verificationCode,
        newPassword: password,
      },
      pathname?.includes("/ar") ? "ar" : "en"
    )
      .then((response) => {
        setLoading(false);

        setSuccess(response?.data?.message?.info);
      })
      .catch((err) => {
        setLoading(false);

        setError({
          ...error,
          api: err?.response?.data?.message?.info || err?.response?.data?.error,
        });
      });
  };
  return (
    <div>
      <Header
        description={success ? undefined : "الرجاء إدخال كلمة مرور جديدة"}
        title='إعادة تعيين كلمة المرور'
        marginBottom={"mb-3"}
      />

      {success ? (
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-sm text-THEME_PRIMARY_COLOR'>{success}</p>
          <div className='flex w-full justify-center'>
            <button
              onClick={() => closeModal()}
              className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] md:mt-[90px] mb-2`}>
              {"تسجيل الدخول"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='mt-10 mb-10'>
            <div className='flex justify-center w-full'>
              <PasswordInput
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    onSubmit();
                  }
                }}
                label={"كلمة المرور"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=''
                value={password}
                error={error.password}
              />
            </div>
            {error && typeof error == "string" ? (
              <p className='text-THEME_ERROR_COLOR text-sm  mt-4 text-center'>
                {error}
              </p>
            ) : (
              ""
            )}
            {error?.api ? (
              <p className='text-THEME_ERROR_COLOR text-sm  mt-4 text-center'>
                {error.api}
              </p>
            ) : (
              ""
            )}
            {regextError?.length ? (
              <ul className='mt-5 list-none'>
                {regextError.map((item) => (
                  <li className="text-red-600 text-sm mb-1 before:content-['•'] before:me-2">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className='flex w-full justify-center'>
            <button
              onClick={onSubmit}
              className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
                loading ? "!opacity-45" : ""
              } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] md:mt-[90px] mb-2`}>
              {loading ? <LoadingSpinner /> : "إعادة تعيين كلمة المرور"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
