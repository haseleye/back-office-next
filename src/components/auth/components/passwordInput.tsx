import { ChangeEventHandler, useState } from "react";

export const PasswordInput = ({
  label,
  onChange,
  value,
  placeholder,
  labelWidth,
  error,
  onKeyUp,
}: {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  labelWidth?: boolean;
  error?: boolean;
  onKeyUp: (event: any) => void;
}) => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <div
      className={` bg-gray-50 flex flex-row  items-center  rounded-lg h-[55px] w-full p-4 ${
        error ? "border-[1px] border-THEME_ERROR_COLOR" : ""
      }`}>
      <label className={`block text-sm w-[35%] text-[#3C3C43] opacity-60`}>
        {label}
      </label>
      <input
        onKeyUp={(event) => onKeyUp(event as any)}
        onChange={onChange}
        type={passwordHidden ? "password" : "text"}
        className='py-3 ps-4 pe-10 block w-full bg-gray-50   rounded-lg focus:outline-none  text-base'
        placeholder={placeholder}
        value={value}
      />
      <img
        width={"16px"}
        height={"16px"}
        className='cursor-pointer'
        src={
          passwordHidden
            ? "/assets/showPassword.png"
            : "/assets/hidePassword.png"
        }
        onClick={() => {
          setPasswordHidden(!passwordHidden);
        }}
      />
    </div>
  );
};
