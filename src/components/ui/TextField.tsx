// import React from "react";

// interface TextFieldProps {
//   label?: string;
//   value: string;
//   placeholder?: string;
//   type?: string;
//   onChange: (value: string) => void;
//   disabled?: boolean;
//   errorMessage?: string;
//   successMessage?: string;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
//   autoComplete?: string;
//   onBlur?: React.FocusEventHandler<HTMLInputElement>;
// }

// export default function TextField({
//   label,
//   value,
//   placeholder,
//   type = "text",
//   onChange,
//   disabled = false,
//   errorMessage,
//   successMessage,
//   leftIcon,
//   rightIcon,
//   autoComplete,
//   onBlur,
// }: TextFieldProps) {
//   return (
//     <div className="w-full max-w-[361px]">
//       {label && (
//         <label className="mb-1 block text-sm font-medium">{label}</label>
//       )}

//       <div className="relative">
//         {leftIcon && (
//           <div className="absolute top-1/2 left-3 -translate-y-1/2">
//             {leftIcon}
//           </div>
//         )}

//         <input
//           type={type}
//           value={value}
//           placeholder={placeholder}
//           disabled={disabled}
//           autoComplete={autoComplete}
//           onChange={e => onChange(e.target.value)}
//           onBlur={onBlur}
//           className={`bg-gray-0 text-gray-80 placeholder:text-gray-30 disabled:bg-gray-10 h-[48px] w-full rounded-[6px] border px-3 py-2 font-['Pretendard'] text-sm leading-5 placeholder:font-medium focus:outline-none ${leftIcon ? "pl-11" : ""} ${rightIcon ? "pr-10" : ""} ${
//             errorMessage
//               ? "border-semantic-negative"
//               : successMessage
//                 ? "border-semantic-positive"
//                 : "border-gray-10"
//           } `}
//         />

//         {rightIcon && (
//           <div className="absolute top-1/2 right-3 -translate-y-1/2">
//             {rightIcon}
//           </div>
//         )}
//       </div>

//       <p
//         className={`mt-1 min-h-[14px] pl-2 text-[10px] leading-[14px] ${
//           errorMessage
//             ? "text-semantic-negative"
//             : successMessage
//               ? "text-semantic-positive"
//               : "text-transparent"
//         } `}
//       >
//         {errorMessage || successMessage || "placeholder"}
//       </p>
//     </div>
//   );
// }
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
  const message = errorMessage || successMessage;

  // 내용부분(입력 박스) 테두리/배경 상태
  const boxState = disabled
    ? "border-gray-10 bg-gray-10"
    : errorMessage
      ? "border-semantic-negative bg-gray-0"
      : successMessage
        ? "border-semantic-positive bg-gray-0"
        : "border-gray-10 bg-gray-0";

  // 메시지 색상 상태
  const messageColor = errorMessage
    ? "text-semantic-negative"
    : successMessage
      ? "text-semantic-positive"
      : "text-transparent";

  return (
    // 전체 wrapper
    <div className="flex h-[70px] w-full flex-col items-center gap-1 self-stretch">
      {label && (
        <label className="typo-label text-gray-80 w-full self-start">
          {label}
        </label>
      )}

      {/* 내용부분(입력 박스) */}
      <div
        className={`flex h-12 w-full shrink-0 items-center gap-3 self-stretch rounded-xl border px-3 ${boxState} ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        {leftIcon && (
          <div className="flex [aspect-ratio:1/1] h-6 w-6 shrink-0 items-center justify-center">
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
          className="typo-m text-gray-80 min-w-0 flex-1 self-stretch overflow-hidden bg-transparent text-ellipsis whitespace-nowrap placeholder:text-gray-50 focus:outline-none disabled:cursor-not-allowed"
        />

        {rightIcon && (
          <div className="flex [aspect-ratio:1/1] h-6 w-6 shrink-0 items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {/* 메시지 영역 항상 자리 차지(레이아웃 밀림 방지) */}
      <div className="flex h-[14px] w-full shrink-0 items-center gap-2 self-stretch px-3">
        <p
          className={`typo-caption line-clamp-1 overflow-hidden text-ellipsis ${messageColor}`}
        >
          {message || "placeholder"}
        </p>
      </div>
    </div>
  );
}
