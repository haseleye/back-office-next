import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";
import { useState } from "react";

export default function TopMenu() {
  const [error, setError] = useState(false);
  const [searchMobile, setSearchMobile] = useState<string>("");
  const { setCurrentUser, currentUser } = useAppContext();

  const Search = async () => {
    getUserDetails(searchMobile)
      .then((response) => {
        setCurrentUser((response.data as any)?.message);
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className='bg-THEME_SECONDARY_COLOR p-3 md:p-10 gap-[50px] md:gap-10 flex flex-col rounded-lg  mt-2  w-full'>
      <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[30px]  w-full h-[47px] rounded-[10px]'>
        <div className='flex  items-center gap-3 md:gap-[30px]'>
          <img
            src='/assets/search_white.svg'
            className='w-5 md:w-[50px] h-5 md:h-[50]'
          />
          <img
            src='/assets/mobNumberWhite.svg'
            className='w-[120px] md:w-[160px]'
          />
        </div>
        <div className='flex flex-row w-full  items-center gap-3 md:gap-[30px] '>
          <div
            className={`flex flex-row bg-[#F2F0EF] w-full  md:w-[340px]  p-1 pe-4 rounded-lg ${
              error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
            }`}>
            <input
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
              dir='ltr'
              className={`bg-[#F2F0EF] w-full outline-none text-base `}
            />
            <img
              src='/assets/egypt.png'
              className='mx-2'
              width={30}
              height={30}
            />
          </div>
          <button
            onClick={Search}
            disabled={searchMobile == ""}
            className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
            ابحث
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-5 md:gap-10'>
        <p className='text-white text-lg md:text-xl font-semibold'>
          الاسم :{" "}
          {`${currentUser?.info?.firstName ?? ""} ${
            currentUser?.info?.lastName ?? ""
          }`}
        </p>
        <div className='flex gap-5 md:gap-0 flex-col md:flex-row w-full'>
          <div className='flex flex-col  gap-5 md:gap-10 flex-1'>
            <p className='text-white text-lg md:text-xl font-semibold flex '>
              الهاتف المحمول :{" "}
              {<p dir='ltr'>{currentUser?.info?.mobile ?? ""}</p>}
            </p>
            <p className='text-white text-lg md:text-xl font-semibold'>
              بطاقة الرقم القومي :
              {currentUser?.info?.identification?.nationalId?.back
                ? " عرض"
                : currentUser?.info
                ? "غير موجود"
                : ""}
            </p>
          </div>
          <div className='flex flex-col  gap-5 md:gap-10 flex-1'>
            <p className='text-white text-lg md:text-xl font-semibold'>
              البريد الإلكتروني : {currentUser?.info?.email}
            </p>
            <p className='text-white text-lg md:text-xl font-semibold'>حالة الحساب:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
