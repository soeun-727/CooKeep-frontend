import React from "react";

interface TextFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoComplete?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const TextField = ({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  disabled = false,
  errorMessage,
  successMessage,
  leftIcon,
  rightIcon,
  autoComplete,
  onBlur,
}: TextFieldProps) => {
  return (
    <div className="w-[361px]">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`
    w-full h-[48px]
    border
    rounded-[6px]
    px-3 py-2
    bg-white
    text-[#202020] 
    font-['Pretendard'] text-sm leading-5
    placeholder:font-medium
    placeholder:text-stone-300
    disabled:bg-[#ECECEC]
    focus:outline-none
    ${leftIcon ? "pl-10" : ""}
        ${rightIcon ? "pr-10" : ""}
    ${
      errorMessage
        ? "border-[#D91F1F]"
        : successMessage
          ? "border-[#1FA43C]"
          : "border-[#DDDDDD]"
    }
  `}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      <p
        className={`
    mt-1
    pl-2
    text-[10px]
    leading-[14px]
    min-h-[14px]
    ${
      errorMessage
        ? "text-[#D91F1F]"
        : successMessage
          ? "text-[#1FA43C]"
          : "text-transparent"
    }
  `}
      >
        {errorMessage || successMessage || "placeholder"}
      </p>
    </div>
  );
};

export default TextField;
