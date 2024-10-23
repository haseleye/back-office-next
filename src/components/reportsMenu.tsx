import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { createChecksReport, createPaymentsReport, createSalesReport } from "@/network/auth";
import { LoadingSpinner } from "./loading";
import Select from "react-select";
import { Accordion } from "./utilsComponents";
import DownloadPDF from "./font";
import { ChecksReport } from "./checksReport";
export default function ReportsMenu() {
  const [errorText, setErrorText] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [paymentReport, setPaymentReport] = useState<any>();
  const { selectedType } = useAppContext();
  const [reportForm, setReportForm] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
    selected: "all",
  });

  useEffect(() => {
    setErrorText("");
    setReportForm({
      from: new Date().toISOString().split("T")[0],
      to: new Date().toISOString().split("T")[0],
      selected: "all",
    });
    setPaymentReport(undefined);
  }, [selectedType]);
  const { downloadPDF } = DownloadPDF(reportForm, paymentReport);

  const onButtonClick = () => {
    setReportLoading(true);
    if (selectedType.subCat == 1) {
      createChecksReport(reportForm.from, reportForm.to)
        .then((response) => {
          console.log("RESPONSE", response);
          setPaymentReport(response.data?.message?.report);
        })
        .catch((error) => {})
        .finally(() => {
          setReportLoading(false);
        });
    } else if (selectedType?.subCat == 2)
    {
        createSalesReport(reportForm.from, reportForm.to)
          .then((response) => {
            setPaymentReport(response.data?.message?.report);
          })
          .catch((error) => {})
          .finally(() => {
            setReportLoading(false);
          });
    }
    else {
      createPaymentsReport(reportForm.from, reportForm.to)
        .then((response) => {
          console.log("RESPONSE", response);
          setPaymentReport(response.data?.message?.report);
        })
        .catch((error) => {})
        .finally(() => {
          setReportLoading(false);
        });
    }
  };
  return (
    <>
      <div className='bg-THEME_SECONDARY_COLOR p-3 md:px-10 md:py-6 gap-[50px] md:gap-3 flex flex-col rounded-lg    w-full'>
        <div className=' p-3 flex flex-col md:flex-row  items-start gap-3 md:gap-[60px]  w-full h-[120px] rounded-[10px]'>
          <div className='flex  items-center gap-3 md:gap-[20px] '>
            <img
              src='/assets/search_white.svg'
              className='w-5 md:w-[30px] h-5 md:h-[30px]'
            />
          </div>
          <div className='w-full flex flex-col gap-5'>
            <div className='flex flex-row w-full gap-[70px] items-center'>
              <div className='flex flex-row gap-1 items-center justify-between w-[300px]'>
                <p className='text-xl font-medium text-white'>الفترة من : </p>

                <input
                  value={
                    reportForm?.from ?? new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    setReportForm({
                      ...reportForm,
                      from: e.target.value,
                    } as any);
                  }}
                  className='bg-[#F2F0EF] w-[215px]  h-11 rounded-[10px] px-2 text-base'
                  type='date'
                  max={new Date().toISOString()?.split("T")?.[0]}
                  onKeyDown={(e) => e.preventDefault()} // Disable typing
                />
              </div>
              <div className='flex flex-row gap-1 items-center justify-between w-[300px]'>
                <p className='text-xl font-medium text-white'>إلى : </p>

                <input
                  value={
                    reportForm?.to ?? new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    setReportForm({
                      ...reportForm,
                      to: e.target.value,
                    } as any);
                  }}
                  className='bg-[#F2F0EF] w-[230px]  h-11 rounded-[10px] px-2 text-base'
                  type='date'
                  max={new Date().toISOString()?.split("T")?.[0]}
                  onKeyDown={(e) => e.preventDefault()} // Disable typing
                />
              </div>
            </div>
            <div
              className={`flex flex-row w-full gap-[140px] items-center ${
                selectedType?.subCat != 0 ? "ms-[260px]" : ""
              }`}>
              {" "}
              {selectedType.subCat != 0 ? (
                ""
              ) : (
                <div className='flex flex-row gap-1 items-center justify-between w-[300px]'>
                  <p className='text-xl font-medium text-white'>النوع : </p>

                  <div className='w-[215px]'>
                    <Select
                      noOptionsMessage={() => "لا يوجد  "}
                      className={`basic-single  h-11 rounded-md  text-base border-none`}
                      classNamePrefix='select'
                      placeholder=''
                      value={
                        [
                          { label: "الكل", value: "all" },
                          {
                            label: "الإيداعات البنكية",
                            value: "bankDeposit",
                          },
                          {
                            label: "التحويلات البنكية",
                            value: "bankTransfer",
                          },
                          { label: "أنستاباي", value: "instaPay" },
                          {
                            label: "بطاقات الائتمان",
                            value: "creditCard",
                          },
                        ]?.filter(
                          (item) => item?.value == reportForm.selected
                        )?.[0]
                      }
                      onChange={(value) => {
                        setReportForm({
                          ...reportForm,
                          selected: value?.value as string,
                        } as any);
                      }}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={true}
                      isSearchable={false}
                      name='color'
                      options={[
                        { label: "الكل", value: "all" },
                        {
                          label: "الإيداعات البنكية",
                          value: "bankDeposit",
                        },
                        {
                          label: "التحويلات البنكية",
                          value: "bankTransfer",
                        },
                        { label: "أنستاباي", value: "instaPay" },
                        {
                          label: "بطاقات الائتمان",
                          value: "creditCard",
                        },
                      ]}
                    />
                  </div>
                </div>
              )}
              <div className={`flex flex-row gap-1 items-center justify-end `}>
                <button
                  className=' h-11 bg-white rounded-lg w-[230px] flex items-center justify-center '
                  onClick={onButtonClick}>
                  {reportLoading ? <LoadingSpinner primary /> : "بحث"}
                </button>
              </div>
            </div>
            <p className='text-base text-red-600 mt-1 h-6'>
              {errorText ? errorText : ""}
            </p>
          </div>
        </div>
      </div>
      {paymentReport ? (
        <>
          {selectedType.subCat == 1 ? (
            <ChecksReport paymentReport={paymentReport} download={downloadPDF} />
          ) : selectedType.subCat == 2 ? (
            <div className='flex flex-col gap-12 mt-20 ps-20'>
              <p className='text-lg'>
                عدد الحجوزات الجديدة:{" "}
                <span className='font-semibold'>
                  {paymentReport?.bookingCount}
                </span>
              </p>
              <p className='text-lg'>
                عدد دفعات التعاقد:{" "}
                <span className='font-semibold'>
                  {paymentReport?.contractingCount}
                </span>
              </p>
              <p className='text-lg'>
                {" "}
                عدد العقود:{" "}
                <span className='font-semibold'>
                  {paymentReport?.contractsCount}
                </span>{" "}
                (وحدات وسطية:{" "}
                <span className='font-semibold'>
                  {paymentReport?.middlesCount}
                </span>{" "}
                - وحدات طرفية:{" "}
                <span className='font-semibold'>
                  {paymentReport?.cornersCount}
                </span>{" "}
                - وحدات طرفية على الشارع:{" "}
                <span className='font-semibold'>
                  {paymentReport?.streetCornersCount}
                </span>
                )
              </p>
              <div className='w-full flex flex-row justify-center'>
                <button
                  onClick={downloadPDF}
                  className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                  حفظ
                </button>
              </div>
            </div>
          ) : (
            <Accordion
              reportForm={reportForm}
              paymentReport={paymentReport}
              handleDownload={downloadPDF}
            />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
