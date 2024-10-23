import { useAppContext } from "@/context";
import { useState } from "react";
import { Modal } from "./Modal";
import { LoadingSpinner } from "./loading";
export const BankModal = ({ setShowModal, img }: any) => {
  const { currentUser } = useAppContext();
  const [downloadLoading, setDownloadLoading] = useState(false);

  const downloadImages = () => {
    setDownloadLoading(true);
    const a = document.createElement("a") as any;
    a.href = currentUser?.info.identification?.nationalId?.back;
    a.download = currentUser?.info.identification?.nationalId?.back
      .split("/")
      .pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadLoading(false);
  };
  return (
    <Modal
      setShowModal={setShowModal}
      isTopCentered={window.innerWidth > 768 ? false : true}>
      <div className=' w-auto  mt-4 md:mt-0'>
        <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
          <p className='text-base md:text-lg text-white '> صورة الشيك </p>
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
        <div className='bg-white w-full p-4 pt-3 md:pt-10  flex flex-col gap-3 md:gap-10 rounded-b-lg items-center'>
          <img src={img} className='w-[650px] h-[290px]  rounded-lg ' />

          <div className='w-full flex flex-col md:flex-row gap-6   justify-between px-10 '>
            <button
              onClick={downloadImages}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white flex flex-row items-center justify-center rounded-md h-[50px] min-h-[50px]'>
              {downloadLoading ? <LoadingSpinner /> : "تحميل"}
            </button>
            <button
              onClick={() => {
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setShowModal(false);
              }}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
