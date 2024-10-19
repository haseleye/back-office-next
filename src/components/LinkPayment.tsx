import { useState } from "react";
import { LoadingSpinner } from "./loading";
import Select from "react-select";
import { paymentMethods } from "./constants";

export default function LinkPayment() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
 
    
    
    const onSubmit = () => {
        
      
  };
  return (
    <>
      <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-0 md:gap-3 flex flex-col rounded-lg  mt-2  w-full'>
        <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-10  w-full h-auto md:h-[47px] rounded-[10px]'>
          <div className='flex  items-center gap-3 md:gap-[20px]'>
            <img
              src='/assets/search_white.svg'
              className='w-5 md:w-[30px] h-5 md:h-[30px]'
            />
            <p className='text-white text-xl min-w-[90px]'>{"رقم المعاملة"}</p>
          </div>
          <div className='w-full'>
            <div className='flex flex-col md:flex-row w-full  items-center gap-3 md:gap-5 '>
              <div
                className={`flex flex-row bg-[#F2F0EF] h-10 w-full md:w-[340px]   p-1 pe-4 rounded-lg ${
                  error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                }`}>
                <input
                  onKeyDown={(e) => {
                    if (e.code == "Enter") onSubmit();
                  }}
                  value={transactionNumber}
                  onChange={(e) => {
                    setError(false);
                    setTransactionNumber(e.target.value);
                  }}
                  className={`bg-[#F2F0EF]  font-normal w-full outline-none text-base `}
                />
              </div>

              <div className='flex flex-row gap-1 items-center h-11'>
                <p className='text-white text-xl min-w-[90px]'>
                  {"طريقة الدفع "}
                </p>{" "}
                <div className='w-[200px]'>
                  <Select
                    className={`basic-single  h-11 rounded-md  text-base border-none`}
                    classNamePrefix='select'
                    isDisabled={false}
                    isLoading={false}
                    placeholder=''
                    isClearable={false}
                    isRtl={true}
                    isSearchable={false}
                    name='paymentMethod'
                    options={paymentMethods}
                    value={
                      paymentMethod
                        ? paymentMethods?.filter?.(
                            (item) => item.value == paymentMethod
                          )
                        : null
                    }
                    onChange={(value) => {
                      setPaymentMethod(value?.value as any);
                    }}
                  />
                </div>
              </div>
              <button
                onClick={onSubmit}
                disabled={transactionNumber == ""||paymentMethod==""}
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
              <p className='text-white text-lg md:text-lg '>القيمة : {""}</p>
            </div>
            <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
              <p className='text-white text-lg md:text-lg  flex  gap-1'>
                تاريخ المعاملة  : </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
