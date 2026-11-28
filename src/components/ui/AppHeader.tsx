import { useNavigate } from "react-router-dom";

import CookieIcon from "@/assets/cookie_icon.svg?react";
import MailNotiIcon from "@/assets/fixed/AppBar/mail_notification.svg?react";
import SettingIcon from "@/assets/fixed/AppBar/setting.svg?react";

import { mockServiceNotifications } from "@/constants/mockNotifications";

interface AppBarProps {
  cookieCount?: number;
}
export const AppBar = ({ cookieCount }: AppBarProps) => {
  const navigate = useNavigate();
  // TODO: 목데이터 기준, 안읽은 알림 API 나오면 교체
  const hasUnread = mockServiceNotifications.some(n => !n.isRead);
  return (
    <div className="flex justify-end">
      {cookieCount !== undefined && (
        <div className="bg-gray-0 border-gray-10 flex items-center gap-[5px] rounded-full border px-4 py-2">
          <CookieIcon className="h-[14px] w-[14px]" />
          <p className="typo-label text-gray-80">{cookieCount}개</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => navigate("/notifications")}
        aria-label="알림"
      >
        {/* svg 동그라미가 --dot-color를 읽음 */}
        <MailNotiIcon
          className={`h-10 w-10 ${hasUnread ? "[--dot-color:var(--color-green)]" : ""}`}
        />
      </button>
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
