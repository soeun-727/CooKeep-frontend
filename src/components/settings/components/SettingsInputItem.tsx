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
    <div className="flex h-[80px] w-full flex-col gap-2">
      {/* label */}
      <span className="typo-body px-3 text-[#202020]">{label}</span>

      {/* input-like box */}
      <div className="flex h-[44px] w-full items-center justify-between rounded-[6px] border border-[#DDD] px-3">
        {/* value */}
        <span className="typo-body2 text-[#AEAEAE]">{value}</span>

        {/* button */}
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={`typo-caption flex w-[115px] items-center justify-center rounded-full px-[18px] py-1 transition-colors ${
            disabled
              ? "cursor-not-allowed bg-stone-300 text-white" // 비활성화 스타일
              : "cursor-pointer bg-[#202020] text-white active:bg-[#404040]" // 활성화 스타일
          } `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
