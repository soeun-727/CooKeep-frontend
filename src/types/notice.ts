// src/types/notice.ts

// API 응답 타입
export interface NoticeApi {
  noticeId: number;
  title: string;
  content: string;
}

// 프론트에서 사용하는 타입
export interface Notice {
  id: number;
  title: string;
  content: string;
}

// API 전체 응답
export interface NoticeApiResponse {
  status: string;
  timestamp: string;
  data: NoticeApi[];
}

// mapper
export const mapNotice = (item: NoticeApi): Notice => ({
  id: item.noticeId,
  title: item.title,
  content: item.content,
});
