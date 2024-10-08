import { useEffect, useRef } from "react";

export const TextInput = ({
  label,
  onChange,
  value,
  placeholder,
  error,
  autoFocus,
}: {
  label: string;
  onChange(value: string): void;
  value: string;
  placeholder: string;
  error?: boolean;
  autoFocus?: boolean;
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current && autoFocus) {
      (inputRef.current as any).focus();
    }
  }, [inputRef,autoFocus]);
  return (
    <div
      className={` bg-gray-50 flex flex-row  items-center  rounded-lg h-[55px] w-full p-4 ${
        error ? "border-[1px] border-THEME_ERROR_COLOR" : ""
      }`}>
      <label className='block text-sm w-[35%]  text-[#3C3C43] opacity-60 '>
        {label}
      </label>
      <input
        ref={inputRef}
        autoComplete={"off"}
        type='text'
        onChange={(e) => {
          const sanitizedValue = e.target.value.replace(/[0-9]/g, "");
          onChange(sanitizedValue);
        }}
        className='py-3 ps-4 pe-10  block w-full bg-gray-50   rounded-lg focus:outline-none  text-base'
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
      />
    </div>
  );
};
