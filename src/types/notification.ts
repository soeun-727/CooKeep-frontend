// 서버 enum은 @JsonValue로 displayName(한글)을 내려줌
export type NotificationType = "유통기한임박" | "시듦" | "성장정지";

// 알림함에 보여줄 제목 (서버 title과 다름)
export const NOTIFICATION_TITLE: Record<NotificationType, string> = {
  유통기한임박: "유통기한 임박",
  시듦: "식물 상태 주의",
  성장정지: "식물 성장 중단",
};

// GET /api/users/me/inbox/notifications → data: NotificationItem[]
export interface NotificationItem {
  notificationId: number;
  type: NotificationType;
  title: string;
  body: string;
  url: string;
  isRead: boolean;
  createdAt: string;
  elapsedTime: string;
}

// GET /api/users/me/inbox/notices → data: { notices: NoticeInboxItem[] }
export interface NoticeInboxItem {
  noticeId: number;
  title: string;
  content: string;
  createdAt: string;
  elapsedTime: string;
}
