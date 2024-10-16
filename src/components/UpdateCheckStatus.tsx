"use client";
import { Modal } from "@/components/Modal";
import { useAppContext } from "@/context";
import { findCheck, updateCheckStatus } from "@/network/auth";
import { useState } from "react";
import Select from "react-select";
import { bankNames } from "./constants";
import { error } from "console";
import { LoadingSpinner } from "./loading";

const options = [
  { value: "outstanding", label: "في الانتظار" },

  { value: "cleared", label: "تم الصرف" },

  { value: "rejected", label: "تم الرفض" },

  { value: "cashed", label: "تم الاستبدال بالنقد" },
];
export default function UpdateCheckStatus({
  setShowModal,
}: {
  setShowModal: any;
}) {
  const { setChecks, checks } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState<{
    newStatus: undefined | string;
    adviceDate: undefined | string;
  }>({
    newStatus: undefined,
    adviceDate: undefined,
  });
  const updateCheck = () => {
    setLoading(true);
    updateCheckStatus({
      adviceDate: formData.adviceDate ?? new Date().toISOString().split("T")[0],
      bankName: bankNames?.filter(
        (item) => item.label == checks?.[0]?.bankName
      )?.[0]?.value,
      newStatus: formData?.newStatus,
      number: checks?.[0]?.number,
    } as any)
      .then((response) => {
        findCheck(
          bankNames?.filter((item) => item.label == checks?.[0]?.bankName)?.[0]
            ?.value,
          checks?.[0]?.number
        ).then((response) => {
          setChecks(response.data.message.check);
          setFormData({
            adviceDate: undefined,
            newStatus: undefined,
          });
            (document.getElementById("body") as any).style.overflow = "scroll";
          setShowModal(false);
        });
      })
      .catch((error) => {
        setErrorText(error?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1000, // Set your desired z-index value
    }),
  };
  return (
    <Modal
      setShowModal={setShowModal}
      isTopCentered={window?.innerWidth > 768 ? false : true}>
      <div className=' w-auto  min-w-full   md:min-w-[450px] md:w-auto mt-[60px] '>
        <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
          <p className='text-base md:text-lg  text-white font-semibold'>
            {" تحديث حالة الشيك"}
          </p>
          <img
            src='/assets/close.png'
            className='w-5 h-5 cursor-pointer'
            width={20}
            onClick={() => {
              (document.getElementById("body") as any).style.overflow =
                "scroll";
              setShowModal(false);
            }}
            height={20}
          />
        </div>
        <div className='bg-white h-[450px] md:h-auto max-h-auto overflow-auto w-auto p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
          <div className='flex flex-col  gap-3 md:gap-[40px]  '>
            <div className='gap-5 flex justify-between flex-col md:flex-row'>
              <p className='text-black text-base md:text-lg font-semibold'>
                اسم البنك :{" "}
                <span className='font-normal text-lg truncate'>
                  {checks?.[0]?.bankName}
                </span>
              </p>
              <p className='text-black  text-base md:text-lg font-semibold '>
                رقم الشيك :{" "}
                <span dir='ltr' className='font-normal text-lg'>
                  {checks?.[0]?.number}
                </span>
              </p>
            </div>
            <div className='gap-5 md:gap-[70px] items-start md:items-center flex justify-between flex-col md:flex-row'>
              <p className='text-black text-base md:text-lg font-semibold '>
                حالة الشيك :{" "}
                <span dir='ltr' className='font-normal text-lg'>
                  {checks?.[0]?.statusText}
                </span>
              </p>
              <div className='flex flex-row gap-1 items-center'>
                <p className='text-lg font-medium'>الحالة الجديدة : </p>
                <div className='w-[200px]'>
                  <Select
                    noOptionsMessage={() => "لا يوجد  "}
                    className={`basic-single  h-11 rounded-md  text-base border-none`}
                    classNamePrefix='select'
                    placeholder=''
                    styles={customStyles}
                    value={
                      formData?.newStatus
                        ? options?.filter?.(
                            (item) => item.value == formData?.newStatus
                          )
                        : null
                    }
                    onChange={(value) => {
                      setFormData({
                        ...formData,
                        newStatus: value?.value as string,
                      } as any);
                    }}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={true}
                    isSearchable={false}
                    name='New Status'
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex  flex-col md:flex-row gap-1 items-center'>
            <p className='text-lg font-medium'> تاريخ تغيير الحالة : </p>
            <input
              value={
                formData?.adviceDate ?? new Date().toISOString().split("T")[0]
              }
              onChange={(e) => {
                setFormData({
                  ...formData,
                  adviceDate: e.target.value,
                } as any);
              }}
              className='bg-[#F2F0EF] w-[230px]  h-11 rounded-[10px] px-2 text-base'
              type='date'
            />
          </div>
          {errorText ? (
            <p className='text-base text-red-600'>{errorText}</p>
          ) : (
            ""
          )}
          <div
            className={`flex flex-col mb-10 gap-y-2 md:flex-row w-full justify-around `}>
            <button
              onClick={updateCheck}
              disabled={!formData?.newStatus}
              className={`bg-THEME_PRIMARY_COLOR  flex items-center justify-center w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] ${
                !formData?.newStatus ? "opacity-50" : ""
              }`}>
              {loading ? <LoadingSpinner /> : " تأكيد"}
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
    </Modal>
  );
}
