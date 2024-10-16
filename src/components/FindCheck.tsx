import { useAppContext } from "@/context";
import { useState } from "react";
import Select from "react-select";
import { bankNames } from "./constants";
import { findCheck } from "@/network/auth";
import { LoadingSpinner } from "./loading";

export default function FindCheck() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [localUser, setLocalUser] = useState<any>();
  const { setCurrentUser, currentUser } = useAppContext();
  const [checkNumber, setCheckNumber] = useState("");
  const [bankName, setBankName] = useState<
    { label: string; value: string } | undefined
  >(undefined);

  const { setChecks } = useAppContext();

  const searchCheck = () => {
    setError(false)
    setErrorText('');
    setLoading(true)
    findCheck((bankName as any)?.value, checkNumber)
      .then((response) => {
        setLocalUser({
          mobile: response.data.message.check?.mobile?.number,
          userName: response.data.message.check?.userName,
        });
        setChecks(response.data.message.check);
      })
      .catch((error) => {
        setErrorText(error?.response?.data?.error);
        setChecks(null)
        setError(true);
      }).finally(() => {
        setLoading(false)
      });
  };
  return (
    <>
      <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-0 md:gap-3 flex flex-col rounded-lg  mt-2  w-full'>
        <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[0px]  w-full h-auto md:h-[47px] rounded-[10px]'>
          <div className='flex  items-center gap-3 md:gap-[20px]'>
            <img
              src='/assets/search_white.svg'
              className='w-5 md:w-[30px] h-5 md:h-[30px]'
            />
            <p className='text-white text-xl min-w-[90px]'>{"اسم البنك"}</p>
          </div>
          <div className='w-full'>
            <div className='flex flex-col md:flex-row w-full  items-center gap-3 md:gap-[10px] '>
              <div
                className={`w-full md:w-[330px] me-0 md:me-[20px] ${
                  error ? "border-[1px] border-red-600 rounded-md" : ""
                }`}>
                <Select
                  noOptionsMessage={() => "لا يوجد  "}
                  className={`basic-single  h-10 rounded-md  text-base border-none ${
                    error ? "border-[1px] border-red-600" : ""
                  }`}
                  classNamePrefix='select'
                  placeholder=''
                  value={bankName}
                  onChange={(value) => {
                    setError(false);
                    setBankName(value as any);
                  }}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={true}
                  isSearchable={true}
                  options={bankNames}
                />
              </div>
              <p className='text-white text-xl min-w-[90px]'>{"رقم الشيك"}</p>
              <div
                className={`flex flex-row bg-[#F2F0EF] h-10 w-full md:w-[200px]   p-1 pe-4 rounded-lg ${
                  error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                }`}>
                <input
                  onKeyDown={(e) => {
                    if (e.code == "Enter") searchCheck();
                  }}
                  value={checkNumber}
                  onChange={(e) => {
                    setError(false);
                    setCheckNumber(e.target.value);
                  }}
                  dir='ltr'
                  className={`bg-[#F2F0EF]  font-normal w-full outline-none text-base `}
                />
              </div>
              <button
                onClick={searchCheck}
                disabled={checkNumber == ""}
                className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                {loading ? <LoadingSpinner /> : "ابحث"}
              </button>
            </div>
          </div>
        </div>
        <p className='text-base  text-red-600 mt-1 px-5  ps-5 md:ps-[140px] text-center md:text-start'>
          {errorText ? errorText : ""}
        </p>
        <div className='flex flex-col gap-3 '>
          <div className='flex gap-3 md:gap-0 flex-col md:flex-row w-full'>
            <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
              <p className='text-white text-lg md:text-lg '>
                الاسم : {localUser?.userName}
              </p>
            </div>
            <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
              <p className='text-white text-lg md:text-lg  flex  gap-1'>
                الهاتف المحمول : {<p dir='ltr'>{localUser?.mobile}</p>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
