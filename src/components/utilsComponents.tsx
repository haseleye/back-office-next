import { useState } from "react";
import { Transition } from "@headlessui/react";
import PieChart from "./chart";
export const AccordionItem = ({ title, body, isTotal }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full bg-[#d9d9d940] shadow-lg rounded-lg overflow-hidden  ${
        isOpen ? "pb-5" : ""
      }`}>
      <div className=' border-gray-200'>
        <button
          className='w-full text-left p-4 focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}>
          <div className='flex gap-3 items-center'>
            <span className='w-[35px] h-[35px]  flex justify-center text-2xl items-center  rounded-sm border-[1px] border-solid border-[#D9D9D9]'>
              {isOpen ? "-" : "+"}
            </span>
            <h2 className='font-semibold text-xl'>{title}</h2>
          </div>
        </button>
        <Transition
          show={isOpen}
          enter='transition-all duration-300 ease-in-out'
          enterFrom='max-h-0 opacity-0'
          enterTo='max-h-screen opacity-100'
          leave='transition-all duration-300 ease-in-out'
          leaveFrom='max-h-screen opacity-100'
          leaveTo='max-h-0 opacity-0'>
          <div className='flex flex-row gap-[50px] ps-10'>
            <div className='flex flex-col gap-5'>
              {isTotal ? (
                <div className='flex flex-row gap-[40px] items-center px-5 pt-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#009999] text-[#009999]'> t</p>
                      <p className='text-base'>بطاقات الائتمان </p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.creditCard?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#999900] text-[#999900]'> t</p>
                      <p className='text-base'>الإيداعات البنكية </p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.bankDeposit?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#990099] text-[#990099]'> t</p>
                      <p className='text-base'>التحويلات البنكية </p>
                    </div>

                    <p className='text-lg'>
                      {Number(
                        body?.bankTransfer?.amount ?? 0
                      )?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#990000] text-[#990000]'> t</p>
                      <p className='text-base'>إنستاباي </p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.instaPay?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div className='flex flex-row gap-[70px] items-center px-5 pt-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#2196F3] text-[#2196F3]'> t</p>
                      <p className='text-base'>دفعات الحجز</p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.booking?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#FFC107] text-[#FFC107]'> t</p>
                      <p className='text-base'>دفعات التعاقد</p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.contracting?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <p className='w-5 h-5 bg-[#4CAF50] text-[#4CAF50]'> t</p>
                      <p className='text-base'>الدفع النقدي</p>
                    </div>

                    <p className='text-lg'>
                      {Number(body?.cashing?.amount ?? 0)?.toLocaleString()}{" "}
                      <strong>جنيه</strong>
                    </p>
                  </div>
                </div>
              )}
              <p className='text-xl px-5'>
                القيمة الإجمالية :{" "}
                {Number(
                  isTotal
                    ? body?.bankDeposit?.amount +
                        body?.bankTransfer?.amount +
                        body?.instaPay?.amount +
                        body?.creditCard?.amount
                    : body?.booking?.amount +
                        body?.contracting?.amount +
                        body?.cashing?.amount
                )?.toLocaleString()}
                {" جنيه "}
              </p>
            </div>
            <PieChart
              isTotal={isTotal}
              percents={
                isTotal
                  ? [
                      body?.bankDeposit?.percent,
                      body?.bankTransfer?.percent,
                      body?.instaPay?.percent,
                      body?.creditCard?.percent,
                    ]
                  : [
                      body?.booking?.percent,
                      body?.contracting?.percent,
                      body?.cashing?.percent,
                    ]
              }
            />
          </div>
        </Transition>
      </div>
    </div>
  );
};

export const Accordion = ({
  reportForm,
  paymentReport,
  handleDownload,
}: any) => {
  return (
    <div className='flex flex-col gap-4 w-full px-10 pt-5'>
      {reportForm?.selected == "all" || reportForm.selected == "creditCard" ? (
        <AccordionItem
          isExpanded={true}
          title={`مدفوعات بطاقات الائتمان (عدد المعاملات: ${paymentReport?.creditCard?.count})`}
          body={paymentReport?.creditCard}
        />
      ) : (
        ""
      )}
      {reportForm?.selected == "all" || reportForm.selected == "bankDeposit" ? (
        <AccordionItem
          title={`مدفوعات الإيدعات البنكية (عدد المعاملات: ${paymentReport?.bankDeposit?.count})`}
          body={paymentReport?.bankDeposit}
        />
      ) : (
        ""
      )}
      {reportForm?.selected == "all" ||
      reportForm.selected == "bankTransfer" ? (
        <AccordionItem
          title={`مدفوعات التحويلات البنكية  (عدد المعاملات: ${paymentReport?.bankTransfer?.count})`}
          body={paymentReport?.bankTransfer}
        />
      ) : (
        ""
      )}
      {reportForm?.selected == "all" || reportForm.selected == "instaPay" ? (
        <AccordionItem
          title={`مدفوعات تحويلات أنستاباي (عدد المعاملات: ${paymentReport?.instaPay?.count})`}
          body={paymentReport?.instaPay}
        />
      ) : (
        ""
      )}

      {reportForm?.selected == "all" ? (
        <AccordionItem
          title={`المدفوعات الإجمالية (عدد المعاملات: ${paymentReport?.total?.count})`}
          body={paymentReport?.total}
          isTotal={true}
        />
      ) : (
        ""
      )}
      <div className="w-full flex flex-row justify-center">
        <button
          onClick={handleDownload}
          className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
          حفظ
        </button>
      </div>
    </div>
  );
};
