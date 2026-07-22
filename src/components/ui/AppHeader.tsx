import CookieIcon from "@/assets/cookie_icon.svg?react";
import MailNotiIcon from "@/assets/fridge/AppBar/mail_notification.svg?react";
import SettingIcon from "@/assets/fridge/AppBar/setting.svg?react";

interface AppBarProps {
  cookieCount?: number;
}
export const AppBar = ({ cookieCount }: AppBarProps) => {
  return (
    <div className="flex justify-end">
      {cookieCount && (
        <div className="bg-gray-0 border-gray-10 flex items-center gap-[5px] rounded-full border px-4 py-2">
          <CookieIcon className="h-[14px] w-[14px]" />
          <p className="typo-label text-gray-80">{cookieCount}개</p>
        </div>
      )}
      <MailNotiIcon className="h-10 w-10" />
      <SettingIcon className="h-10 w-10" />
    </div>
  );
};
