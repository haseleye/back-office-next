"use client";
import { bankNames } from "@/components/constants";
import { useAppContext } from "@/context";
import { addCheck } from "@/network/auth";
import { getUserDetails } from "@/network/home";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { LoadingSpinner } from "./loading";
import { AddCheckBankImage } from "./profileImage";

export default function AddCheckContent({
  isModal,
  setShowModal,
}: {
  isModal?: boolean;
  setShowModal?: (value: boolean) => void;
}) {
  const isLoggedIn = getCookie("authToken");
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [typeError, setTypeError] = useState("");
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  const [fileSizeError, setFileSizeError] = useState(false);
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
    return [...newArray];
  }, [currentUser]);

  const [form, setForm] = useState<{
    id: string | undefined;
    unitId: string | undefined;
    number: string | undefined;
    dueDate: string | undefined;
    amount: string | undefined;
    bankName: string | undefined;
    image: File | undefined;
  }>({
    id: undefined,
    unitId: undefined,
    number: undefined,
    dueDate: new Date()?.toISOString()?.split("T")?.[0],
    amount: undefined,
    bankName: undefined,
    image: undefined,
  });

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

  const submit = () => {
    setErrorText("");
    setLoading(true);
    let formData = new FormData();
    formData.set("id", currentUser?.info.id as string);
    formData.set(
      "unitId",
      form.unitId == "حجز جديد" ? "" : (form.unitId as string)
    );
    formData.set("number", form.number as string);
    formData.set("dueDate", form.dueDate as string);
    formData.set("amount", form.amount as string);
    formData.set("bankName", form.bankName as string);
    formData.set("image", form.image as File);
    addCheck(formData)
      .then((response) => {
        setForm({
          id: undefined,
          unitId: undefined,
          number: undefined,
          dueDate: new Date()?.toISOString()?.split("T")?.[0],
          amount: undefined,
          bankName: undefined,
          image: undefined,
        });
        getUserDetails(currentUser?.info.mobile as string)
          .then((response) => {
            if (currentUser?.info.mobile) {
              setCurrentUser((response.data as any)?.message);
            }
          })
          .catch((error) => {});
        showAlert("تم إضافة الشيك بنجاح", "success");
        if (isModal) {
          (document.getElementById("body") as any).style.overflow = "scroll";
          setShowModal?.(false);
        }
      })
      .catch((error) => {
        setErrorText(error?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const unitIdIsWrong = useMemo(() => {
    const unit = currentUser?.units?.filter((item) => item.id == form?.unitId);
    if (!unit?.[0]?.contractDate && form?.unitId) return true;
    else return false;
  }, [form]);

  const paymentType = useMemo(() => {
    let unit = currentUser?.units?.filter((item) => item.id == form?.unitId);
    return unit?.[0]?.completionDate
      ? "لا يمكن إضافة شيك بنكي لهذه الوحدة حيث أنها مستوفاة القيمة الإجمالية"
      : null;
  }, [form?.unitId]);
  return (
    <>
      <div className='bg-white   w-full p-6 pt-10  flex flex-col gap-5 md:gap-7 rounded-b-lg items-center px-3 md:px-10 '>
        <div className='flex flex-col  gap-3 md:gap-[50px] md:flex-row w-full justify-around  '>
          <div className='gap-5 md:gap-7 flex flex-col'>
            <p className='text-black text-base md:text-xl font-semibold'>
              الاسم :{" "}
              <span className='font-normal text-lg truncate'>
                {currentUser?.info.firstName} {currentUser?.info.lastName}
              </span>
            </p>
            <p className='text-black md:hidden text-base md:text-xl font-semibold '>
              الهاتف المحمول :{" "}
              <span dir='ltr' className='font-normal text-lg'>
                {currentUser?.info.mobile}
              </span>
            </p>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row gap-1 items-center'>
                <p className='text-xl font-medium'>كود الحجز : </p>
                <div className='w-[230px]'>
                  <Select
                    noOptionsMessage={() => "لا يوجد  "}
                    className='basic-single  h-11 rounded-md  text-base border-none'
                    classNamePrefix='select'
                    placeholder=''
                    value={{
                      label: form?.unitId,
                      value: form?.unitId,
                    }}
                    onChange={(value) => {
                      setForm({
                        ...form,
                        unitId: value?.value as string,
                      } as any);
                    }}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={true}
                    isSearchable={false}
                    name='Codes'
                    options={bookingCodes}
                  />
                </div>
              </div>
              <p className='text-red-600  h-4'>
                {paymentType
                  ? paymentType
                  : unitIdIsWrong
                  ? "لا يمكن إضافة شيك بنكي إلا بعد توقيع العقد وتحديث بيانات العميل بذلك"
                  : ""}
              </p>
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
                  value={bankNames?.filter(
                    (item) => item.value == form.bankName
                  )}
                  onChange={(value) => {
                    setForm({ ...form, bankName: value?.value as string });
                  }}
                />
              </div>
            </div>
            <div className='flex flex-row w-full gap-1 items-center'>
              <p className='text-xl font-medium'>تاريخ الاستحقاق : </p>

              <input
                aria-label='Date'
                placeholder='يوم/شهر/سنة'
                value={form.dueDate}
                onChange={(e) => {
                  setForm({ ...form, dueDate: e.target.value });
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
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row gap-2 items-center'>
                <p className='text-xl font-medium'> القيمة : </p>

                <input
                  className='bg-[#F2F0EF] h-11  rounded-[10px] w-[105px] px-2 text-base'
                  type='tel'
                  value={form.amount}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value)) {
                      setForm({ ...form, amount: e.target.value } as any);
                    }
                  }}
                />
                <p className='text-xl '> جنيه </p>
              </div>
              <p className='text-red-600  h-4'></p>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <p className='text-xl font-medium'> رقم الشيك : </p>

              <input
                value={form?.number}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value))
                    setForm({ ...form, number: e.target.value } as any);
                }}
                className='bg-[#F2F0EF] h-11  rounded-[10px] w-[170px] px-2 text-base'
                type='text'
              />
            </div>
          </div>
        </div>

        <AddCheckBankImage form={form} setForm={setForm} />
        <p className='text-red-600 text-base'>
          {fileSizeError
            ? "الحد الأقصى لحجم الملف هو 1 ميجابايت"
            : errorText
            ? errorText
            : ""}
        </p>

        <div className='flex flex-col gap-y-2 md:flex-row w-full justify-center'>
          <button
            disabled={
              !form?.image ||
              !form.amount ||
              !form.bankName ||
              !form.unitId ||
              !form.unitId ||
              !form.number ||
              !form?.dueDate ||
              fileSizeError ||
              !currentUser ||
              unitIdIsWrong ||
              paymentType
                ? true
                : false
            }
            onClick={() => {
              (document.getElementById("body") as any).style.overflow =
                "scroll";
              submit();
            }}
            className={`bg-THEME_PRIMARY_COLOR w-full flex items-center justify-center md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]${
              !form?.image ||
              !form.amount ||
              !form.bankName ||
              !form.unitId ||
              !form.unitId ||
              !form.number ||
              !form.dueDate ||
              fileSizeError ||
              !currentUser ||
              unitIdIsWrong ||
              paymentType
                ? " opacity-50"
                : ""
            }`}>
            {loading ? <LoadingSpinner /> : " إضافة"}
          </button>
        </div>
      </div>
    </>
  );
}
