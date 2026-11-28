import { mockNotices } from "@/constants/mockNotifications";

import { NotificationItem } from "./NotificationItem";

export const NoticeNotificationList = () => {
  return (
    <div>
      {mockNotices.map(n => (
        <NotificationItem
          key={n.noticeId}
          notificationType="공지사항"
          title={n.title}
          content={n.content}
          elapsedTime={n.elapsedTime}
        />
      ))}
    </div>
  );
};
