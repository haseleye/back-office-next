"use client";;
import { Modal } from "@/components/Modal";
import { useAppContext } from "@/context";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import AddPaymentContent from "./AddPaymentContent";
import AddCheckContent from "./AddCheck";

export default function AddPayment({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal:any
}) {
  const isLoggedIn = getCookie("authToken");
  const router = useRouter();
  const { currentUser, selectedType, checks } = useAppContext();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
 


  return (
    <>
      {showModal ? (
        <Modal setShowModal={setShowModal} isTopCentered={true}>
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
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setShowModal(false);
                }}
                height={20}
              />
            </div>
            {selectedType.subCat == 0 ? (
              <>
                <div className='bg-white h-[450px] md:h-auto max-h-auto overflow-auto w-full p-6 pt-10  flex flex-col gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                  <AddPaymentContent
                    isModal={true}
                    setShowModal={setShowModal}
                  />
                </div>
              </>
            ) : (
              <AddCheckContent isModal={true} setShowModal={setShowModal} />
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
