import PieChart from "./chart";

export const ChecksReport = ({ paymentReport,download }: any) => {
  return (
    <div>
      <div className='flex flex-row w-full justify-between  mt-6 items-center px-10'>
        <div className='flex flex-col gap-[100px] w-[400px]'>
          <div className='bg-[#D9D9D9] rounded-ee-3xl p-4 min-w-[300px]'>
            <div className='flex flex-row gap-1.5 pb-2'>
              <p className='w-5 h-5 bg-[#009999] text-[#009999]'>{"t"}</p>
              <p className='text-xl font-medium'>شيكات محصلة</p>
            </div>
            <p className='text-xl ms-5 py-2 pt-3'>
              القيمة:{" "}
              <span className='font-medium'>
                {Number(paymentReport?.cleared?.amount)?.toLocaleString()} جنيه
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
          <div className='bg-[#D9D9D9] rounded-se-3xl p-4  min-w-[300px]'>
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
          <div className='bg-[#D9D9D9] rounded-es-3xl p-4  min-w-[300px]'>
            <div className='flex flex-row gap-1.5 pb-2'>
              <p className='w-5 h-5 bg-[#999900] text-[#999900]'>{"t"}</p>
              <p className='text-xl font-medium'>شيكات مرفوضة </p>
            </div>
            <p className='text-xl ms-5 py-2 pt-3'>
              القيمة:{" "}
              <span className='font-medium'>
                {Number(paymentReport?.rejected?.amount)?.toLocaleString()} جنيه
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
          <div className='bg-[#D9D9D9] rounded-ss-3xl p-4  min-w-[300px]'>
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
  );
};