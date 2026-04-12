// src/pages/settings/components/SettingsInputItem.tsx
import { useLocation, useNavigate } from "react-router-dom";

type SettingsInputItemProps = {
  label: string;
  value: string;
  buttonText: string;
  to: string;
  disabled?: boolean;
};

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
    <div className="flex flex-col gap-2 h-[80px] w-full">
      {/* label */}
      <span className="typo-body text-[#202020] px-3">{label}</span>

      {/* input-like box */}
      <div
        className="
          flex
          items-center
          justify-between
          w-full
          h-[44px]
          px-3
          border
          border-[#DDD]
          rounded-[6px]
        "
      >
        {/* value */}
        <span className="typo-body2 text-[#AEAEAE]">{value}</span>

        {/* button */}
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={`
            flex
            items-center
            justify-center
            w-[115px]
            px-[18px]
            py-1
            rounded-full
            transition-colors
            typo-caption
            ${
              disabled
                ? "bg-stone-300 text-white cursor-not-allowed" // 비활성화 스타일
                : "bg-[#202020] text-white cursor-pointer active:bg-[#404040]" // 활성화 스타일
            }
          `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
