"use client";
import AddCheckContent from "@/components/AddCheck";
import AddPaymentContent from "@/components/AddPaymentContent";
import { paymentTypes } from "@/components/constants";
import Customers from "@/components/customers";
import FindCheckContent from "@/components/FindCheckContent";
import FindPaymentType from "@/components/FindPaymentContent";
import { LoadingSpinner } from "@/components/loading";
import { useAppContext } from "@/context";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

interface FormTypes {
  unitId: undefined | string;
  paymentType: undefined | string;
}
export default function Home() {
  const isLoggedIn = getCookie("authToken");
  const router = useRouter();
  const { currentUser, selectedType, checks } = useAppContext();
  const [formData, setFormData] = useState<FormTypes>({
    paymentType: undefined,
    unitId: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [typeError, setTypeError] = useState("");
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

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

      if (
        !unit?.[0]?.contractDate &&
        !unit?.[0]?.completionDate &&
        !(unit?.[0]?.category == "نوع الوحدة لم يتحدد")
      ) {
        setFormData({ ...formData, paymentType: "cashing" } as any);

        return paymentTypes?.[2]?.label;
      } else {
        setTypeError(
          unit?.[0]?.category == "نوع الوحدة لم يتحدد"
            ? "يجب اختيار نوع الوحدة لهذا الحجز أولاً قبل إضافة مدفوعات جديدة"
            : unit?.[0]?.completionDate
            ? "هذه الوحدة مستوفاة القيمة الإجمالية ، لا يمكن أي دفع مبالغ مالية عليها الآن"
            : "هذه الوحدة تم إنهاء إجراءات التعاقد عليها ، لا يمكن دفع أي مبالغ مالية عليها الآن"
        );
      }
    }
    return "غير متاح";
  }, [formData?.unitId]);
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

  return (
    <div className=' mt-4 mb-3 '>
      {currentUser && selectedType.cat == 0 ? (
        <Customers />
      ) : selectedType.cat == 1 ? (
        <>
          {selectedType.subCat == 0 ? (
            <div className='bg-white mb-[80px] md:mb-0 md:h-auto max-h-auto  w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
              <AddPaymentContent isModal={false} setShowModal={() => {}} />
            </div>
          ) : selectedType?.subCat == 1 ? (
            <FindPaymentType />
          ) : selectedType?.subCat == 2 ? (
            <div className='flex  items-center flex-col gap-4'>
              <div className='flex flex-row justify-around items-center w-full mt-8'>
                <div>
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
                          isSearchable={false}
                          name='color'
                          options={bookingCodes}
                        />
                      </div>
                    ) : (
                      <p className='text-lg font-normal'>{"غير معلوم"}</p>
                    )}
                  </div>
                  {typeError ? (
                    <p
                      className={`min-h-6  md:absolute h-auto md:h-6 md:top-[100px] md:start-[85px]  text-red-600 text-center md:text-start`}>
                      {typeError}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='flex flex-row gap-1 items-center h-11'>
                  <p className='text-xl font-medium'>توجيه الدفع : </p>
                  <p className='text-lg font-normal'>
                    {currentUser ? (
                      paymentType == "غير متاح" ? (
                        <p className='text-red-600 text-base'>{paymentType}</p>
                      ) : (
                        paymentType
                      )
                    ) : (
                      "غير معلوم"
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {}}
                disabled={
                  !currentUser || !formData?.paymentType || !formData.unitId
                }
                className={`bg-THEME_PRIMARY_COLOR w-full flex items-center justify-center md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] ${
                  !currentUser || !formData?.paymentType || !formData.unitId
                    ? "opacity-50"
                    : ""
                }`}>
                {loading ? <LoadingSpinner /> : "إضافة"}
              </button>
            </div>
          ) : selectedType.subCat == 3 ? (
            <AddCheckContent />
          ) : selectedType.subCat == 4 ? (
            <FindCheckContent />
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
