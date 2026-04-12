// src/api/types.ts (새 파일 추천)
export interface ApiResponse<T = unknown> {
  status: string;
  timestamp: string;
  data: T;
}
