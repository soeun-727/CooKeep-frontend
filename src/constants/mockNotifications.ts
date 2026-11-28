import type { NoticeInboxItem, NotificationItem } from "@/types/notification";

// GET /api/users/me/inbox/notifications 목데이터
export const mockServiceNotifications: NotificationItem[] = [
  {
    notificationId: 1,
    type: "유통기한임박",
    title: "유통기한 임박 알림",
    body: "오늘 유통기한이 만료되는 재료가 있어요! \n 지금 확인하고 요리해볼까요?",
    url: "/fridge",
    isRead: false,
    createdAt: "2026-11-28T09:00:00",
    elapsedTime: "10분 전",
  },
  {
    notificationId: 2,
    type: "시듦",
    title: "식물 시듦 알림",
    body: "식물이 시들고 있어요. 물을 주어 다시 살려주세요.",
    url: "/cookeeps",
    isRead: false,
    createdAt: "2026-11-28T07:30:00",
    elapsedTime: "2시간 전",
  },
  {
    notificationId: 3,
    type: "성장정지",
    title: "식물 성장 정지 알림",
    body: "3일 동안 요리 기록이 없어 식물 성장이 멈췄어요.",
    url: "/cookeeps",
    isRead: true,
    createdAt: "2026-11-27T12:00:00",
    elapsedTime: "1일 전",
  },
  {
    notificationId: 4,
    type: "유통기한임박",
    title: "유통기한 임박 알림",
    body: "계란 외 2개 재료의 유통기한이 3일 남았어요.",
    url: "/fridge",
    isRead: true,
    createdAt: "2026-11-25T18:00:00",
    elapsedTime: "3일 전",
  },
];

// GET /api/users/me/inbox/notices 목데이터
export const mockNotices: NoticeInboxItem[] = [
  {
    noticeId: 1,
    title: "쿠킵 v1.2 업데이트 안내",
    content: "AI 레시피 추천이 더 똑똑해졌어요. 지금 바로 확인해보세요!",
    createdAt: "2026-11-28T08:00:00",
    elapsedTime: "1시간 전",
  },
  {
    noticeId: 2,
    title: "서버 점검 안내",
    content: "12월 1일 02:00~04:00 서버 점검으로 서비스 이용이 일시 중단돼요.",
    createdAt: "2026-11-26T10:00:00",
    elapsedTime: "2일 전",
  },
  {
    noticeId: 3,
    title: "개인정보 처리방침 개정 안내",
    content: "개인정보 처리방침이 12월 10일부터 일부 변경될 예정이에요.",
    createdAt: "2026-11-20T10:00:00",
    elapsedTime: "8일 전",
  },
];
