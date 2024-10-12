import { useAppContext } from "@/context";
import { paymentMethods, paymentTypes } from "@/components/constants";
import { useMemo, useState } from "react";
import Select from "react-select";
import { addPayment } from "@/network/auth";
import { getUserDetails } from "@/network/home";

interface FormTypes {
  unitId: undefined | string;
  paymentType: undefined | string;
  amount: undefined | string;
  paymentMethod: undefined | string;
  adviceDate: undefined | string;
  adviceTime: undefined | string;
  transactionNumber: undefined | string;
  comments: undefined | string;
  id: undefined | string;
}
export default function AddPaymentContent({
  isModal,
  setShowModal,
}: {
  isModal: boolean;
  setShowModal: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState<FormTypes>();
  const { currentUser, setCurrentUser } = useAppContext();
  const bookingCodes = useMemo(() => {
    let checks =
      currentUser?.bankChecks.map((item) => {
        return item.unitId;
      }) ?? [];
    let payments = currentUser?.payments.map((item) => item.unitId) ?? [];
    let newArray = [...(new Set([...checks, ...payments]) as any)];
    newArray = newArray
      .filter((item) => item != "")
      ?.sort((item1, item2) => item1?.split("/")[1] - item2?.split("/")[1]);
    newArray = newArray.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    return newArray;
  }, [currentUser]);
  function showAlert(message: string, type = "error", timeout = 3000) {
    const alertContainer = document.getElementById("alert-container");
    console.log("alertContainer", alertContainer);
    // Create the alert element
    const alert = document.createElement("div");
    alert.className = `alert alert.success`;
    alert.textContent = message;

    // Add the alert to the container
    alertContainer?.appendChild(alert);

    // Automatically remove the alert after the specified timeout
    setTimeout(() => {
      alertContainer?.removeChild(alert);
    }, timeout);
  }

  const onSubmit = () => {
   
    let form = { ...formData };
    if (currentUser?.info.id) {
      form.id = currentUser?.info?.id;
    }
    addPayment(form as any).then((response) => {
       setFormData({
         adviceDate: undefined,
         adviceTime: undefined,
         paymentType: undefined,
         paymentMethod: undefined,
         comments: "",
         amount: "",
         transactionNumber: "",
         unitId: undefined,
         id: undefined,
       });
      getUserDetails(currentUser?.info.mobile as string).then((response) => {
        if (currentUser?.info.mobile) {
          setCurrentUser((response.data as any)?.message);
        }
      });
        showAlert("تم إضافة عملية الدفع", "success");
        window.scroll({top:0})
    });
  };
   
  return (
      <>
    
      <div
        className={`flex   flex-col gap-3 ${
          isModal ? "md:gap-[80px]" : ""
        } md:flex-row w-full  ${
          isModal ? "justify-between" : "justify-around"
        }`}>
        <div className='gap-5 flex flex-col'>
          <p className='text-black text-base md:text-xl font-semibold'>
            الاسم :{" "}
            <span className='font-normal text-lg truncate'>
              {currentUser?.info.firstName} {currentUser?.info.lastName}
            </span>
            <p className='text-black  md:hidden text-base md:text-xl font-semibold '>
              الهاتف المحمول :{" "}
              <span dir='ltr' className='font-normal text-lg'>
                {currentUser?.info.mobile}
              </span>
            </p>
          </p>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>كود الحجز : </p>
            <div className='w-[230px]'>
              <Select
                noOptionsMessage={() => "لا يوجد  "}
                className={`basic-single  h-11 rounded-md  text-base border-none`}
                classNamePrefix='select'
                placeholder=''
                value={{
                  label: formData?.unitId,
                  value: formData?.unitId,
                }}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    unitId: value?.value as string,
                  } as any);
                }}
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
              value={formData?.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value } as any);
              }}
            />
            <p className='text-xl '> جنيه </p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>التاريخ : </p>

            <input
            value={formData?.adviceDate ?? (new Date()).toISOString().split('T')[0]}
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
        </div>
        <div className='gap-5 flex flex-col'>
          <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
            الهاتف المحمول :{" "}
            <span dir='ltr' className='font-normal text-lg'>
              {currentUser?.info.mobile}
            </span>
          </p>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>توجيه الدفع : </p>
            <div className='w-[143px]'>
              <Select
                className={`basic-single  h-11 rounded-md  text-base border-none`}
                classNamePrefix='select'
                placeholder=''
                isDisabled={false}
                isLoading={false}
                value={
                  formData?.paymentType
                    ? paymentTypes?.filter?.(
                        (item) => item.value == formData?.paymentType
                      )
                    : null
                }
                isClearable={false}
                isRtl={true}
                isSearchable={true}
                name='paymentType'
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    paymentType: value?.value,
                  } as any);
                }}
                options={paymentTypes}
              />
            </div>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>طريقة الدفع : </p>
            <div className='w-[143px]'>
              <Select
                className={`basic-single  h-11 rounded-md  text-base border-none`}
                classNamePrefix='select'
                isDisabled={false}
                isLoading={false}
                placeholder=''
                isClearable={false}
                isRtl={true}
                isSearchable={true}
                name='paymentMethod'
                options={paymentMethods}
                value={
                  formData?.paymentMethod
                    ? paymentMethods?.filter?.(
                        (item) => item.value == formData?.paymentMethod
                      )
                    : null
                }
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    paymentMethod: value?.value,
                  } as any);
                }}
              />
            </div>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>الوقت : </p>

            <input
              aria-label='time'
              className='bg-[#F2F0EF] w-[130px] h-11 rounded-md px-2 text-base'
              type='time'
              value={formData?.adviceTime}
              onChange={(e) => {
                setFormData({ ...formData, adviceTime: e.target.value } as any);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`${
          isModal
            ? "w-full"
            : "flex  flex-col gap-5   justify-between px-0 md:px-10 w-full md:w-[85%]"
        }`}>
        <div className='flex flex-row gap-1 items-center w-full'>
          <p className='text-xl font-medium min-w-[100px]'>رقم المعاملة : </p>
          <input
            className='bg-[#F2F0EF]  h-11  w-full rounded-md px-2 text-base'
            type='text'
            value={formData?.transactionNumber}
            onChange={(e) => {
              setFormData({
                ...formData,
                transactionNumber: e.target.value,
              } as any);
            }}
          />
        </div>
        <div className='flex flex-col gap-5 items-start w-full'>
          <p className='text-xl font-medium min-w-[100px]'>ملاحظات : </p>
          <textarea
            rows={5}
            className='bg-[#F2F0EF] p-1 h-[80px] outline-none  w-full rounded-md px-2 text-base'
            value={formData?.comments}
            onChange={(e) => {
              setFormData({
                ...formData,
                comments: e.target.value,
              } as any);
            }}
          />
        </div>
      </div>
      <div
        className={`flex flex-col gap-y-2 md:flex-row w-full justify-around ${
          isModal ? "" : "items-center"
        }`}>
        <button
          onClick={onSubmit}
          disabled={
            !formData?.adviceDate ||
            !formData?.amount ||
            !formData?.paymentMethod ||
            !formData.transactionNumber
          }
          className={`bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] ${
            !formData?.adviceDate ||
            !formData?.amount ||
            !formData?.paymentMethod ||
            !formData.transactionNumber
              ? "opacity-50"
              : ""
          }`}>
          إضافة
        </button>
        {isModal ? (
          <button
            onClick={() => {
              (document.getElementById("body") as any).style.overflow =
                "scroll";
              setShowModal(false);
            }}
            className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
            إلغاء
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
