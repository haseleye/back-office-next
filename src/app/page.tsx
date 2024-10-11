"use client";
import BankCard from "@/components/BankCard";
import { bankNames, paymentMethods, paymentTypes } from "@/components/constants";
import { Modal } from "@/components/Modal";
import PaymentCard from "@/components/PaymentCard";
import UnitCard from "@/components/UnitCard";
import { useAppContext } from "@/context";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

export default function Home() {
  const isLoggedIn = getCookie("authToken");
  const router = useRouter();
  const [showUnitModal, setShowUnitModal] = useState(false);
  const { currentUser, selectedType ,checks} = useAppContext();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function formatTimeToHHMM(date: any) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const [showModal, setShowModal] = useState(false);
  const bookingCodes = useMemo(() => {
    let checks =
      currentUser?.bankChecks.map((item) => {
        return {
          value: item.unitId,
          label: item.unitId,
        };
      }) ?? [];
    let payments =
      currentUser?.payments.map((item) => {
        return {
          value: item.unitId,
          label: item.unitId,
        };
      }) ?? [];
    return [...payments, ...checks];
  }, [currentUser]);
  return (
    <div className=' mt-4 mb-3 '>
      {currentUser && selectedType.cat == 0 ? (
        <div className=' flex flex-col gap-6 items-center'>
          <div className='flex justify-between flex-wrap  gap-3 '>
            {selectedType.subCat == 0 ? (
              currentUser?.payments?.length ? (
                currentUser?.payments.map((item, index) => (
                  <PaymentCard payment={item} key={`payment_${index}`} />
                ))
              ) : (
                <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                  {" "}
                  لا يوجد مدفوعات
                </p>
              )
            ) : selectedType.subCat == 1 ? (
              currentUser?.bankChecks?.length ? (
                currentUser?.bankChecks.map((item, index) => (
                  <BankCard payment={item} key={`check_${index}`} />
                ))
              ) : (
                <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                  {" "}
                  لا يوجد شيكات
                </p>
              )
            ) : selectedType.subCat == 2 ? (
              currentUser?.units?.length ? (
                <>
                  {currentUser?.units.map((item, index) => (
                    <UnitCard
                      item={item}
                      setShowUnitModal={setShowUnitModal}
                      key={`unit_${index}`}
                    />
                  ))}
                  {showUnitModal ? (
                    <Modal isTopCentered={false}>
                      <div className=' w-auto  min-w-full md:min-w-[600px] mt-10 '>
                        <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
                          <p className='text-base md:text-xl  text-white font-semibold'>
                            {"تسجيل العقد"}
                          </p>
                          <img
                            src='/assets/close.png'
                            className='w-5 h-5 cursor-pointer'
                            width={20}
                            onClick={() => {
                              (
                                document.getElementById("body") as any
                              ).style.overflow = "scroll";
                              setShowUnitModal(false);
                            }}
                            height={20}
                          />
                        </div>
                        <div className='bg-white h-[600px] md:h-auto max-h-auto overflow-auto w-auto p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                          <div className='flex flex-col  gap-3 md:gap-[40px] md:flex-row w-full   '>
                            <div className='gap-5 flex flex-col'>
                              <p className='text-black text-base md:text-xl font-semibold'>
                                الاسم :{" "}
                                <span className='font-normal text-lg truncate'>
                                  {currentUser?.info.firstName}{" "}
                                  {currentUser?.info.lastName}
                                </span>
                              </p>
                              <p className='text-black md:hidden text-base md:text-xl font-semibold '>
                                الهاتف المحمول :{" "}
                                <span dir='ltr' className='font-normal text-lg'>
                                  {currentUser?.info.mobile}
                                </span>
                              </p>

                              <div className='flex flex-row w-full gap-1 items-center'>
                                <p className='text-xl font-medium'>
                                  تاريخ العقد :{" "}
                                </p>

                                <input
                                  aria-label='Date'
                                  placeholder='يوم/شهر/سنة'
                                  value={formatDateToYYYYMMDD(new Date())}
                                  onChange={(e) => {
                                    console.log("Ee", e.target.value);
                                  }}
                                  className='bg-[#F2F0EF]  w-[200px] md:w-[270px]  h-11 rounded-[10px] px-2 text-base'
                                  type='date'
                                />
                              </div>
                            </div>
                            <div className='gap-5 flex flex-col'>
                              <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                                الهاتف المحمول :{" "}
                                <span dir='ltr' className='font-normal text-lg'>
                                  {currentUser?.info.mobile}
                                </span>
                              </p>

                              <div className='flex flex-row gap-2 items-center'>
                                <p className='text-xl font-medium'>
                                  {" "}
                                  رقم الوحدة :{" "}
                                </p>

                                <input
                                  className='bg-[#F2F0EF] h-11  rounded-[10px] w-[170px] px-2 text-base'
                                  type='text'
                                />
                              </div>
                            </div>
                          </div>
                          <label className='file-upload'>
                            <input type='file' accept='image/*' />
                            <span> تحميل ملف ال PDF الخاص بالعقد </span>
                            <img
                              src='/assets/upload_pdf.svg'
                              width={40}
                              alt='Upload Icon'
                            />
                          </label>
                          <div className='flex flex-col gap-y-2 md:flex-row w-full justify-around'>
                            <button
                              onClick={() => {
                                (
                                  document.getElementById("body") as any
                                ).style.overflow = "scroll";
                                setShowModal(false);
                              }}
                              className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                              إضافة
                            </button>
                            <button
                              onClick={() => {
                                (
                                  document.getElementById("body") as any
                                ).style.overflow = "scroll";
                                setShowModal(false);
                              }}
                              className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                              إلغاء
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                  {" "}
                  لا يوجد وحدات{" "}
                </p>
              )
            ) : (
              ""
            )}
            {showModal ? (
              <Modal isTopCentered={true}>
                <div className=' w-auto  min-w-full md:min-w-[600px] mt-10 '>
                  <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
                    <p className='text-base md:text-xl  text-white font-semibold'>
                      {selectedType?.subCat == 0
                        ? "  إضافة مدفوعات"
                        : "إضافة شيك بنكي"}
                    </p>
                    <img
                      src='/assets/close.png'
                      className='w-5 h-5 cursor-pointer'
                      width={20}
                      onClick={() => {
                        (
                          document.getElementById("body") as any
                        ).style.overflow = "scroll";
                        setShowModal(false);
                      }}
                      height={20}
                    />
                  </div>
                  {selectedType.subCat == 0 ? (
                    <>
                      <div className='bg-white h-[600px] md:h-auto max-h-auto overflow-auto w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                        <div className='flex   flex-col gap-3 md:gap-[80px] md:flex-row w-full  justify-between '>
                          <div className='gap-5 flex flex-col'>
                            <p className='text-black text-base md:text-xl font-semibold'>
                              الاسم :{" "}
                              <span className='font-normal text-lg truncate'>
                                {currentUser?.info.firstName}{" "}
                                {currentUser?.info.lastName}
                              </span>
                              <p className='text-black  md:hidden text-base md:text-xl font-semibold '>
                                الهاتف المحمول :{" "}
                                <span dir='ltr' className='font-normal text-lg'>
                                  {currentUser?.info.mobile}
                                </span>
                              </p>
                            </p>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>
                                كود الحجز :{" "}
                              </p>
                              <div className='w-[230px]'>
                                <Select
                                  noOptionsMessage={() => "لا يوجد  "}
                                  className='basic-single  h-11 rounded-md  text-base border-none'
                                  classNamePrefix='select'
                                  placeholder=''
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={true}
                                  isSearchable={true}
                                  name='color'
                                  options={bookingCodes}
                                />
                              </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                              <p className='text-xl font-medium'> القيمة : </p>

                              <input
                                className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
                                type='text'
                              />
                              <p className='text-xl '> جنيه </p>
                            </div>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>التاريخ : </p>

                              <input
                                aria-label='Date'
                                placeholder='يوم/شهر/سنة'
                                value={formatDateToYYYYMMDD(new Date())}
                                onChange={(e) => {
                                  console.log("Ee", e.target.value);
                                }}
                                className='bg-[#F2F0EF] w-[230px]  h-11 rounded-[10px] px-2 text-base'
                                type='date'
                              />
                            </div>
                          </div>
                          <div className='gap-5 flex flex-col'>
                            <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                              الهاتف المحمول :{" "}
                              <span dir='ltr' className='font-normal text-lg'>
                                {currentUser?.info.mobile}
                              </span>
                            </p>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>
                                توجيه الدفع :{" "}
                              </p>
                              <div className='w-[143px]'>
                                <Select
                                  className='basic-single  h-11 rounded-md  text-base border-none'
                                  classNamePrefix='select'
                                  placeholder=''
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={true}
                                  isSearchable={true}
                                  name='color'
                                  options={paymentTypes}
                                />
                              </div>
                            </div>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>
                                طريقة الدفع :{" "}
                              </p>
                              <div className='w-[143px]'>
                                <Select
                                  className='basic-single  h-11 rounded-md  text-base border-none'
                                  classNamePrefix='select'
                                  isDisabled={false}
                                  isLoading={false}
                                  placeholder=''
                                  isClearable={false}
                                  isRtl={true}
                                  isSearchable={true}
                                  name='paymentMethod'
                                  options={paymentMethods}
                                />
                              </div>
                            </div>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>الوقت : </p>

                              <input
                                aria-label='time'
                                className='bg-[#F2F0EF] w-[130px] h-11 rounded-md px-2 text-base'
                                type='time'
                                value={formatTimeToHHMM(new Date())}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-row gap-1 items-center w-full'>
                          <p className='text-xl font-medium min-w-[100px]'>
                            رقم المعاملة :{" "}
                          </p>
                          <input
                            className='bg-[#F2F0EF]  h-11  w-full rounded-md px-2 text-base'
                            type='text'
                          />
                        </div>
                        <div className='flex flex-col gap-5 items-start w-full'>
                          <p className='text-xl font-medium min-w-[100px]'>
                            ملاحظات :{" "}
                          </p>
                          <input
                            multiple
                            className='bg-[#F2F0EF]  h-[80px]  w-full rounded-md px-2 text-base'
                            type='text'
                          />
                        </div>
                        <div className='flex flex-col gap-y-2 md:flex-row w-full justify-around'>
                          <button
                            onClick={() => {
                              (
                                document.getElementById("body") as any
                              ).style.overflow = "scroll";
                              setShowModal(false);
                            }}
                            className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                            إضافة
                          </button>
                          <button
                            onClick={() => {
                              (
                                document.getElementById("body") as any
                              ).style.overflow = "scroll";
                              setShowModal(false);
                            }}
                            className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='bg-white h-[600px] md:h-auto max-h-auto overflow-auto w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                        <div className='flex flex-col  gap-3 md:gap-[80px] md:flex-row w-full  justify-between '>
                          <div className='gap-5 flex flex-col'>
                            <p className='text-black text-base md:text-xl font-semibold'>
                              الاسم :{" "}
                              <span className='font-normal text-lg truncate'>
                                {currentUser?.info.firstName}{" "}
                                {currentUser?.info.lastName}
                              </span>
                            </p>
                            <p className='text-black md:hidden text-base md:text-xl font-semibold '>
                              الهاتف المحمول :{" "}
                              <span dir='ltr' className='font-normal text-lg'>
                                {currentUser?.info.mobile}
                              </span>
                            </p>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>
                                كود الحجز :{" "}
                              </p>
                              <div className='w-[230px]'>
                                <Select
                                  noOptionsMessage={() => "لا يوجد  "}
                                  className='basic-single  h-11 rounded-md  text-base border-none'
                                  classNamePrefix='select'
                                  placeholder=''
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={true}
                                  isSearchable={true}
                                  name='color'
                                  options={bookingCodes}
                                />
                              </div>
                            </div>
                            <div className='flex flex-row gap-1 items-center'>
                              <p className='text-xl font-medium'>
                                اسم البنك :{" "}
                              </p>
                              <div className='w-[200px] md:w-[330px]'>
                                <Select
                                  noOptionsMessage={() => "لا يوجد  "}
                                  className='basic-single  h-11 rounded-md  text-base border-none'
                                  classNamePrefix='select'
                                  placeholder=''
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={true}
                                  isSearchable={true}
                                  options={bankNames}
                                />
                              </div>
                            </div>
                            <div className='flex flex-row w-full gap-1 items-center'>
                              <p className='text-xl font-medium'>
                                تاريخ الاستحقاق :{" "}
                              </p>

                              <input
                                aria-label='Date'
                                placeholder='يوم/شهر/سنة'
                                value={formatDateToYYYYMMDD(new Date())}
                                onChange={(e) => {
                                  console.log("Ee", e.target.value);
                                }}
                                className='bg-[#F2F0EF]  w-[200px] md:w-[270px]  h-11 rounded-[10px] px-2 text-base'
                                type='date'
                              />
                            </div>
                          </div>
                          <div className='gap-5 flex flex-col'>
                            <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                              الهاتف المحمول :{" "}
                              <span dir='ltr' className='font-normal text-lg'>
                                {currentUser?.info.mobile}
                              </span>
                            </p>
                            <div className='flex flex-row gap-2 items-center'>
                              <p className='text-xl font-medium'> القيمة : </p>

                              <input
                                className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
                                type='text'
                              />
                              <p className='text-xl '> جنيه </p>
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                              <p className='text-xl font-medium'>
                                {" "}
                                رقم الشيك :{" "}
                              </p>

                              <input
                                className='bg-[#F2F0EF] h-11  rounded-[10px] w-[170px] px-2 text-base'
                                type='text'
                              />
                            </div>
                          </div>
                        </div>
                        <label className='file-upload'>
                          <input type='file' accept='image/*' />
                          <span>تحميل صورة الشيك</span>
                          <img
                            src='/assets/uploadImage.svg'
                            width={40}
                            alt='Upload Icon'
                          />
                        </label>
                        <div className='flex flex-col gap-y-2 md:flex-row w-full justify-around'>
                          <button
                            onClick={() => {
                              (
                                document.getElementById("body") as any
                              ).style.overflow = "scroll";
                              setShowModal(false);
                            }}
                            className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                            إضافة
                          </button>
                          <button
                            onClick={() => {
                              (
                                document.getElementById("body") as any
                              ).style.overflow = "scroll";
                              setShowModal(false);
                            }}
                            className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Modal>
            ) : (
              ""
            )}
          </div>
          {selectedType.subCat == 2 ? (
            ""
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
              {selectedType.subCat == 0 ? "إضافة مدفوعات" : "إضافة شيكات"}
            </button>
          )}
        </div>
      ) : selectedType.cat == 1 ? (
        <>
          {selectedType.subCat == 0 ? (
            <div className='bg-white h-[600px] md:h-auto max-h-auto overflow-auto w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
              <div className='flex  flex-col gap-3  md:flex-row w-full  justify-around'>
                <div className='gap-5 flex flex-col'>
                  <p className='text-black text-base md:text-xl font-semibold'>
                    الاسم :{" "}
                    <span className='font-normal text-lg truncate'>
                      {currentUser
                        ? `${currentUser?.info.firstName} ${currentUser?.info.lastName}`
                        : "غير معلوم"}
                    </span>
                    <p className='text-black  md:hidden text-base md:text-xl font-semibold '>
                      الهاتف المحمول :{" "}
                      <span dir='ltr' className='font-normal text-lg'>
                        {currentUser
                          ? `${currentUser?.info.mobile} `
                          : "غير معلوم"}
                      </span>
                    </p>
                  </p>
                  <div className='flex flex-row gap-1 items-center'>
                    <p className='text-xl font-medium'>كود الحجز : </p>

                    {currentUser ? (
                      <div className='w-[230px]'>
                        <Select
                          noOptionsMessage={() => "لا يوجد  "}
                          className='basic-single  h-11 rounded-md  text-base border-none'
                          classNamePrefix='select'
                          placeholder=''
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={true}
                          isSearchable={true}
                          name='color'
                          options={bookingCodes}
                        />
                      </div>
                    ) : (
                      <span className='font-normal text-lg'>{"غير معلوم"}</span>
                    )}
                  </div>
                  <div className='flex flex-row gap-2 items-center'>
                    <p className='text-xl font-medium'> القيمة : </p>

                    <input
                      className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
                      type='text'
                    />
                    <p className='text-xl '> جنيه </p>
                  </div>
                  <div className='flex flex-row gap-1 items-center'>
                    <p className='text-xl font-medium'>التاريخ : </p>

                    <input
                      aria-label='Date'
                      placeholder='يوم/شهر/سنة'
                      value={formatDateToYYYYMMDD(new Date())}
                      onChange={(e) => {
                        console.log("Ee", e.target.value);
                      }}
                      className='bg-[#F2F0EF] w-[230px]  h-11 rounded-[10px] px-2 text-base'
                      type='date'
                    />
                  </div>
                </div>
                <div className='gap-5 flex flex-col'>
                  <p className='text-black  hidden md:flex text-base md:text-xl font-semibold '>
                    الهاتف المحمول :{" "}
                    <span dir='ltr' className='font-normal text-lg'>
                      {currentUser
                        ? `${currentUser?.info.mobile} `
                        : "غير معلوم"}
                    </span>
                  </p>
                  <div className='flex flex-row gap-1 items-center'>
                    <p className='text-xl font-medium'>توجيه الدفع : </p>

                    {currentUser ? (
                      <div className='w-[143px]'>
                        <Select
                          className='basic-single  h-11 rounded-md  text-base border-none'
                          classNamePrefix='select'
                          placeholder=''
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={true}
                          isSearchable={true}
                          name='color'
                          options={paymentTypes}
                        />
                      </div>
                    ) : (
                      <span className='font-normal text-lg'>{"غير معلوم"}</span>
                    )}
                  </div>
                  <div className='flex flex-row gap-1 items-center'>
                    <p className='text-xl font-medium'>طريقة الدفع : </p>
                    <div className='w-[143px]'>
                      <Select
                        className='basic-single  h-11 rounded-md  text-base border-none'
                        classNamePrefix='select'
                        isDisabled={false}
                        isLoading={false}
                        placeholder=''
                        isClearable={false}
                        isRtl={true}
                        isSearchable={true}
                        name='paymentMethod'
                        options={paymentMethods}
                      />
                    </div>
                  </div>
                  <div className='flex flex-row gap-1 items-center'>
                    <p className='text-xl font-medium'>الوقت : </p>

                    <input
                      aria-label='time'
                      className='bg-[#F2F0EF] w-[130px] h-11 rounded-md px-2 text-base'
                      type='time'
                      value={formatTimeToHHMM(new Date())}
                    />
                  </div>
                </div>
              </div>
              <div className='flex  flex-col gap-5      justify-between px-0 md:px-10 w-full md:w-[85%]'>
                <div className='flex flex-row gap-1 items-center w-full'>
                  <p className='text-xl font-medium min-w-[100px]'>
                    رقم المعاملة :{" "}
                  </p>
                  <input
                    className='bg-[#F2F0EF]  h-11  w-full rounded-md px-2 text-base'
                    type='text'
                  />
                </div>
                <div className='flex flex-col gap-5 items-start w-full'>
                  <p className='text-xl font-medium min-w-[100px]'>
                    ملاحظات :{" "}
                  </p>
                  <textarea
                    rows={3}
                    className='bg-[#F2F0EF] outline-none p-1  h-[80px]  w-full rounded-md px-2 text-base'
                  />
                </div>
                <div className='flex flex-col gap-y-2 md:flex-row w-full justify-around'>
                  <button
                    onClick={() => {
                      (document.getElementById("body") as any).style.overflow =
                        "scroll";
                      setShowModal(false);
                    }}
                    className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                    إضافة
                  </button>
                  <button
                    onClick={() => {
                      (document.getElementById("body") as any).style.overflow =
                        "scroll";
                      setShowModal(false);
                    }}
                    className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          ) : selectedType.subCat == 3 ? (
            <>
              <div className='bg-white h-[600px] overflow-auto w-full p-6 pt-10  flex flex-col gap-5 md:gap-7 rounded-b-lg items-center px-3 md:px-10 '>
                <div className='flex flex-col  gap-3 md:gap-[50px] md:flex-row w-full justify-around  '>
                  <div className='gap-5 md:gap-7 flex flex-col'>
                    <p className='text-black text-base md:text-xl font-semibold'>
                      الاسم :{" "}
                      <span className='font-normal text-lg truncate'>
                        {currentUser?.info.firstName}{" "}
                        {currentUser?.info.lastName}
                      </span>
                    </p>
                    <p className='text-black md:hidden text-base md:text-xl font-semibold '>
                      الهاتف المحمول :{" "}
                      <span dir='ltr' className='font-normal text-lg'>
                        {currentUser?.info.mobile}
                      </span>
                    </p>
                    <div className='flex flex-row gap-1 items-center'>
                      <p className='text-xl font-medium'>كود الحجز : </p>
                      <div className='w-[230px]'>
                        <Select
                          noOptionsMessage={() => "لا يوجد  "}
                          className='basic-single  h-11 rounded-md  text-base border-none'
                          classNamePrefix='select'
                          placeholder=''
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={true}
                          isSearchable={true}
                          name='color'
                          options={bookingCodes}
                        />
                      </div>
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                      <p className='text-xl font-medium'>اسم البنك : </p>
                      <div className='w-[200px] md:w-[330px]'>
                        <Select
                          noOptionsMessage={() => "لا يوجد  "}
                          className='basic-single  h-11 rounded-md  text-base border-none'
                          classNamePrefix='select'
                          placeholder=''
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={true}
                          isSearchable={true}
                          options={bankNames}
                        />
                      </div>
                    </div>
                    <div className='flex flex-row w-full gap-1 items-center'>
                      <p className='text-xl font-medium'>تاريخ الاستحقاق : </p>

                      <input
                        aria-label='Date'
                        placeholder='يوم/شهر/سنة'
                        value={formatDateToYYYYMMDD(new Date())}
                        onChange={(e) => {
                          console.log("Ee", e.target.value);
                        }}
                        className='bg-[#F2F0EF]  w-[200px] md:w-[270px]  h-11 rounded-[10px] px-2 text-base'
                        type='date'
                      />
                    </div>
                  </div>
                  <div className='gap-5 flex flex-col md:gap-7'>
                    <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                      الهاتف المحمول :{" "}
                      <span dir='ltr' className='font-normal text-lg'>
                        {currentUser?.info.mobile}
                      </span>
                    </p>
                    <div className='flex flex-row gap-2 items-center'>
                      <p className='text-xl font-medium'> القيمة : </p>

                      <input
                        className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
                        type='text'
                      />
                      <p className='text-xl '> جنيه </p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                      <p className='text-xl font-medium'> رقم الشيك : </p>

                      <input
                        className='bg-[#F2F0EF] h-11  rounded-[10px] w-[170px] px-2 text-base'
                        type='text'
                      />
                    </div>
                  </div>
                </div>
                <label className='file-upload'>
                  <input type='file' accept='image/*' />
                  <span>تحميل صورة الشيك</span>
                  <img
                    src='/assets/uploadImage.svg'
                    width={40}
                    alt='Upload Icon'
                  />
                </label>
                <div className='flex flex-col gap-y-2 md:flex-row w-full justify-center'>
                  <button
                    onClick={() => {
                      (document.getElementById("body") as any).style.overflow =
                        "scroll";
                      setShowModal(false);
                    }}
                    className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                    إضافة
                  </button>
                </div>
              </div>
            </>
          ) : selectedType.subCat == 4 ? (
            <div className="flex flex-row flex-wrap justify-center">
              {checks.map((item,index) => (
                <BankCard payment={item} key={`check_${index}`} />
              ))}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
