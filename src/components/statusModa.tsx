import { useAppContext } from "@/context";
import { Modal } from "./Modal";
export default function StatusModal({ setShowStatus }: any) {
  const { currentUser } = useAppContext();

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
    </Modal>
  );
}
