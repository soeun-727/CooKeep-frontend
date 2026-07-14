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
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-center gap-1 p-1">
        <span className="typo-l-strong text-gray-80">{label}</span>
      </div>

      <div className="min-h-[70px] w-full">
        <div className="border-gray-10 flex h-12 w-full min-w-0 items-center gap-3 rounded-xl border bg-white px-3">
          <span className="typo-m min-w-0 flex-1 truncate text-gray-50">
            {value}
          </span>

          <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`typo-caption shrink-0 rounded-full px-3 py-[6px] transition-colors ${
              disabled
                ? "bg-gray-30 text-gray-0 cursor-not-allowed"
                : "bg-gray-80 text-gray-0 cursor-pointer"
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
