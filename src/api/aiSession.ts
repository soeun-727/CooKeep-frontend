import type { Feature } from "@/types/aiRecipe";

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
    feature?: Feature;
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

export const toggleFavoriteSession = async (sessionId: number) => {
  const response = await api.patch(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return response.data;
};

export const updateAiSessionTitle = async (
  sessionId: number,
  title: string,
) => {
  const response = await api.patch(
    `/api/users/me/ai/recipes/sessions/title/${sessionId}`,
    { title },
  );
  return response.data;
};

export const deleteAiRecipeSession = async (sessionId: number) => {
  const response = await api.delete(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return response.data;
};
