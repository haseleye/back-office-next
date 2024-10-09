import { useAppContext } from "@/context";
import { getCookie } from "cookies-next";
import { Fragment, useState } from "react";

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedType, setSelectedType } = useAppContext();
  const userData = getCookie("user")
    ? JSON.parse(getCookie("user") as string)
    : null;
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type='button'
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'></path>
        </svg>
      </button>
      <aside
        id='default-sidebar'
        className={` fixed top-0 right-0 z-40 w-64 h-screen transition-transform   md:flex md:translate-x-0  ${
          !isOpen ? "hidden" : "visible"
        }`}
        aria-label='Sidebar'>
        <div className='h-full px-3 py-4 overflow-y-auto bg-THEME_SECONDARY_COLOR '>
          <div className=' overflow-auto flex flex-col   pb-[150px]'>
            <div className='flex flex-col gap-2 items-center'>
              <img src='/assets/logo.svg' className='w-[150px]' />
              <img
                src={userData?.profilePhoto}
                width={50}
                height={50}
                className='rounded-full'
              />
              <p className='text-white font-medium text-xl '>
                {userData?.firstName} {userData?.lastName}
              </p>
            </div>
            <div className='flex flex-col  mt-1 gap-[6px] px-3'>
              <div
                className='flex flex-row gap-3 items-center cursor-pointer'
                onClick={() => {
                  setSelectedType({ cat: 0, subCat: 0 });
                }}>
                <MenuImage isSelected={selectedType.cat == 0} />
                <p className='text-white font-medium text-xl'> العملاء</p>
              </div>

              {selectedType.cat == 0 ? (
                <CustomerSubmenu
                  onChange={(index) =>
                    setSelectedType({ ...selectedType, subCat: index })
                  }
                  selectedIndex={selectedType.subCat}
                  key={"customers"}
                />
              ) : (
                ""
              )}

              <div
                className='flex flex-row gap-3 ps-[6px] items-center cursor-pointer'
                onClick={() => {
                  setSelectedType({ cat: 1, subCat: 0 });
                }}>
                <MenuImage isSelected={selectedType.cat == 1} />

                <p className='text-white font-medium text-xl'> المدفوعات</p>
              </div>
              {selectedType.cat == 1 ? (
                <PaymentsSubMenu
                  onChange={(index) =>
                    setSelectedType({ ...selectedType, subCat: index })
                  }
                  selectedIndex={selectedType.subCat}
                  key={"customers"}
                />
              ) : (
                ""
              )}
              <div
                className='flex flex-row gap-3 ps-[6px] items-center cursor-pointer'
                onClick={() => {
                  setSelectedType({ cat: 2, subCat: 0 });
                }}>
                <MenuImage isSelected={selectedType.cat == 2} />
                <p className='text-white font-medium text-xl'> التقارير</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const MenuImage = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <img
      src={`/assets/${isSelected ? "down.png" : "left.png"}`}
      width={15}
      height={15}
    />
  );
};
const CustomerSubmenu = ({
  onChange,
  selectedIndex,
}: {
  onChange(index: number): void;
  selectedIndex: number;
}) => {
  return (
    <Fragment>
      <div className='w-full flex justify-center'>
        <img src='/assets/customers.svg' width={40} height={40} />
      </div>
      <SubMenuItem
        onChange={onChange}
        imgSrc='cash.svg'
        index={0}
        isSelected={selectedIndex == 0}
        label='المدفوعات النقدية'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='check.svg'
        index={1}
        isSelected={selectedIndex == 1}
        label='الشيكات'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='unit.svg'
        index={2}
        isSelected={selectedIndex == 2}
        label='الوحدات'
      />
    </Fragment>
  );
};
const PaymentsSubMenu = ({
  onChange,
  selectedIndex,
}: {
  onChange(index: number): void;
  selectedIndex: number;
}) => {
  return (
    <Fragment>
      <SubMenuItem
        onChange={onChange}
        imgSrc='cash.svg'
        index={0}
        isSelected={selectedIndex == 0}
        label='المدفوعات النقدية'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='cash.svg'
        index={1}
        isSelected={selectedIndex == 0}
        label='المدفوعات النقدية'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='check.svg'
        index={2}
        isSelected={selectedIndex == 1}
        label='الشيكات'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='cash.svg'
        index={3}
        isSelected={selectedIndex == 0}
        label='المدفوعات النقدية'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='unit.svg'
        index={4}
        isSelected={selectedIndex == 2}
        label='الوحدات'
      />
    </Fragment>
  );
};
const ReportsSubMenu = ({
  onChange,
  selectedIndex,
}: {
  onChange(index: number): void;
  selectedIndex: number;
}) => {
  return (
    <Fragment>
      <SubMenuItem
        onChange={onChange}
        imgSrc='cash.svg'
        index={0}
        isSelected={selectedIndex == 0}
        label='المدفوعات النقدية'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='check.svg'
        index={1}
        isSelected={selectedIndex == 1}
        label='الشيكات'
      />
      <SubMenuItem
        onChange={onChange}
        imgSrc='unit.svg'
        index={2}
        isSelected={selectedIndex == 2}
        label='الوحدات'
      />
    </Fragment>
  );
};

const SubMenuItem = ({
  isSelected,
  onChange,
  index,
  imgSrc,
  label,
}: {
  isSelected: boolean;
  onChange(index: number): void;
  index: number;
  imgSrc: string;
  label: string;
}) => {
  return (
    <div
      onClick={() => {
        onChange(index);
      }}
      className={`flex${
        isSelected ? " bg-[#A9A9A9]" : ""
      } py-[3px] px-[6px] rounded-md flex-row gap-2 items-end cursor-pointer`}>
      <img src={`/assets/${imgSrc}`} width={30} height={30} />
      <p className='text-white font-medium text-lg'> {label}</p>
    </div>
  );
};
