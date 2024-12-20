"use client";
import { Modal } from "@/components/Modal";
import { useAppContext } from "@/context";
import { updateContract } from "@/network/auth";
import { getUserDetails } from "@/network/home";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./loading";

export default function UpdateContractModal({
  setUpdateContractModal,
  selectedUnit, unitIndex
}: {
  setUpdateContractModal: any;
  selectedUnit:string;
  unitIndex:number;
}) {
  const { currentUser, setCurrentUser } = useAppContext();
  const [form, setForm] = useState<{
    id: string | undefined;
    unitId: string | undefined;
    unitNumber: string | undefined;
    pdfFile: File | undefined;
  }>({
    id: undefined,
    unitId: undefined,
    unitNumber: currentUser?.units[unitIndex].unitNumber,
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
    let formData = new FormData();
    formData.set("id", currentUser?.info.id as string);
    formData.set(
      "unitId",
      form.unitId == "حجز جديد" ? "" : (form.unitId as string)
    );
    formData.set("unitNumber", form.unitNumber as string);
    formData.set("pdfFile", form.pdfFile as any);
    updateContract(formData)
      .then((response) => {
        setForm({
          id: undefined,
          unitId: undefined,
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
        showAlert("تم تعديل العقد بنجاح", "success");
        (document.getElementById("body") as any).style.overflow = "scroll";
        setUpdateContractModal?.(false);
      })
      .catch((error) => {
        setErrorText(error?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  return (
    <Modal setShowModal={setUpdateContractModal} isTopCentered={false}>
      <div className=' w-auto  min-w-full md:min-w-[600px] mt-10 '>
        <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
          <p className='text-base md:text-xl  text-white font-semibold'>
            {"تعديل العقد"}
          </p>
          <img
            src='/assets/close.png'
            className='w-5 h-5 cursor-pointer'
            width={20}
            onClick={() => {
              (document.getElementById("body") as any).style.overflow =
                "scroll";
              setUpdateContractModal(false);
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
                <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                  تاريخ العقد :
                </p>
                <span dir='ltr' className='font-normal text-lg'>
                  {new Date(currentUser?.units[unitIndex].contractDate as string)
                      .toLocaleDateString("en-AE", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })}
                </span>
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
                <p className='text-black hidden md:flex text-base md:text-xl font-semibold '>
                  رقم الوحدة :
                </p>
                <span dir='ltr' className='font-normal text-lg'>
                  {currentUser?.units[unitIndex].unitNumber}
                </span>
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
                  setForm({ ...form, pdfFile: e.target.files?.[0] as any });
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
                !form.unitId ||
                !form.unitNumber ||
                fileSizeError ||
                !currentUser
              }
              className={`bg-THEME_PRIMARY_COLOR flex items-center justify-center w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] ${
                !form?.pdfFile ||
                !form.unitId ||
                !form.unitNumber ||
                fileSizeError ||
                !currentUser
                  ? " opacity-50"
                  : ""
              }`}>
              {loading ? <LoadingSpinner /> : " تعديل"}
            </button>
            <button
              onClick={() => {
                (document.getElementById("body") as any).style.overflow = "scroll";
                setUpdateContractModal(false);
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
