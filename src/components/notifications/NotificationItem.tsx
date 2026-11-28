import { useNavigate } from "react-router-dom";

import ExpiredIcon from "@/assets/notification/expiration.svg?react";
import ServiceNoiceIcon from "@/assets/notification/notice.svg?react";
import GrowthStopIcon from "@/assets/notification/plant_growth_stop.svg?react";
import WiltedIcon from "@/assets/notification/plant_wiling.svg?react";

import { type InboxItemType, NOTIFICATION_TITLE } from "@/types/notification";

interface NotificationItemProps {
  notificationType: InboxItemType;
  title?: string; // 서버 title, 공지사항일 때만 사용
  body?: string; // 서비스 알림 내용
  content?: string; // 공지사항 내용
  elapsedTime: string; // 알림 생성 후 경과 시간
  isRead?: boolean; // 읽음 여부
  url?: string; // 알림 클릭 시 이동할 url, 공지사항은 없음
  onRead?: () => void; // 클릭 시 읽음 처리
}

const NOTIFICATION_ICON: Record<
  InboxItemType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  유통기한임박: ExpiredIcon,
  시듦: WiltedIcon,
  성장정지: GrowthStopIcon,
  공지사항: ServiceNoiceIcon,
};

export const NotificationItem = ({
  notificationType,
  title,
  body,
  content,
  elapsedTime,
  isRead,
  url,
  onRead,
}: NotificationItemProps) => {
  const navigate = useNavigate();
  const Icon = NOTIFICATION_ICON[notificationType];
  const clickable = !isRead && !!url;
  const goToUrl = () => {
    if (!clickable) return;
    onRead?.();
    navigate(url);
  };

  return (
    <section
      role={clickable ? "link" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={goToUrl}
      onKeyDown={e => e.key === "Enter" && goToUrl()}
      className={`flex gap-3 p-4 ${isRead ? "bg-gray-10" : ""} ${clickable ? "cursor-pointer" : ""}`}
    >
      <figure>
        <Icon className="h-6 w-6" />
      </figure>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h3
            className={`typo-caption ${isRead ? "text-gray-30" : "text-gray-50"}`}
          >
            {notificationType === "공지사항"
              ? title
              : NOTIFICATION_TITLE[notificationType]}
          </h3>
          <p
            className={`typo-caption ${isRead ? "text-gray-30" : "text-gray-50"}`}
          >
            {elapsedTime}
          </p>
        </div>
        <p
          className={`typo-m-strong whitespace-pre-line ${isRead ? "text-gray-50" : "text-gray-80"}`}
        >
          {notificationType === "공지사항" ? content : body}
        </p>
      </div>
    </section>
  );
};
