import { mockServiceNotifications } from "@/constants/mockNotifications";

import { NotificationItem } from "./NotificationItem";

export const ServiceNotificationList = () => {
  return (
    <div>
      {mockServiceNotifications.map(n => (
        <NotificationItem
          key={n.notificationId}
          notificationType={n.type}
          body={n.body}
          elapsedTime={n.elapsedTime}
          isRead={n.isRead}
          url={n.url}
        />
      ))}
    </div>
  );
};
