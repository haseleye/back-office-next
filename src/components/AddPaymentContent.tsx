import { useAppContext } from "@/context";
import { paymentMethods, paymentTypes } from "@/components/constants";
import { useMemo, useState } from "react";
import Select from "react-select";
import { addPayment } from "@/network/auth";
import { getUserDetails } from "@/network/home";
import { LoadingSpinner } from "./loading";

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
  const [formData, setFormData] = useState<FormTypes>({
    adviceDate: new Date().toISOString().split("T")[0],
    adviceTime: `00:00`,
    paymentType: undefined,
    paymentMethod: undefined,
    comments: "",
    amount: "",
    transactionNumber: "",
    unitId: undefined,
    id: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [typeError, setTypeError] = useState("");
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
    return [{ value: "حجز جديد", label: "حجز جديد" }, ...newArray];
  }, [currentUser]);
  function showAlert(message: string, type = "error", timeout = 3000) {
    const alertContainer = document.getElementById("alert-container");
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
    setLoading(true);
    let form = { ...formData };
    if (currentUser?.info.id) {
      form.id = currentUser?.info?.id;
    }
    addPayment({
      ...(form as any),
      adviceDate: `${formData.adviceDate}T${formData.adviceTime}`,
      unitId: formData?.unitId == "حجز جديد"?'':formData?.unitId,
    })
      .then((response) => {
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
        if (currentUser) {
          getUserDetails(currentUser?.info.mobile as string).then(
            (response) => {
              if (currentUser?.info.mobile) {
                setCurrentUser((response.data as any)?.message);
              }
            }
          );
        }
        showAlert("تم إضافة عملية الدفع", "success");

        window.scroll({ top: 0 });
        if (isModal) {
          (document.getElementById("body") as any).style.overflow = "scroll";
          setShowModal(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const paymentType = useMemo(() => {
    setTypeError("");
    if (!formData.unitId) return "";
    if (formData?.unitId == "حجز جديد") {
      setFormData({ ...formData, paymentType: "booking" });
      return paymentTypes?.[0]?.label;
    } else if (currentUser?.units?.length) {
      let unit = currentUser?.units?.filter(
        (item) => item.id == formData?.unitId
      );
      if (!unit?.[0]?.contractingDate) {
        setFormData({ ...formData, paymentType: "contracting" } as any);
        return paymentTypes?.[1]?.label;
      }
      if (!unit?.[0]?.contractDate && !unit?.[0]?.completionDate) {
        setFormData({ ...formData, paymentType: "cashing" } as any);
        return paymentTypes?.[2]?.label;
      } else {
        setTypeError(unit?.[0]?.info);
      }
    }
    return "";
  }, [formData?.unitId]);
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
              {currentUser
                ? `${currentUser?.info.firstName} ${currentUser?.info.lastName}`
                : "غير معلوم"}
            </span>
            <p className='text-black  md:hidden text-base md:text-xl font-semibold '>
              الهاتف المحمول :{" "}
              <span dir='ltr' className='font-normal text-lg'>
                {currentUser ? currentUser?.info.mobile : "غير معلوم"}
              </span>
            </p>
          </p>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>كود الحجز : </p>
            {currentUser ? (
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
            ) : (
              <p className='text-lg font-normal'>{"غير معلوم"}</p>
            )}
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <p className='text-xl font-medium'> القيمة : </p>

            <input
              className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
              type='text'
              value={formData?.amount}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value))
                  setFormData({ ...formData, amount: e.target.value } as any);
              }}
            />
            <p className='text-xl '> جنيه </p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>التاريخ : </p>

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
        </div>
        <div className='gap-5 flex flex-col'>
          <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
            الهاتف المحمول :{" "}
            <span dir='ltr' className='font-normal text-lg'>
              {currentUser ? currentUser?.info.mobile : "غير معلوم"}
            </span>
          </p>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-xl font-medium'>توجيه الدفع : </p>
            <p className='text-lg font-normal'>
              {currentUser ? paymentType : "غير معلوم"}
            </p>
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
      {/* {typeError ? <p className='text-red-600 text-base'>{typeError}</p> : ""} */}

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
            (currentUser && (!formData?.unitId || !formData?.paymentType)) ||
            !formData?.paymentMethod ||
            !formData.adviceTime ||
            !formData.adviceDate ||
            !formData?.amount ||
            !formData.transactionNumber
          }
          className={`bg-THEME_PRIMARY_COLOR w-full flex items-center justify-center md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] ${
            (currentUser && (!formData?.unitId || !formData?.paymentType)) ||
            !formData?.paymentMethod ||
            !formData.adviceTime ||
            !formData.adviceDate ||
            !formData?.amount ||
            !formData.transactionNumber
              ? "opacity-50"
              : ""
          }`}>
          {loading ? <LoadingSpinner /> : "          إضافة"}
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
