export default function Tooltip({ message, children }: any) {
  return (
    <div className='group relative flex max-w-max flex-col items-center justify-center'>
      {children}
      <div className=' absolute rtl:end-[100px]  ltr:-start-[60px] ltr:md:start-1/2 rtl:md:end-1/2 top-5 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100'>
        <div className='flex max-w-xs flex-col items-center shadow-lg'>
          <div className='max-w-[200px] rounded bg-gray-800 p-2 text-center text-xs text-white'>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
