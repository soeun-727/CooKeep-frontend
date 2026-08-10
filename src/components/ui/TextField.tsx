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
  bgColor?: string;
  rounded?: string;
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
  bgColor = "bg-gray-10",
  rounded = "rounded-[12px]",
}: TextFieldProps) {
  return (
    <div className="w-full">
      {label && <label className="typo-m mb-1 block">{label}</label>}

      <div
        className={`${bgColor} border-gray-10 flex gap-3 ${rounded} border p-3`}
      >
        {leftIcon && <div>{leftIcon}</div>}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          className={`text-gray-80 typo-m flex-1 focus:outline-none ${
            errorMessage
              ? "border-semantic-negative"
              : successMessage
                ? "border-semantic-positive"
                : "border-gray-10"
          } ${bgColor === "bg-gray-10" ? "placeholder:text-gray-50" : "placeholder:text-gray-80"}`}
        />

        {rightIcon && <div>{rightIcon}</div>}
      </div>

      {(errorMessage || successMessage) && (
        <p
          className={`mt-1 min-h-[14px] pl-2 text-[10px] leading-[14px] ${
            errorMessage ? "text-semantic-negative" : "text-semantic-positive"
          } `}
        >
          {errorMessage || successMessage}
        </p>
      )}
    </div>
  );
}
