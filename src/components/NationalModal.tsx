import { useAppContext } from "@/context";
import { useState } from "react";
import { Modal } from "./Modal";
import { LoadingSpinner } from "./loading";
export const NationalModal = ({ setShowNational }:any) => {
 
  const {  currentUser } = useAppContext();
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
    setTimeout(() => {
      const a2 = document.createElement("a") as any;
      a2.href = currentUser?.info.identification?.nationalId?.front;
      a2.download = currentUser?.info.identification?.nationalId?.front
        .split("/")
        .pop();
      document.body.appendChild(a2);
      a2.click();
      document.body.removeChild(a2);
      setDownloadLoading(false);
    }, 1000);
  };
  return (
    <Modal
      setShowModal={setShowNational}
      isTopCentered={window.innerWidth > 768 ? false : true}>
      <div className=' w-auto  mt-4 md:mt-0'>
        <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
          <p className='text-base md:text-lg text-white '>بطاقة الرقم القومي</p>
          <img
            src='/assets/close.png'
            className='w-5 h-5 cursor-pointer'
            width={20}
            onClick={() => {
              (document.getElementById("body") as any).style.overflow =
                "scroll";

              setShowNational(false);
            }}
            height={20}
          />
        </div>
        <div className='bg-white w-full p-4 pt-3 md:pt-10  flex flex-col gap-3 md:gap-10 rounded-b-lg items-center'>
          <div className='flex  flex-col gap-3 md:gap-0 md:flex-row px-2 w-full md:px-6  justify-between'>
            <p className='text-black text-base md:text-lg '>
              الاسم :{" "}
              <span className='font-normal text-lg truncate'>
                {currentUser?.info.firstName} {currentUser?.info.lastName}
              </span>
            </p>
            <p className='text-black text-base md:text-lg  flex flex-row gap-1 '>
              الهاتف المحمول :{" "}
              <span dir='ltr' className='font-normal text-lg'>
                {currentUser?.info.mobile}
              </span>
            </p>
          </div>
          <div className='w-full flex flex-col md:flex-row gap-3'>
            <img
              src={currentUser?.info?.identification?.nationalId?.front}
              className='w-[350px] h-[220px]  rounded-lg '
            />
            <img
              src={currentUser?.info?.identification?.nationalId?.back}
              className='w-[350px] h-[220px]  rounded-lg'
            />
          </div>
          <div className='w-full flex flex-col md:flex-row gap-6   justify-center '>
            <button
              onClick={downloadImages}
              className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white flex flex-row items-center justify-center rounded-md h-[50px] min-h-[50px]'>
              {downloadLoading ? <LoadingSpinner /> : "تحميل"}
            </button>
            <button
              onClick={() => {
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setShowNational(false);
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
