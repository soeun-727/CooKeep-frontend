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

export default function TextField({
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
}: TextFieldProps) {
  return (
    <div className="w-[361px]">
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
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
          className={`h-[48px] w-full rounded-[6px] border bg-white px-3 py-2 font-['Pretendard'] text-sm leading-5 text-[#202020] placeholder:font-medium placeholder:text-stone-300 focus:outline-none disabled:bg-[#ECECEC] ${leftIcon ? "pl-11" : ""} ${rightIcon ? "pr-10" : ""} ${
            errorMessage
              ? "border-[#D91F1F]"
              : successMessage
                ? "border-[#1FA43C]"
                : "border-[#DDDDDD]"
          } `}
        />

        {rightIcon && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      <p
        className={`mt-1 min-h-[14px] pl-2 text-[10px] leading-[14px] ${
          errorMessage
            ? "text-[#D91F1F]"
            : successMessage
              ? "text-[#1FA43C]"
              : "text-transparent"
        } `}
      >
        {errorMessage || successMessage || "placeholder"}
      </p>
    </div>
  );
}
