import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";
import Select from "react-select";
import { bankNames } from "./constants";
import { findCheck } from "@/network/auth";

export default function TopMenu() {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchMobile, setSearchMobile] = useState<string>("");
  const [localUser, setLocalUser] = useState<any>();
  const { setCurrentUser, currentUser } = useAppContext();
  const [paymentNumber, setPaymentNumber] = useState("");
  const [bankName, setBankName] = useState(bankNames?.[0]);
  const { selectedType } = useAppContext();
  const Search = async () => {
    setError(false);
    setErrorText("");
    getUserDetails(searchMobile)
      .then((response) => {
        setCurrentUser((response.data as any)?.message);
      })
      .catch((error) => {
        setCurrentUser(undefined);
        setErrorText(error?.response?.data?.error);
        setError(true);
      });
  };
  const [showNational, setShowNational] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const { setChecks } = useAppContext();
  const searchType = useMemo(() => {
    return selectedType.cat == 1 && selectedType.subCat == 1
      ? "find_payment"
      : selectedType.cat == 1 && selectedType.subCat == 4
      ? "find_check"
      : null;
  }, [selectedType]);
  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);
  const searchCheck = () => {
    findCheck(bankName.value, paymentNumber).then((response) => {
      console.log("response", response.data.message.check);
      setLocalUser({
        mobile: response.data.message.check?.mobile?.number,
        userName: response.data.message.check?.userName,
      });

      setCurrentUser({
        ...(currentUser as any),
        info: {
          ...currentUser?.info,
          mobile: response.data.message.check?.mobile?.number,
          userName: response.data.message.check?.userName,
        },
      });
      setChecks(response.data.message.check);
    });
  };
  return (
    <>
      {!searchType ? (
        <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg  mt-2  w-full'>
          <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[60px]  w-full h-[47px] rounded-[10px]'>
            <div className='flex  items-center gap-3 md:gap-[30px]'>
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
                    error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                  }`}>
                  <input
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
                  disabled={searchMobile == ""}
                  className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                  ابحث
                </button>
              </div>
              <p className='text-base text-red-600 mt-1'>
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
                      if (currentUser?.info.status.isSuspended) {
                        setShowStatus(true);
                      }
                    }}
                    className={`${
                      currentUser?.info?.status?.isSuspended
                        ? "underline cursor-pointer"
                        : ""
                    }`}>
                    {" "}
                    {currentUser?.info
                      ? currentUser?.info?.status?.isSuspended
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
        <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg  mt-2  w-full'>
          <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[60px]  w-full h-[47px] rounded-[10px]'>
            <div className='flex  items-center gap-3 md:gap-[20px]'>
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
                  className={`flex flex-row bg-[#F2F0EF] w-full  md:w-full  p-1 pe-4 rounded-lg ${
                    error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                  }`}>
                  <input
                    value={paymentNumber}
                    onChange={(e) => setPaymentNumber(e.target.value)}
                    dir='ltr'
                    className={`bg-[#F2F0EF]  font-normal w-full outline-none text-base `}
                  />
                </div>
                <button
                  onClick={Search}
                  disabled={searchMobile == ""}
                  className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                  ابحث
                </button>
              </div>
              <p className='text-base text-red-600 mt-1'>
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
        <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg  mt-2  w-full'>
          <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[0px]  w-full h-[47px] rounded-[10px]'>
            <div className='flex  items-center gap-3 md:gap-[20px]'>
              <img
                src='/assets/search_white.svg'
                className='w-5 md:w-[30px] h-5 md:h-[30px]'
              />
              <p className='text-white text-xl min-w-[90px]'>{"اسم البنك"}</p>
            </div>
            <div className='w-full'>
              <div className='flex flex-row w-full  items-center gap-3 md:gap-[10px] '>
                <div className='w-[250px] md:w-[330px] me-[20px]'>
                  <Select
                    noOptionsMessage={() => "لا يوجد  "}
                    className='basic-single  h-11 rounded-md  text-base border-none'
                    classNamePrefix='select'
                    placeholder=''
                    value={bankName}
                    onChange={(value) => {
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
                  className={`flex flex-row bg-[#F2F0EF] w-full md:w-[200px]   p-1 pe-4 rounded-lg ${
                    error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                  }`}>
                  <input
                    value={paymentNumber}
                    onChange={(e) => setPaymentNumber(e.target.value)}
                    dir='ltr'
                    className={`bg-[#F2F0EF]  font-normal w-full outline-none text-base `}
                  />
                </div>
                <button
                  onClick={searchCheck}
                  disabled={paymentNumber == ""}
                  className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                  ابحث
                </button>
              </div>
              <p className='text-base text-red-600 mt-1'>
                {errorText ? errorText : ""}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-3 '>
            <div className='flex gap-3 md:gap-0 flex-col md:flex-row w-full'>
              <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
                <p className='text-white text-lg md:text-lg '>
                  الاسم :{" "}
                  {localUser?.userName
                    ? localUser?.userName
                    : `${currentUser?.info?.firstName ?? ""} ${
                        currentUser?.info?.lastName ?? ""
                      }`}
                </p>
              </div>
              <div className='flex flex-col  gap-3 md:gap-3 flex-1'>
                <p className='text-white text-lg md:text-lg  flex  gap-1'>
                  الهاتف المحمول :{" "}
                  {
                    <p dir='ltr'>
                      {localUser?.mobile
                        ? localUser.mobile
                        : currentUser?.info?.mobile ?? ""}
                    </p>
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {selectedType?.cat == 1 && selectedType.subCat == 2 ? (
        <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg  mt-2  w-full'>
          <div className=' p-3 flex flex-col md:flex-row  items-center gap-3 md:gap-[60px]  w-full h-[47px] rounded-[10px]'>
            <div className='flex  items-center gap-3 md:gap-[20px]'>
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
                  className={`flex flex-row bg-[#F2F0EF] w-full  md:w-full  p-1 pe-4 rounded-lg ${
                    error ? "border-THEME_ERROR_COLOR border-[1px]" : ""
                  }`}>
                  <input
                    value={searchMobile}
                    onChange={(e) => setSearchMobile(e.target.value)}
                    dir='ltr'
                    className={`bg-[#F2F0EF]  font-normal w-full outline-none text-base `}
                  />
                </div>
                <button
                  onClick={Search}
                  disabled={searchMobile == ""}
                  className='bg-white disabled:opacity-70 rounded-lg px-4 py-1'>
                  ابحث
                </button>
              </div>
              <p className='text-base text-red-600 mt-1'>
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
      ) : (
        ""
      )}
      {showNational ? (
        <Modal isTopCentered={false}>
          <div className=' w-auto '>
            <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
              <p className='text-base md:text-lg text-white '>
                بطاقة الرقم القومي
              </p>
              <img
                src='/assets/close.png'
                className='w-5 h-5 cursor-pointer'
                width={20}
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";

                  setShowNational(false);
                }}
                height={20}
              />
            </div>
            <div className='bg-white w-full p-6 pt-10  flex flex-col gap-10 rounded-b-lg items-center'>
              <div className='flex  flex-col gap-3 md:gap-0 md:flex-row px-2 w-full md:px-6  justify-between'>
                <p className='text-black text-base md:text-lg '>
                  الاسم :{" "}
                  <span className='font-normal text-lg truncate'>
                    {currentUser?.info.firstName} {currentUser?.info.lastName}
                  </span>
                </p>
                <p className='text-black text-base md:text-lg  flex flex-row gap-1 '>
                  الهاتف المحمول :{" "}
                  <span dir='ltr' className='font-normal text-lg'>
                    {currentUser?.info.mobile}
                  </span>
                </p>
              </div>
              <div className='w-full flex flex-col md:flex-row gap-3'>
                <img
                  src={currentUser?.info?.identification?.nationalId?.front}
                  className='w-[350px] h-[220px]  rounded-lg '
                />
                <img
                  src={currentUser?.info?.identification?.nationalId?.back}
                  className='w-[350px] h-[220px]  rounded-lg'
                />
              </div>
              <button
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setShowNational(false);
                }}
                className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                إغلاق
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {showStatus ? (
        <Modal isTopCentered={false}>
          <div className=' w-auto  min-w-full md:min-w-[600px] '>
            <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
              <p className='text-base md:text-lg text-white '>
                سبب تعليق الحساب
              </p>
              <img
                src='/assets/close.png'
                className='w-5 h-5 cursor-pointer'
                width={20}
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setShowStatus(false);
                }}
                height={20}
              />
            </div>
            <div className='bg-white w-full p-6 pt-10  flex flex-col gap-10 rounded-b-lg items-center'>
              <div className='flex  flex-col gap-3 md:gap-0 md:flex-row w-full  justify-between'>
                <p className='text-black text-base md:text-lg '>
                  الاسم :{" "}
                  <span className='font-normal text-lg truncate'>
                    {currentUser?.info.firstName} {currentUser?.info.lastName}
                  </span>
                </p>
                <p className='text-black text-base md:text-lg  '>
                  الهاتف المحمول :{" "}
                  <span dir='ltr' className='font-normal text-lg'>
                    {currentUser?.info.mobile}
                  </span>
                </p>
              </div>
              <div className='w-full '>
                <p className=' text-base md:text-lg '>
                  {currentUser?.info.status.message}
                </p>
              </div>
              <button
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setShowStatus(false);
                }}
                className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                إغلاق
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
