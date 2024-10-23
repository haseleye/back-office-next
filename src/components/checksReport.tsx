import { useState } from "react";
import PieChart from "./chart";
import { Modal } from "./Modal";

export const ChecksReport = ({ paymentReport, download, reportFrom }: any) => {
  
  const [showModal, setShowModal] = useState("");
  console.log("showModal", reportFrom);
  const downloadItems = async () => {
    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;
    const response = await fetch("/fonts/Amiri-Regular.ttf");
    const fontArrayBuffer = await response.arrayBuffer();
    const fontBase64 = Buffer.from(fontArrayBuffer).toString("base64");
    pdfMake.fonts = {
      Amiri: {
        normal: "Amiri-Regular.ttf",
      },
    };
    pdfMake.vfs = {
      ...pdfFonts.pdfMake.vfs,
      "Amiri-Regular.ttf": fontBase64,
    };
    let header: any = (
      showModal == "outstanding"
        ? "شيكات تحت التحصيل "
        : showModal == "cleared"
        ? "شيكات محصلة"
        : showModal == "rejected"
        ? "شيكات مرفوضة "
        : showModal == "cashed"
        ? "شيكات مستبدلة بالنقد "
        : ""
    )?.split(" ");
    header = header.reverse()?.toString()?.replaceAll(",", " ");
    let header2: any = ` في الفترة من ${`${reportFrom?.from} `} ${"إلى"} ${
      reportFrom?.to
    } `?.split(" ");
    header2 = header2.reverse()?.toString()?.replaceAll(",", " ");

    const contentItems: any[] = [
      {
        text: header, // Arabic text
        alignment: "center", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      },
      {
        text: header2, // Arabic text
        alignment: "center", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      },
      {
        text: ' ', // Arabic text
        alignment: "center", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      },
    ];

    paymentReport?.[showModal]?.checks?.map((item: any) => {
      let text1: any = item?.userName?.split(" ");
      text1 = text1.reverse()?.toString()?.replaceAll(",", " ");
      contentItems?.push({
        text: text1, // Arabic text
        alignment: "right", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      });
      let text2: any = `الهاتف المحمول: ${item?.mobileNumber?.replace(
        "+2",
        ""
      )} `?.split(" ");
      text2 = text2.reverse()?.toString()?.replaceAll(",", " ");
      contentItems?.push({
        text: text2, // Arabic text
        alignment: "right", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      });
      let text3: any = `اسم البنك:   ${item?.bankName}`?.split(" ");
      text3 = text3.reverse()?.toString()?.replaceAll(",", " ");
      contentItems?.push({
        text: text3, // Arabic text
        alignment: "right", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      });
      let text4: any = `رقم الشيك: ${item?.checkNumber}`?.split(" ");
      text4 = text4.reverse()?.toString()?.replaceAll(",", " ");
      contentItems?.push({
        text: text4, // Arabic text
        alignment: "right", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      });

      let text5: any = `تاريخ الاستحقاق: ${
        item?.dueDate?.split("T")?.[0]
      }`?.split(" ");
      text5 = text5.reverse()?.toString()?.replaceAll(",", " ");
      contentItems?.push({
        text: text5, // Arabic text
        alignment: "right", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      });
      let text6: any = `القيمة: ${item?.amount} جنيه`?.split(" ");
      text6 = text6.reverse()?.toString()?.replaceAll(",", " ");
      contentItems?.push({
        text: text6, // Arabic text
        alignment: "right", // Align the text to the right for RTL display
        fontSize: 16,
        font: "Amiri",
        direction: "rtl",
      });
       contentItems?.push({
         text: '  ', // Arabic text
         alignment: "right", // Align the text to the right for RTL display
         fontSize: 16,
         font: "Amiri",
         direction: "rtl",
       });
    });
   

    const docDefinition = {
      content: contentItems,
      defaultStyle: {
        font: "Amiri",
      },
    };
     let dateTime:any = new Date().toISOString();
     dateTime = dateTime
       ?.split("T")?.[0]
       ?.split("-")
       ?.reverse()
       ?.toString(",")
       ?.replaceAll(",", "-");
     const time = `${new Date().toLocaleTimeString()?.split(":")?.[0]}-${
       new Date().toLocaleTimeString()?.split(":")[1]
     }_${new Date().toLocaleTimeString()?.split(" ")?.[1]}`;
     pdfMake
       .createPdf(docDefinition)
       .download(
         `${
           showModal == "outstanding"
             ? "outstanding-checks"
             : showModal == "cleared"
             ? "cleared-checks"
             : showModal == "rejected"
             ? "rejected-checks "
             : showModal == "cashed"
             ? "cashed-checks "
             : ""
         }_${dateTime}_${time}.pdf`
       );
  };
  return (
    <>
      <div>
        <div className='flex flex-row w-full justify-between  mt-6 items-center px-10'>
          <div className='flex flex-col gap-[100px] w-[400px]'>
            <div
              onClick={() => {
                if (paymentReport?.cleared?.checks?.length)
                  setShowModal("cleared");
              }}
              className='bg-[#D9D9D9] cursor-pointer rounded-ee-3xl p-4 min-w-[300px]'>
              <div className='flex flex-row gap-1.5 pb-2'>
                <p className='w-5 h-5 bg-[#009999] text-[#009999]'>{"t"}</p>
                <p className='text-xl font-medium'>شيكات محصلة</p>
              </div>
              <p className='text-xl ms-5 py-2 pt-3'>
                القيمة:{" "}
                <span className='font-medium'>
                  {Number(paymentReport?.cleared?.amount)?.toLocaleString()}{" "}
                  جنيه
                </span>
              </p>
              <p className='text-xl ms-5 py-2'>
                عدد الشيكات:{" "}
                <span className='font-medium'>
                  {" "}
                  {paymentReport?.cleared?.count}
                </span>
              </p>
            </div>
            <div
              onClick={() => {
                if (paymentReport?.outstanding?.checks?.length)
                  setShowModal("outstanding");
              }}
              className='bg-[#D9D9D9] cursor-pointer rounded-se-3xl p-4  min-w-[300px]'>
              <div className='flex flex-row gap-1.5 pb-2'>
                <p className='w-5 h-5 bg-[#990000] text-[#990000]'>{"t"}</p>
                <p className='text-xl font-medium'>شيكات تحت التحصيل </p>
              </div>
              <p className='text-xl ms-5 py-2 pt-3'>
                القيمة:{" "}
                <span className='font-medium'>
                  {Number(paymentReport?.outstanding?.amount)?.toLocaleString()}{" "}
                  جنيه
                </span>
              </p>
              <p className='text-xl ms-5 py-2 pt-3'>
                عدد الشيكات:{" "}
                <span className='font-medium'>
                  {" "}
                  {paymentReport?.outstanding?.count}
                </span>
              </p>
            </div>
          </div>
          <PieChart
            isLarge={true}
            percents={[
              paymentReport?.rejected?.amount,
              paymentReport?.cashed?.amount,
              paymentReport?.outstanding?.amount,
              paymentReport?.cleared?.amount,
            ]}
            isTotal={true}
          />

          <div className='flex flex-col gap-[100px] w-[400px]'>
            <div
              onClick={() => {
                if (paymentReport?.rejected?.checks?.length)
                  setShowModal("rejected");
              }}
              className='bg-[#D9D9D9] cursor-pointer rounded-es-3xl p-4  min-w-[300px]'>
              <div className='flex flex-row gap-1.5 pb-2'>
                <p className='w-5 h-5 bg-[#999900] text-[#999900]'>{"t"}</p>
                <p className='text-xl font-medium'>شيكات مرفوضة </p>
              </div>
              <p className='text-xl ms-5 py-2 pt-3'>
                القيمة:{" "}
                <span className='font-medium'>
                  {Number(paymentReport?.rejected?.amount)?.toLocaleString()}{" "}
                  جنيه
                </span>
              </p>
              <p className='text-xl ms-5 py-2'>
                عدد الشيكات:{" "}
                <span className='font-medium'>
                  {" "}
                  {paymentReport?.rejected?.count}
                </span>
              </p>
            </div>
            <div
              onClick={() => {
                if (paymentReport?.cashed?.checks?.length)
                  setShowModal("cashed");
              }}
              className='bg-[#D9D9D9] cursor-pointer rounded-ss-3xl p-4  min-w-[300px]'>
              <div className='flex flex-row gap-1.5 pb-2'>
                <p className='w-5 h-5 bg-[#990099] text-[#990099]'>{"t"}</p>
                <p className='text-xl font-medium'>شيكات مستبدلة بالنقد </p>
              </div>
              <p className='text-xl ms-5 py-2'>
                القيمة:{" "}
                <span className='font-medium'>
                  {Number(paymentReport?.cashed?.amount)?.toLocaleString()} جنيه
                </span>
              </p>
              <p className='text-xl ms-5 py-2'>
                عدد الشيكات:{" "}
                <span className='font-medium'>
                  {" "}
                  {paymentReport?.cashed?.count}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-row justify-center mt-5'>
          <button
            onClick={download}
            className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
            حفظ
          </button>
        </div>
      </div>
      {showModal != "" ? (
        <Modal
          isTopCentered={true}
          setShowModal={() => {
            setShowModal("");
          }}>
          <div className=' w-auto  min-w-full md:min-w-[600px] mt-10 '>
            <div className='h-[50px] w-full rounded-t-lg bg-THEME_PRIMARY_COLOR flex flex-row justify-between px-6 items-center'>
              <p className='text-base md:text-xl  text-white font-semibold'>
                {showModal == "outstanding"
                  ? "شيكات تحت التحصيل "
                  : showModal == "cleared"
                  ? "شيكات محصلة"
                  : showModal == "rejected"
                  ? "شيكات مرفوضة "
                  : showModal == "cashed"
                  ? "شيكات مستبدلة بالنقد "
                  : ""}
              </p>
              <img
                src='/assets/close.png'
                className='w-5 h-5 cursor-pointer'
                width={20}
                onClick={() => {
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                  setShowModal("");
                }}
                height={20}
              />
            </div>
            <div className='bg-white'>
              <div className='bg-white  max-h-[600px]  md:h-auto max-h-auto overflow-auto w-auto p-6 pt-5 pb-0 justify-center  flex flex-row flex-wrap gap-5 rounded-b-lg items-center px-3 md:px-10 '>
                {paymentReport?.[showModal]?.checks?.map((item: any) => {
                  return (
                    <div className='bg-[#D9D9D9] rounded-lg w-[500px] p-6'>
                      <div className='flex flex-row  justify-between'>
                        <p className='text-lg font-medium'>{item?.userName}</p>
                        <p className='text-lg font-medium'>
                          {item?.mobileNumber}
                        </p>
                      </div>
                      <hr className='border-[0.5px] my-2.5 border-gray-100' />
                      <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-2'>
                          <div className='flex flex-col gap-1'>
                            <p>اسم البنك</p>
                            <p>{item?.bankName}</p>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <p>تاريخ الاستحقاق </p>
                            <p> {item?.dueDate?.split("T")?.[0]}</p>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <div className='flex flex-col gap-1'>
                            <p> رقم الشيك</p>
                            <p>{item?.checkNumber} </p>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <p>القيمة </p>
                            <p>
                              {" "}
                              {Number(item?.amount)?.toLocaleString()} جنيه{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex flex-row justify-around w-full bg-white py-5'>
                <button
                  onClick={downloadItems}
                  className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white flex flex-row items-center justify-center rounded-md h-[50px] min-h-[50px]'>
                  {"حفظ"}
                </button>
                <button
                  onClick={() => {
                    (document.getElementById("body") as any).style.overflow =
                      "scroll";
                    setShowModal("");
                  }}
                  className='bg-THEME_PRIMARY_COLOR w-full md:w-[160px] text-white rounded-md h-[50px] min-h-[50px]'>
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
