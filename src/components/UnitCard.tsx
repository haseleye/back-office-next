"use client";
import { myUnit, Unit } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "./Modal";
import { getUnitTypes, selectUnitType } from "@/network/units";
import { LoadingSpinner } from "./loading";
import { useAppContext } from "@/context";
import { getUserDetails } from "@/network/home";

export default function UnitCard({
  item,
  setShowUnitModal,
}: {
  item: Unit;
  setShowUnitModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        id={item.id}
        className=' relative border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-4 md:px-6 md:pe-5  w-full md:w-[49%]  '>
        <div className='flex flex-row justify-between items-start'>
          <div className='flex flex-col gap-1'>
            <p className='text-[#048951]  text-sm md:text-lg font-semibold '>
              {item.category}
            </p>
            <p className='text-[#555F71]  text-sm md:text-lg flex flex-row items-center ltr:gap-6 rtl:gap-2.5 '>
              {"رقم الوحدة"}{" "}
              <span className='text-THEME_PRIMARY_COLOR'>
                {item.unitNumber}
              </span>
            </p>
          </div>
          {item?.contractingDate &&
          !item?.contractDate &&
          item?.category == "نوع الوحدة لم يتحدد" ? (
            <img
              src='/assets/edit2.svg'
              className='cursor-pointer '
              width={"32px"}
              height={"32px"}
              onClick={() => {
                setShowModal(true);
              }}
            />
          ) : item?.contractingDate &&
            !item?.contractDate &&
            item?.category != "نوع الوحدة لم يتحدد" ? (
            <img
              className='cursor-pointer'
              src='/assets/add_contract.svg'
              width={30}
              onClick={() => {
                setShowUnitModal(true);
              }}
            />
          ) : item?.contractDate ? (
            <a href={item?.contract?.pdfUrl} target='_blank'>
              <img
                src='/assets/contract.svg'
                className='cursor-pointer '
                width={30}
              />
            </a>
          ) : (
            ""
          )}
        </div>
        <div className='flex flex-row justify-between items-center'>
          <p className='mt-1 text-[#555F71] text-sm md:text-lg flex flex-row items-center rtl:gap-[21px] ltr:gap-2.5 '>
            {"كود الحجز"}{" "}
            <span className='text-THEME_PRIMARY_COLOR' dir='ltr'>
              {item.id}
            </span>
          </p>
        </div>
        <hr className='border-[0.5px]  my-2.5 md:my-5 md:block border-[#E5EAF4] w-full ' />

        <div className='flex flex-row gap-[55px] rtl:gap-6 '>
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"تاريخ الحجز"}
              </p>

              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {new Date(item.bookingDate)
                  ?.toLocaleDateString("en-AE", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })
                  ?.replaceAll("/", "-")}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"تاريخ العقد"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {item.contractDate
                  ? new Date(item.contractDate)
                      ?.toLocaleDateString("en-AE", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })
                      ?.replaceAll("/", "-")
                  : "لم يتم بعد"}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"إجمالي المدفوعات"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {Number(item.totalCashAmount).toLocaleString()} {"جنيه"}
              </p>
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"تاريخ دفعة التعاقد"}
              </p>

              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {item.contractingDate
                  ? new Date(item.contractingDate)
                      ?.toLocaleDateString("en-AE", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })
                      ?.replaceAll("/", "-")
                  : "لم يتم بعد"}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"سعر الوحدة"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {`${
                  item.totalAmount
                    ? `${item.totalAmount.toLocaleString()} ${"جنيه"}`
                    : "بعد اختيار الوحدة"
                }`}
              </p>
            </div>

            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {"إجمالي قيمة الشيكات"}
              </p>
              <p className=' text-xs md:text-base font-semibold  text-[#555F71]'>
                {`${
                  item.totalChecksAmount
                    ? `${item.totalChecksAmount.toLocaleString()} ${"جنيه"}`
                    : "لا يوجد شيكات"
                }`}
              </p>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal isTopCentered={true} setShowModal={setShowModal}>
          <SelectUnitModal
            closeModal={() => {
              setShowModal(false);
              (document.getElementById("body") as any).style.overflow =
                "scroll";
            }}
            unitId={item?.id}
          />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

const SelectUnitCard = ({
  unit,
  isSelected,
  onSelect,
  isActive,
}: {
  unit: myUnit;
  isSelected: boolean;
  onSelect: () => void;
  isActive: boolean;
}) => {
  return (
    <div
      onClick={() => {
        if (isActive) onSelect();
      }}
      className={`relative cursor-pointer border-[1px] border-solid ${
        !isActive ? "opacity-65" : ""
      } border-[#E5EAF4] w-full md:flex-1 rtl:px-6 ltr:px-6 pt-6 pb-6 rounded-2xl flex flex-col gap-6 ${
        isSelected ? "bg-THEME_PRIMARY_COLOR" : "bg-white"
      }`}>
      <div
        onClick={() => {
          if (isActive) onSelect();
        }}
        className={`w-7 h-7 absolute end-6 top-6 rounded-[20px] flex flex-row justify-center items-center border-[2px] ${
          isSelected ? " border-white" : " border-[#D1DAE6]"
        }  `}>
        {isSelected ? <p className='w-5 h-5  rounded-[20px] bg-white'></p> : ""}
      </div>

      <img
        src={`/assets/cat${unit.category.replace("category", "")}${
          isSelected ? "_inverted" : ""
        }.svg`}
        className='!w-[181px] !h-[36px] mt-5'
      />
      <div className='flex flex-col gap-2'>
        <p
          className={`text-xl font-semibold rtl:font-medium tracking-tight ${
            isSelected ? "text-white" : "text-THEME_PRIMARY_COLOR"
          } rtl:h-8 ltr:h-16`}>
          {unit.categoryName}
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {"دفعة الحجز"} :{" "}
          <span className='font-semibold rtl:font-medium'>
            {Number(unit.bookingAmount).toLocaleString()} {"جنيه"}
          </span>
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {"دفعة التعاقد"}
          <span className='font-semibold rtl:font-medium'>
            {Number(unit.contractingAmount).toLocaleString()} {"جنيه"}
          </span>
        </p>

        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {"أقساط"} :{" "}
          <span className='font-semibold rtl:font-medium tracking-tight'>
            {`${unit.installments.count} ${"أقساط"} ${"- قسط كل"} ${
              unit.installments.spanInMonths
            } ${"أشهر"}`}
          </span>
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {"قيمة القسط"} :{" "}
          <span className='font-semibold rtl:font-medium'>
            {Number(unit.installments.amount).toLocaleString()} {"جنيه"}
          </span>
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {" سعر الكاش"}
          <span className='font-semibold rtl:font-medium'>
            {Number(unit.cashAmount).toLocaleString()} {"جنيه"}
          </span>
        </p>
      </div>
    </div>
  );
};

const SelectUnitModal = ({
  closeModal,
  unitId,
}: {
  closeModal: VoidFunction;
  unitId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isCatSelected, setIsCatSelected] = useState(false);
  const { currentUser } = useAppContext();
  const [units, setUnits] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { setCurrentUser } = useAppContext();
  useEffect(() => {
    setLoading(true);
    getUnitTypes(unitId, currentUser?.info?.id as string).then((response) => {
      setLoading(false);
      setUnits(response.data.message.units);
      setSelectedType(
        response.data.message?.currentCategory?.replace("category", "") - 1
      );
    });
  }, []);
  const submit = () => {
    setButtonLoading(true);
    selectUnitType(
      unitId,
      units?.[selectedType as number]?.category,
      currentUser?.info?.id as string
    )
      .then((response) => {
        setButtonLoading(false);
        setIsCatSelected(true);
      })
      .catch((error) => {
        setButtonLoading(false);

        setError(error.response.data.error);
      });
  };
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

  return (
    <div className=' min-w-full  mt-10'>
      <div className='h-[56px] rounded-t-[4px] bg-THEME_PRIMARY_COLOR px-6 py-4 flex flex-row justify-between items-center'>
        <p className='font-semibold rtl:font-medium text-white text-base md:text-xl '>
          {"نوع الوحدة"}
        </p>
        <img
          src='/assets/close.png'
          onClick={() => {
            closeModal();
          }}
          className='w-4 h-4 cursor-pointer'
        />
      </div>
      <div className='w-full bg-white rounded-b-[4px] px-6  md:px-12  '>
        {!isCatSelected ? (
          <p className='text-center text-THEME_PRIMARY_COLOR text-xl md:text-3xl font-semibold rtl:font-medium  pt-5 pb-2  md:py-7'>
            {"اختر نوع الوحدة"}
          </p>
        ) : null}
        <div className=' min-h-[350px] h-[370px] overflow-scroll md:overflow-hidden md:h-auto  flex flex-col md:flex-row gap-7'>
          {isCatSelected ? (
            <div className='flex min-h-[350px] w-full flex-col justify-center items-center'>
              <img src='/assets/success.png' width={"200px"} height={"200px"} />
              <p className='my-6 md:my-3 text-[hsl(224,5%,48%)] text-lg w-full  md:w-1/2 text-center'>
                {"تم اختيار فئة وحدتك بنجاح"}
              </p>
            </div>
          ) : (
            <>
              {loading ? (
                <div className='h-[350px] w-full flex justify-center items-center'>
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {" "}
                  {units
                    .sort(
                      (a, b) =>
                        (a.category.replace("category", "") as any) -
                        (b.category.replace("category", "") as any)
                    )
                    ?.map((item, index: number) => (
                      <SelectUnitCard
                        key={`card_${index}`}
                        onSelect={() => {
                          setSelectedType(index);
                        }}
                        isSelected={selectedType == index}
                        unit={item}
                        isActive={item?.isActive}
                      />
                    ))}
                </>
              )}
            </>
          )}
        </div>
        <div className='w-full gap-3   flex flex-col gap items-center'>
          {isCatSelected ? (
            <button
              onClick={() => {
                setLoading(true);
                getUserDetails(currentUser?.info.mobile as string)
                  .then((response) => {
                    if (currentUser?.info.mobile) {
                      setCurrentUser((response.data as any)?.message);
                      closeModal();
                      setLoading(false);
                      showAlert("تم إضافة الشيك بنجاح", "success");
                    }
                  })
                  .catch((error) => {});
              }}
              className='w-full md:w-[181px] mb-6 mt-3 flex justify-center items-center rounded-lg h-12 disabled:opacity-40 bg-THEME_PRIMARY_COLOR text-white text-center'>
              {loading ? <LoadingSpinner /> : "اغلاق"}
            </button>
          ) : (
            <>
              {error != "" ? (
                <p className='mt-5 md:my-5 text-THEME_ERROR_COLOR text-lg w-full  md:w-1/2 text-center'>
                  {error}
                </p>
              ) : (
                <p className='mt-1 md:my-3 text-[#74777F] text-sm md:text-lg w-full  md:w-1/2 text-center'>
                  {"يمكنك تغيير نوع الوحدة طالما لم يتم إنهاء إجراءات التعاقد."}
                </p>
              )}
              <div className='mb-6 w-full flex justify-end'>
                <button
                  onClick={submit}
                  disabled={selectedType == null || buttonLoading}
                  className='w-full md:w-[181px]  flex justify-center items-center rounded-lg h-12 disabled:opacity-40 bg-THEME_PRIMARY_COLOR text-white text-center'>
                  {buttonLoading ? <LoadingSpinner /> : "حفظ"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
