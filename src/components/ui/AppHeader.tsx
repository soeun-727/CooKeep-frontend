import CookieIcon from "@/assets/cookie_icon.svg?react";
import MailNotiIcon from "@/assets/fixed/AppBar/mail_notification.svg?react";
import SettingIcon from "@/assets/fixed/AppBar/setting.svg?react";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
  cookieCount?: number;
}
export const AppBar = ({ cookieCount }: AppBarProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      {cookieCount !== undefined && (
        <div className="bg-gray-0 border-gray-10 flex items-center gap-[5px] rounded-full border px-4 py-2">
          <CookieIcon className="h-[14px] w-[14px]" />
          <p className="typo-label text-gray-80">{cookieCount}개</p>
        </div>
      )}
      <MailNotiIcon className="h-10 w-10" />
      <button
        type="button"
        onClick={() => navigate("/settings")}
        aria-label="설정"
      >
        <SettingIcon className="h-10 w-10" />
      </button>
    </div>
  );
};
