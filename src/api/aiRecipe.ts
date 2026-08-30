import type {
  AiRecipeResponse,
  Feature,
  RetryAiRecipeRequest,
} from "@/types/aiRecipe";

import api from "./axios";

export interface ApiResponseEnvelope<T> {
  status: string;
  timestamp: string;
  data: T;
}

export interface GenerateAiRecipeRequest {
  sessionId?: number;
  feature?: Feature;
  ingredientIds: number[];
}

const extractData = <T>(response: any): T => {
  if (response?.data && "data" in response.data) {
    return response.data.data as T;
  }
  return response?.data as T;
};

/** [POST] AI 레시피 생성 (MAIN05-01) */
export const generateAiRecipe = async (
  body: GenerateAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes",
    body,
    { timeout: 60000 },
  );

  return extractData<AiRecipeResponse>(response);
};

export interface CompleteAiRecipeResponse {
  reward?: {
    types?: string[];
  };
}

/** [POST] AI 레시피 채택 (MAIN05-03) */
export const completeAiRecipe = async (
  sessionId: number,
): Promise<CompleteAiRecipeResponse> => {
  const response = await api.post<
    ApiResponseEnvelope<CompleteAiRecipeResponse>
  >(`/api/users/me/ai/recipes/${sessionId}/complete`, { sessionId });
  return extractData<CompleteAiRecipeResponse>(response);
};

/** [POST] AI 레시피 재요청 (MAIN05-02) - ⚠️ 경로 수정됨 */
export const retryAiRecipe = async (
  body: RetryAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/retry",
    body,
    { timeout: 60000 },
  );
  return extractData<AiRecipeResponse>(response);
};

/** [POST] AI 랜덤 레시피 생성 (MAIN05-04) - ⚠️ 경로 수정됨 */
export const generateRandomAiRecipe = async (): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/random",
    {},
    { timeout: 60000 },
  );

  return extractData<AiRecipeResponse>(response);
};

/** [POST] AI 랜덤 레시피 재요청 (MAIN05-05) - ⚠️ 경로 수정됨 */
export const retryRandomAiRecipe = async (
  body: RetryAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/random/retry",
    body,
    { timeout: 60000 },
  );
  return extractData<AiRecipeResponse>(response);
};

/** [GET] AI 레시피 대화 세션 목록 조회 (MAIN06-1) */
export const getAiRecipeSessions = async () => {
  const response = await api.get<ApiResponseEnvelope<any>>(
    "/api/users/me/ai/recipes/sessions",
  );
  return extractData<any>(response);
};

/** [GET] AI 레시피 대화 세션 상세 조회 (MAIN06-2) */
export const getAiRecipeSessionDetail = async (sessionId: number) => {
  const response = await api.get<ApiResponseEnvelope<any>>(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return extractData<any>(response);
};

/** [DELETE] AI 레시피 대화 세션 삭제 (MAIN06-3) */
export const deleteAiRecipeSession = async (sessionId: number) => {
  const response = await api.delete<ApiResponseEnvelope<void>>(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return extractData<void>(response);
};

/** [PATCH] AI 대화 세션 즐겨찾기 추가/삭제 (MAIN07-1) */
export const toggleAiSessionBookmark = async (sessionId: number) => {
  const response = await api.patch<ApiResponseEnvelope<void>>(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );
  return extractData<void>(response);
};

/** [PATCH] AI 대화 세션 제목 수정 (MAIN07-2) */
export const updateAiSessionTitle = async (
  sessionId: number,
  title: string,
) => {
  const response = await api.patch<ApiResponseEnvelope<void>>(
    `/api/users/me/ai/recipes/sessions/title/${sessionId}`,
    { title },
  );
  return extractData<void>(response);
};
