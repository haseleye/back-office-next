"use client";
import { Modal } from "@/components/Modal";
import { useAppContext } from "@/context";
import { addContract } from "@/network/auth";
import { getUserDetails } from "@/network/home";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./loading";

export default function AddContractModal({
  setShowUnitModal,
  selectedUnit,
}: {
  setShowUnitModal: any;
  selectedUnit:string
}) {
  const { currentUser, setCurrentUser } = useAppContext();
  const [form, setForm] = useState<{
    id: string | undefined;
    unitId: string | undefined;
    unitNumber: string | undefined;
    contractData: string | undefined;
    pdfFile: File | undefined;
  }>({
    id: undefined,
    unitId: undefined,
    unitNumber: undefined,
    contractData: new Date()?.toISOString()?.split("T")?.[0],
    pdfFile: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [fileSizeError, setFileSizeError] = useState(false);

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
  useEffect(() => {
    setForm({ ...form, unitId: selectedUnit });
  }, [selectedUnit]);
  const submit = () => {
    setErrorText("");
    setLoading(true);
    console.log("form", form);
    let formData = new FormData();
    formData.set("id", currentUser?.info.id as string);
    formData.set(
      "unitId",
      form.unitId == "حجز جديد" ? "" : (form.unitId as string)
    );
    formData.set("unitNumber", form.unitNumber as string);
    formData.set("contractData", form.contractData as string);
    formData.set("pdfFile", form.pdfFile as File);
    addContract(formData)
      .then((response) => {
        setForm({
          id: undefined,
          unitId: undefined,
          contractData: new Date()?.toISOString()?.split("T")?.[0],
          unitNumber: undefined,
          pdfFile: undefined,
        });
        getUserDetails(currentUser?.info.mobile as string)
          .then((response) => {
            if (currentUser?.info.mobile) {
              setCurrentUser((response.data as any)?.message);
            }
          })
          .catch((error) => {});
        showAlert("تم إضافة العقد بنجاح", "success");
        (document.getElementById("body") as any).style.overflow = "scroll";
        setShowUnitModal?.(false);
      })
      .catch((error) => {
        setErrorText(error?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log("");
  console.log(
    "adsdasd",
    !form?.pdfFile ||
      !form.contractData ||
      !form.unitId ||
      !form.unitNumber ||
      fileSizeError ||
      !currentUser
  );
  return (
    <Modal setShowModal={setShowUnitModal} isTopCentered={false}>
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
              (document.getElementById("body") as any).style.overflow =
                "scroll";
              setShowUnitModal(false);
            }}
            height={20}
          />
        </div>
        <div className='bg-white h-[450px] md:h-auto max-h-auto overflow-auto w-auto p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
          <div className='flex flex-col  gap-3 md:gap-[40px] md:flex-row w-full   '>
            <div className='gap-5 flex flex-col'>
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

              <div className='flex flex-row w-full gap-1 items-center'>
                <p className='text-xl font-medium'>تاريخ العقد : </p>

                <input
                  aria-label='Date'
                  placeholder='يوم/شهر/سنة'
                  value={form.contractData}
                  onChange={(e) => {
                    setForm({ ...form, contractData: e.target.value });
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
                <p className='text-xl font-medium'> رقم الوحدة : </p>

                <input
                  className='bg-[#F2F0EF] h-11  rounded-[10px] w-[170px] px-2 text-base'
                  type='text'
                  value={form.unitNumber}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setForm({ ...form, unitNumber: e.target.value } as any);
                  }}
                />
              </div>
            </div>
          </div>
          <label className='file-upload'>
            <input
              type='file'
              accept='application/pdf'
              onChange={(e) => {
                let file = e.target.files?.[0];
                if ((file?.size as any) > 1 * 1024 * 1024)
                  setFileSizeError(true);
                else {
                  setForm({ ...form, pdfFile: file as any });
                  setFileSizeError(false);
                }
              }}
            />
            <span>
              {form?.pdfFile
                ? (form.pdfFile as any)?.name
                : "تحميل ملف ال PDF الخاص بالعقد "}
            </span>
            <img src='/assets/upload_pdf.svg' width={30} alt='Upload Icon' />
          </label>
          <p className='text-red-600 text-base'>
            {fileSizeError
              ? "الحد الأقصى لحجم الملف هو 1 ميجابايت"
              : errorText
              ? errorText
              : ""}
          </p>
          <div className='flex flex-col gap-y-2 md:flex-row w-full justify-around'>
            <button
              onClick={() => {
                submit();
              }}
              disabled={
                !form?.pdfFile ||
                !form.contractData ||
                !form.unitId ||
                !form.unitNumber ||
                fileSizeError ||
                !currentUser
              }
              className={`bg-THEME_PRIMARY_COLOR flex items-center justify-center w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] ${
                !form?.pdfFile ||
                !form.contractData ||
                !form.unitId ||
                !form.unitNumber ||
                fileSizeError ||
                !currentUser
                  ? " opacity-50"
                  : ""
              }`}>
              {loading ? <LoadingSpinner /> : " إضافة"}
            </button>
            <button
              onClick={() => {
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setShowUnitModal(false);
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
