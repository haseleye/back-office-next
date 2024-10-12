"use client";
import AddPayment from "@/components/AddPayment";
import BankCard from "@/components/BankCard";
import PaymentCard from "@/components/PaymentCard";
import UnitCard from "@/components/UnitCard";
import { useAppContext } from "@/context";
import { useState } from "react";
import AddContractModal from "./AddContract";

export default function Customers() {
  const [showUnitModal, setShowUnitModal] = useState(false);
  const { currentUser, selectedType } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {currentUser && selectedType.cat == 0 ? (
        <div className=' flex flex-col gap-6 items-center'>
          <div className='flex justify-between flex-wrap  gap-3 '>
            {selectedType.subCat == 0 ? (
              currentUser?.payments?.length ? (
                currentUser?.payments.map((item, index) => (
                  <PaymentCard payment={item} key={`payment_${index}`} />
                ))
              ) : (
                <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                  {" "}
                  لا يوجد مدفوعات
                </p>
              )
            ) : selectedType.subCat == 1 ? (
              currentUser?.bankChecks?.length ? (
                currentUser?.bankChecks.map((item, index) => (
                  <BankCard payment={item} key={`check_${index}`} />
                ))
              ) : (
                <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                  {" "}
                  لا يوجد شيكات
                </p>
              )
            ) : selectedType.subCat == 2 ? (
              currentUser?.units?.length ? (
                <>
                  {currentUser?.units.map((item, index) => (
                    <UnitCard
                      item={item}
                      setShowUnitModal={setShowUnitModal}
                      key={`unit_${index}`}
                    />
                  ))}
                  {showUnitModal ? (
                    <AddContractModal setShowUnitModal={setShowUnitModal} />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p className='text-THEME_SECONDARY_COLOR text-2xl text-semibold w-full text-center mt-4'>
                  {" "}
                  لا يوجد وحدات{" "}
                </p>
              )
            ) : (
              ""
            )}
            <AddPayment showModal={showModal} setShowModal={setShowModal} />
          </div>
          {selectedType.subCat == 2 ? (
            ""
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className='bg-THEME_PRIMARY_COLOR mb-[120px] md:mb-0 w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
              {selectedType.subCat == 0 ? "إضافة مدفوعات" : "إضافة شيكات"}
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
