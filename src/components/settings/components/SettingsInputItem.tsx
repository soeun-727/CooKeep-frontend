// src/pages/settings/components/SettingsInputItem.tsx
import { useLocation, useNavigate } from "react-router-dom";

interface SettingsInputItemProps {
  label: string;
  value: string;
  buttonText: string;
  to: string;
  disabled?: boolean;
}

export default function SettingsInputItem({
  label,
  value,
  buttonText,
  to,
  disabled = false,
}: SettingsInputItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // 비밀번호 변경 페이지로 갈 때 fromSettings state 추가
    if (to === "/settings/password") {
      navigate(to, {
        state: { ...location.state, fromSettings: true },
      });
    } else {
      navigate(to, {
        state: location.state,
      });
    }
  };

  return (
    <div className="flex h-[80px] w-full flex-col gap-2">
      {/* label */}
      <span className="typo-body text-gray-80 px-3">{label}</span>

      {/* input-like box */}
      <div className="border-gray-10 flex h-[44px] w-full items-center justify-between rounded-[6px] border px-3">
        {/* value */}
        <span className="typo-body2 text-gray-50">{value}</span>

        {/* button */}
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={`typo-caption flex w-[115px] items-center justify-center rounded-full px-[18px] py-1 transition-colors ${
            disabled
              ? "bg-gray-30 text-gray-0 cursor-not-allowed" // 비활성화 스타일
              : "bg-gray-80 text-gray-0 active:bg-gray-80 cursor-pointer" // 활성화 스타일
          } `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
