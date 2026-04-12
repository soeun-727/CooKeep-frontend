import api from "./axios";

export interface AiRecipeSessionItem {
  sessionId: number;
  title: string;
  createdAt: string;
  isPinned: boolean;
}

export interface AiRecipeSessionListResponse {
  status: string;
  timestamp: string;
  data: {
    pinned: AiRecipeSessionItem[];
    sessions: AiRecipeSessionItem[];
  };
}

export interface AiSessionMessage {
  role: "AI" | "USER";
  messageType: string;
  content: string;
  createdAt: string;
}

export interface AiSessionDetailResponse {
  status: string;
  timestamp: string;
  data: {
    sessionId: number;
    messages: AiSessionMessage[];
    completed: boolean;
  };
}

export const getAiRecipeSessions = async () => {
  const res = await api.get<AiRecipeSessionListResponse>(
    "/api/users/me/ai/recipes/sessions",
  );

  return res.data.data;
};

export const getAiSessionDetail = async (sessionId: number) => {
  const res = await api.get<AiSessionDetailResponse>(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );

  return res.data.data;
};

// 즐겨찾기
export const toggleFavoriteSession = async (sessionId: number) => {
  const response = await api.patch(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return response.data;
};

// 제목 이름 수정
export const updateAiSessionTitle = async (
  sessionId: number,
  title: string,
) => {
  const response = await api.patch(
    `/api/users/me/ai/recipes/sessions/title/${sessionId}`,
    { title }, // Request Body
  );
  return response.data;
};

// 레시피 삭제
export const deleteAiRecipeSession = async (sessionId: number) => {
  const response = await api.delete(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return response.data;
};
