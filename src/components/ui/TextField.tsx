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
    <div className="w-full">
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
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          className={`bg-gray-0 text-gray-80 placeholder:text-gray-30 disabled:bg-gray-10 typo-m h-[48px] w-full rounded-[6px] border px-3 py-2 focus:outline-none ${leftIcon ? "pl-11" : ""} ${rightIcon ? "pr-10" : ""} ${
            errorMessage
              ? "border-semantic-negative"
              : successMessage
                ? "border-semantic-positive"
                : "border-gray-10"
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
            ? "text-semantic-negative"
            : successMessage
              ? "text-semantic-positive"
              : "text-transparent"
        } `}
      >
        {errorMessage || successMessage || "placeholder"}
      </p>
    </div>
  );
}
