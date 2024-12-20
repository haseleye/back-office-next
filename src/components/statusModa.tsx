"use client";
import { useAppContext } from "@/context";
import { Modal } from "./Modal";
import { unlockAccount } from "@/network/auth";
import {useState} from "react";
import {getUserDetails} from "@/network/home";
import {LoadingSpinner} from "@/components/loading";

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

export default function StatusModal({ setShowStatus }: any) {
  const {currentUser, setCurrentUser} = useAppContext();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  return (
    <Modal setShowModal={setShowStatus} isTopCentered={false}>
      <div className=' w-auto  min-w-full md:min-w-[600px] '>
        <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
          <p className='text-base md:text-lg text-white '>سبب تعليق الحساب</p>
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
          <div className='flex flex-col gap-3 md:gap-10 md:flex-row w-full justify-center'>
            <button
              onClick={() => {
                setLoading(true);
                unlockAccount(currentUser?.info.id as string)
                  .then(() => {
                    getUserDetails(currentUser?.info.mobile as string)
                      .then((response) => {
                        if (currentUser?.info.mobile) {
                          setCurrentUser((response.data as any)?.message);
                          showAlert("تم إزالة التعليق بنجاح", "success");
                          (document.getElementById("body") as any).style.overflow = "scroll";
                          setLoading(false);
                          setShowStatus(false);
                        }
                      })
                      .catch((err) => {
                      });
                  })
                  .catch((err) => {
                    setErrorText(err?.response?.data?.error);
                  })
              }}
              className={`bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px] flex items-center justify-center 
                ${currentUser?.info.status.login.nextTrial !== undefined &&
              currentUser?.info.status.login.nextTrial < new Date().toISOString() ? "hidden" : ""}`}>
              {loading ? <LoadingSpinner/> : " إزالة التعليق"}
            </button>
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
      </div>
    </Modal>
  );
}
