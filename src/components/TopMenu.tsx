import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";
import { useEffect, useMemo, useState } from "react";
import { findPaymentApi } from "@/network/auth";
import FindCheck from "./FindCheck";
import { LoadingSpinner } from "./loading";
import LinkPayment from "./LinkPayment";
import { getCookie } from "cookies-next";
import { NationalModal } from "./NationalModal";
import StatusModal from "./statusModa";
import ReportsMenu from "./reportsMenu";
export default function TopMenu() {
  const [error, setError] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [errorText, setErrorText] = useState("");
  const [searchMobile, setSearchMobile] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState(false);
  const { setCurrentUser, currentUser } = useAppContext();
  const [paymentNumber, setPaymentNumber] = useState("");
  const isLoggedIn = getCookie("authToken");
  const { selectedType, setFindPayment } = useAppContext();
  const Search = async () => {
    setCurrentUser(undefined);
    if (!new RegExp("^0?1[0125][0-9]{8}$").test(searchMobile)) {
      setErrorText("رقم الهاتف غير سليم");
      return;
    }
    setSearchLoading(true);
    setError(false);
    setErrorText("");
    getUserDetails(searchMobile)
      .then((response) => {
        setCurrentUser((response.data as any)?.message);
      })
      .catch((error) => {
        setErrorText(error?.response?.data?.error);
        setError(true);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };
  const [showNational, setShowNational] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const searchType = useMemo(() => {
    return selectedType.cat == 1 && selectedType.subCat == 1
      ? "find_payment"
      : selectedType.cat == 1 && selectedType.subCat == 4
      ? "find_check"
      : selectedType.cat == 2
      ? "reports"
      : null;
  }, [selectedType]);
  const isSuspended = useMemo(() => {
    let nextTrail =
      (new Date(currentUser?.info?.status?.login?.nextTrial as any) as any) -
      (new Date() as any);
    if (nextTrail > 0 || currentUser?.info.status.isSuspended) return true;
    else return false;
  }, [currentUser]);

  useEffect(() => {
    setSearchMobile("");
  }, [selectedType?.cat]);
  useEffect(() => {
    setErrorText("");
    setPaymentNumber("");
    setError(false);
  }, [selectedType]);

  const findPaymentClick = () => {
    setFindPayment(undefined);
    setError(false);
    setErrorText("");
    setSearchLoading(true);
    findPaymentApi(paymentNumber)
      .then((response1) => {
        let payment = response1.data?.message?.paymentData;
        getUserDetails(payment?.mobile?.number).then((response) => {
          setFindPayment(payment, (response.data as any)?.message);
        });
      })
      .catch((error) => {
        setErrorText(error.response?.data?.error);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  return (
    <>
      {!isLoggedIn ? (
        ""
      ) : (
        <>
          {!searchType ? (
            <div className='bg-THEME_SECONDARY_COLOR p-3 md:py-6 gap-[70px] md:gap-0 flex flex-col rounded-lg   w-full'>
              <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[60px]  w-full h-[47px] rounded-[10px]'>
                <div className='flex  items-center gap-3 md:gap-[30px] mb-0 md:mb-6'>
                  <img
                    src='/assets/search_white.svg'
                    className='w-5 md:w-[30px] h-5 md:h-[30px]'
                  />
                  <img
                    src='/assets/mobNumberWhite.svg'
                    className='w-[120px] md:w-[140px]'
                  />
                </div>
                <div>
                  <div className='flex flex-row w-full  items-center gap-3 md:gap-[30px] '>
                    <div
                      className={`flex flex-row bg-[#F2F0EF] w-full  md:w-[340px]  p-1 pe-4 rounded-lg ${
                        error || mobileError || errorText
                          ? "border-THEME_ERROR_COLOR border-[1px]"
                          : ""
                      }`}>
                      <input
                        onKeyDown={(e) => {
                          if (e.code == "Enter") Search();
                        }}
                        value={searchMobile}
                        onChange={(e) => setSearchMobile(e.target.value)}
                        dir='ltr'
                        className={`bg-[#F2F0EF] font-normal w-full outline-none text-base `}
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
                      className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                      {searchLoading ? <LoadingSpinner primary /> : "ابحث"}
                    </button>
                  </div>
                  <p className='text-base  text-red-600 mt-1 h-6 min-h-6'>
                    {errorText ? errorText : ""}
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-3 '>
                <p className='text-white text-lg md:text-lg '>
                  الاسم :{" "}
                  {`${currentUser?.info?.firstName ?? ""} ${
                    currentUser?.info?.lastName ?? ""
                  }`}
                </p>
                <div className='flex gap-3 md:gap-0 flex-col md:flex-row w-full'>
                  <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
                    <p className='text-white text-lg md:text-lg  flex  gap-1'>
                      الهاتف المحمول :{" "}
                      {<p dir='ltr'>{currentUser?.info?.mobile ?? ""}</p>}
                    </p>
                    <p className='text-white text-lg md:text-lg  flex flex-row gap-1 items-center'>
                      بطاقة الرقم القومي :
                      <p>
                        {" "}
                        {currentUser?.info?.identification?.nationalId?.back ? (
                          <span
                            className='underline cursor-pointer'
                            onClick={() => setShowNational(true)}>
                            {" "}
                            عرض
                          </span>
                        ) : currentUser?.info ? (
                          "غير موجود"
                        ) : (
                          ""
                        )}
                      </p>
                    </p>
                  </div>
                  <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
                    <p className='text-white text-lg md:text-lg '>
                      البريد الإلكتروني :{" "}
                      {currentUser?.info
                        ? currentUser?.info?.email
                          ? currentUser?.info?.email
                          : "غير موجود"
                        : ""}
                    </p>
                    <p className='text-white text-lg md:text-lg  flex gap-1 flex-row'>
                      حالة الحساب :{" "}
                      <span
                        onClick={() => {
                          if (isSuspended) {
                            setShowStatus(true);
                          }
                        }}
                        className={`${
                          isSuspended ? "underline cursor-pointer" : ""
                        }`}>
                        {" "}
                        {currentUser?.info
                          ? isSuspended
                            ? " معلق "
                            : " نشط "
                          : ""}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : searchType == "find_payment" ? (
            <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg    w-full'>
              <div className=' p-3 flex flex-col md:flex-row  items-start gap-3 md:gap-[60px]  w-full h-[70px] rounded-[10px]'>
                <div className='flex  items-center gap-3 md:gap-[20px] '>
                  <img
                    src='/assets/search_white.svg'
                    className='w-5 md:w-[30px] h-5 md:h-[30px]'
                  />
                  <p className='text-white text-xl min-w-[120px]'>
                    {"الرقم المرجعي"}
                  </p>
                </div>
                <div className='w-full'>
                  <div className='flex flex-row w-full  items-center gap-3 md:gap-[30px] '>
                    <div
                      className={`flex flex-row bg-[#F2F0EF] w-full  md:w-[58%]  p-1 pe-4 rounded-lg ${
                        error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                      }`}>
                      <input
                        value={paymentNumber}
                        onKeyDown={(e) => {
                          if (e.code == "Enter") findPaymentClick();
                        }}
                        onChange={(e) => setPaymentNumber(e.target.value)}
                        className={`bg-[#F2F0EF] px-1 md:px-3 font-normal w-full outline-none text-base `}
                      />
                    </div>
                    <button
                      onClick={findPaymentClick}
                      disabled={paymentNumber == ""}
                      className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                      {searchLoading ? <LoadingSpinner primary /> : "ابحث"}
                    </button>
                  </div>
                  <p className='text-base text-red-600 mt-1 h-6'>
                    {errorText ? errorText : ""}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-3 '>
                <div className='flex gap-3 md:gap-0 flex-col md:flex-row w-full'>
                  <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
                    <p className='text-white text-lg md:text-lg '>
                      الاسم :{" "}
                      {`${currentUser?.info?.firstName ?? ""} ${
                        currentUser?.info?.lastName ?? ""
                      }`}
                    </p>
                  </div>
                  <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
                    <p className='text-white text-lg md:text-lg  flex  gap-1'>
                      الهاتف المحمول :{" "}
                      {<p dir='ltr'>{currentUser?.info?.mobile ?? ""}</p>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : searchType == "find_check" ? (
            <FindCheck />
          ) : (
            ""
          )}
          {selectedType?.cat == 1 && selectedType.subCat == 2 ? (
            <LinkPayment />
          ) : (
            ""
          )}
          {selectedType?.cat == 2 ? <ReportsMenu /> : ""}
          {showNational ? (
            <NationalModal setShowNational={setShowNational} />
          ) : null}
          {showStatus ? <StatusModal setShowStatus={setShowStatus} /> : null}
        </>
      )}
    </>
  );
}
