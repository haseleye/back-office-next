import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { createPaymentsReport, findPaymentApi } from "@/network/auth";
import FindCheck from "./FindCheck";
import { LoadingSpinner } from "./loading";
import LinkPayment from "./LinkPayment";
import { getCookie } from "cookies-next";
import Select from "react-select";
import { Transition } from "@headlessui/react";
import PieChart from "./chart";

export default function TopMenu() {
  const [error, setError] = useState(false);

  const [mobileError, setMobileError] = useState("");
  const [errorText, setErrorText] = useState("");
  const [searchMobile, setSearchMobile] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const { setCurrentUser, currentUser } = useAppContext();
  const [paymentNumber, setPaymentNumber] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [reportForm, setReportForm] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
    selected: "all",
  });
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
    setReportForm({
      from: new Date().toISOString().split("T")[0],
      to: new Date().toISOString().split("T")[0],
      selected: "all",
    });
    setPaymentReport(undefined);
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
  const downloadImages = () => {
    setDownloadLoading(true);
    const a = document.createElement("a") as any;
    a.href = currentUser?.info.identification?.nationalId?.back;
    a.download = currentUser?.info.identification?.nationalId?.back
      .split("/")
      .pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      const a2 = document.createElement("a") as any;
      a2.href = currentUser?.info.identification?.nationalId?.front;
      a2.download = currentUser?.info.identification?.nationalId?.front
        .split("/")
        .pop();
      document.body.appendChild(a2);
      a2.click();
      document.body.removeChild(a2);
      setDownloadLoading(false);
    }, 1000);
  };
  const [paymentReport, setPaymentReport] = useState<any>();

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
                      // disabled={searchMobile == "" || searchLoading}
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
          {selectedType?.cat == 2 ? (
            <>
              <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg    w-full'>
                <div className=' p-3 flex flex-col md:flex-row  items-start gap-3 md:gap-[60px]  w-full h-[120px] rounded-[10px]'>
                  <div className='flex  items-center gap-3 md:gap-[20px] '>
                    <img
                      src='/assets/search_white.svg'
                      className='w-5 md:w-[30px] h-5 md:h-[30px]'
                    />
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='flex flex-row w-full gap-[70px] items-center'>
                      <div className='flex flex-row gap-1 items-center justify-between w-[300px]'>
                        <p className='text-xl font-medium text-white'>
                          التاريخ :{" "}
                        </p>

                        <input
                          value={
                            reportForm?.from ??
                            new Date().toISOString().split("T")[0]
                          }
                          onChange={(e) => {
                            setReportForm({
                              ...reportForm,
                              from: e.target.value,
                            } as any);
                          }}
                          className='bg-[#F2F0EF] w-[230px]  h-11 rounded-[10px] px-2 text-base'
                          type='date'
                          max={new Date().toISOString()?.split("T")?.[0]}
                        />
                      </div>
                      <div className='flex flex-row gap-1 items-center justify-between w-[300px]'>
                        <p className='text-xl font-medium text-white'>
                          التاريخ :{" "}
                        </p>

                        <input
                          value={
                            reportForm?.to ??
                            new Date().toISOString().split("T")[0]
                          }
                          onChange={(e) => {
                            setReportForm({
                              ...reportForm,
                              to: e.target.value,
                            } as any);
                          }}
                          className='bg-[#F2F0EF] w-[230px]  h-11 rounded-[10px] px-2 text-base'
                          type='date'
                          max={new Date().toISOString()?.split("T")?.[0]}
                        />
                      </div>
                    </div>
                    <div className='flex flex-row w-full gap-[70px] items-center'>
                      {" "}
                      <div className='flex flex-row gap-1 items-center justify-between w-[300px]'>
                        <p className='text-xl font-medium text-white'>
                          النوع :{" "}
                        </p>

                        <div className='w-[230px]'>
                          <Select
                            noOptionsMessage={() => "لا يوجد  "}
                            className={`basic-single  h-11 rounded-md  text-base border-none`}
                            classNamePrefix='select'
                            placeholder=''
                            value={
                              [
                                { label: "الكل", value: "all" },
                                {
                                  label: "الإيداعات البنكية",
                                  value: "bankDeposit",
                                },
                                {
                                  label: "التحويلات البنكية",
                                  value: "bankTransfer",
                                },
                                { label: "أنستاباي", value: "instaPay" },
                                {
                                  label: "بطاقات الائتمان",
                                  value: "creditCard",
                                },
                              ]?.filter(
                                (item) => item?.value == reportForm.selected
                              )?.[0]
                            }
                            onChange={(value) => {
                              setReportForm({
                                ...reportForm,
                                selected: value?.value as string,
                              } as any);
                            }}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={true}
                            isSearchable={false}
                            name='color'
                            options={[
                              { label: "الكل", value: "all" },
                              {
                                label: "الإيداعات البنكية",
                                value: "bankDeposit",
                              },
                              {
                                label: "التحويلات البنكية",
                                value: "bankTransfer",
                              },
                              { label: "أنستاباي", value: "instaPay" },
                              { label: "بطاقات الائتمان", value: "creditCard" },
                            ]}
                          />
                        </div>
                      </div>
                      <div className='flex flex-row gap-1 items-center justify-end w-[300px]'>
                        <button
                          className=' h-11 bg-white rounded-lg w-[230px] flex items-center justify-center '
                          onClick={() => {
                            setReportLoading(true);
                            createPaymentsReport(reportForm.from, reportForm.to)
                              .then((response) => {
                                console.log("RESPONSE", response);
                                setPaymentReport(
                                  response.data?.message?.report
                                );
                              })
                              .catch((error) => {})
                              .finally(() => {
                                setReportLoading(false);
                              });
                          }}>
                          {reportLoading ? <LoadingSpinner primary /> : "بحث"}
                        </button>
                      </div>
                    </div>
                    <p className='text-base text-red-600 mt-1 h-6'>
                      {errorText ? errorText : ""}
                    </p>
                  </div>
                </div>
              </div>
              {paymentReport ? (
                <Accordion
                  reportForm={reportForm}
                  paymentReport={paymentReport}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {showNational ? (
            <Modal
              setShowModal={setShowNational}
              isTopCentered={window.innerWidth > 768 ? false : true}>
              <div className=' w-auto  mt-4 md:mt-0'>
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
                <div className='bg-white w-full p-4 pt-3 md:pt-10  flex flex-col gap-3 md:gap-10 rounded-b-lg items-center'>
                  <div className='flex  flex-col gap-3 md:gap-0 md:flex-row px-2 w-full md:px-6  justify-between'>
                    <p className='text-black text-base md:text-lg '>
                      الاسم :{" "}
                      <span className='font-normal text-lg truncate'>
                        {currentUser?.info.firstName}{" "}
                        {currentUser?.info.lastName}
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
                  <div className='w-full flex flex-col md:flex-row gap-6   justify-center '>
                    <button
                      onClick={downloadImages}
                      className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white flex flex-row items-center justify-center rounded-md h-[50px] min-h-[50px]'>
                      {downloadLoading ? <LoadingSpinner /> : "تحميل"}
                    </button>
                    <button
                      onClick={() => {
                        (
                          document.getElementById("body") as any
                        ).style.overflow = "scroll";
                        setShowNational(false);
                      }}
                      className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
          {showStatus ? (
            <Modal setShowModal={setShowStatus} isTopCentered={false}>
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
                        {currentUser?.info.firstName}{" "}
                        {currentUser?.info.lastName}
                      </span>
                    </p>
                    <p className='text-black text-base md:text-lg  '>
                      الهاتف المحمول :{" "}
                      <span dir='ltr' className='font-normal text-lg'>
                        {currentUser?.info.mobile}
                      </span>
                    </p>
                  </div>
                  <div className='w-full flex    '>
                    <p className=' text-base md:text-lg text-center '>
                      {(currentUser?.info.status.message
                        ? currentUser?.info.status.message
                        : null) ??
                        `هذا الحساب معلق حتى تاريخ ${new Date(
                          currentUser?.info.status.login.nextTrial as any
                        )?.toLocaleDateString("ar-AE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })} الساعة ${new Date(
                          currentUser?.info.status.login.nextTrial as any
                        ).toLocaleTimeString("ar-AE", {
                          hour: "2-digit",
                          hourCycle: "h12",
                          minute: "2-digit",
                        })}`}
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
      )}
    </>
  );
}

const AccordionItem = ({ title, body, isTotal }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full bg-[#d9d9d940] shadow-lg rounded-lg overflow-hidden  pb-5'>
      <div className=' border-gray-200'>
        <button
          className='w-full text-left p-4 focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}>
          <div className='flex gap-3 items-center'>
            <span className='w-[35px] h-[35px]  flex justify-center text-2xl items-center  rounded-sm border-[1px] border-solid border-[#D9D9D9]'>
              {isOpen ? "-" : "+"}
            </span>
            <h2 className='font-semibold text-xl'>{title}</h2>
          </div>
        </button>
        <Transition
          show={isOpen}
          enter='transition-all duration-300 ease-in-out'
          enterFrom='max-h-0 opacity-0'
          enterTo='max-h-screen opacity-100'
          leave='transition-all duration-300 ease-in-out'
          leaveFrom='max-h-screen opacity-100'
          leaveTo='max-h-0 opacity-0'>
          <div className='flex flex-row gap-[50px] ps-10'>
            <div className='flex flex-col gap-5'>
              {isTotal ? (
                <div className='flex flex-row gap-[40px] items-center px-5 pt-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#009999] text-[#009999]'> t</p>
                      <p className='text-base'>بطاقات الائتمان </p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.creditCard?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#999900] text-[#999900]'> t</p>
                      <p className='text-base'>الإيداعات البنكية </p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.bankDeposit?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#990099] text-[#990099]'> t</p>
                      <p className='text-base'>التحويلات البنكية </p>
                    </div>

                    <p className='text-lg'>
                      {Number(
                        body?.bankTransfer?.amount ?? 0
                      )?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#990000] text-[#990000]'> t</p>
                      <p className='text-base'>إنستاباي </p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.instaPay?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div className='flex flex-row gap-[70px] items-center px-5 pt-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#2196F3] text-[#2196F3]'> t</p>
                      <p className='text-base'>دفعات الحجز</p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.booking?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#FFC107] text-[#FFC107]'> t</p>
                      <p className='text-base'>دفعات التعاقد</p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.contracting?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#4CAF50] text-[#4CAF50]'> t</p>
                      <p className='text-base'>الدفع النقدي</p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.cashing?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                </div>
              )}
              <p className='text-xl px-5'>
                القيمة الإجمالية :{" "}
                {Number(
                  isTotal
                    ? body?.bankDeposit?.amount +
                        body?.bankTransfer?.amount +
                        body?.instaPay?.amount +
                        body?.creditCard?.amount
                    : body?.booking?.amount +
                        body?.contracting?.amount +
                        body?.cashing?.amount
                )?.toLocaleString()}
                {" جنيه "}
              </p>
            </div>
            <PieChart
              isTotal={isTotal}
              percents={
                isTotal
                  ? [
                      body?.bankDeposit?.percent,
                      body?.bankTransfer?.percent,
                      body?.instaPay?.percent,
                      body?.creditCard?.percent,
                    ]
                  : [
                      body?.booking?.percent,
                      body?.contracting?.percent,
                      body?.cashing?.percent,
                    ]
              }
            />
          </div>
        </Transition>
      </div>
    </div>
  );
};

const Accordion = ({ reportForm, paymentReport }: any) => {
  return (
    <div className='flex flex-col gap-4 w-full px-10 pt-5'>
      {reportForm?.selected == "all" || reportForm.selected == "creditCard" ? (
        <AccordionItem
          isExpanded={true}
          title={`مدفوعات بطاقات الائتمان (عدد المعاملات: ${paymentReport?.creditCard?.count})`}
          body={paymentReport?.creditCard}
        />
      ) : (
        ""
      )}
      {reportForm?.selected == "all" || reportForm.selected == "bankDeposit" ? (
        <AccordionItem
          title={`مدفوعات الإيدعات البنكية (عدد المعاملات: ${paymentReport?.bankDeposit?.count})`}
          body={paymentReport?.bankDeposit}
        />
      ) : (
        ""
      )}
      {reportForm?.selected == "all" ||
      reportForm.selected == "bankTransfer" ? (
        <AccordionItem
          title={`مدفوعات التحويلات البنكية  (عدد المعاملات: ${paymentReport?.bankTransfer?.count})`}
          body={paymentReport?.bankTransfer}
        />
      ) : (
        ""
      )}
      {reportForm?.selected == "all" || reportForm.selected == "instaPay" ? (
        <AccordionItem
          title={`مدفوعات تحويلات أنستاباي (عدد المعاملات: ${paymentReport?.instaPay?.count})`}
          body={paymentReport?.instaPay}
        />
      ) : (
        ""
      )}

      {reportForm?.selected == "all" ? (
        <AccordionItem
          title={`المدفوعات الإجمالية (عدد المعاملات: ${paymentReport?.total?.count})`}
          body={paymentReport?.total}
          isTotal={true}
        />
      ) : (
        ""
      )}
    </div>
  );
};
