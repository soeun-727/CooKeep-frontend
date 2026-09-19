import type { AxiosResponse } from "axios";

import type {
  AiRecipeResponse,
  Feature,
  RetryAiRecipeRequest,
} from "@/types/aiRecipe";

import type {
  AiRecipeSessionListResponse,
  AiSessionDetailResponse,
} from "./aiSession";
import api from "./axios";
import { CookieReward } from "./cookies";

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

const extractData = <T>(response: AxiosResponse<ApiResponseEnvelope<T>>): T => {
  if (response?.data && "data" in response.data) {
    return response.data.data as T;
  }
  return response?.data as T;
};

export interface AiRecipeRequestOptions {
  requestId?: string;
  signal?: AbortSignal;
}

/** [POST] AI 레시피 생성 (MAIN05-01) */
export const generateAiRecipe = async (
  body: GenerateAiRecipeRequest,
  options?: AiRecipeRequestOptions,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes",
    body,
    {
      timeout: 60000,
      signal: options?.signal,
      headers: options?.requestId
        ? { "X-Request-Id": options.requestId }
        : undefined,
    },
  );

  return extractData<AiRecipeResponse>(response);
};

/** [POST] AI 레시피 생성 취소 */
export const cancelAiRecipe = async (requestId: string): Promise<void> => {
  await api.post(`/api/users/me/ai/recipes/cancel/${requestId}`);
};

export interface CompleteAiRecipeResponse {
  reward?: CookieReward;
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
  options?: AiRecipeRequestOptions,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/retry",
    body,
    {
      timeout: 60000,
      signal: options?.signal,
      headers: options?.requestId
        ? { "X-Request-Id": options.requestId }
        : undefined,
    },
  );
  return extractData<AiRecipeResponse>(response);
};

/** [POST] AI 랜덤 레시피 생성 (MAIN05-04) - ⚠️ 경로 수정됨 */
export const generateRandomAiRecipe = async (
  options?: AiRecipeRequestOptions,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/random",
    {},
    {
      timeout: 60000,
      signal: options?.signal,
      headers: options?.requestId
        ? { "X-Request-Id": options.requestId }
        : undefined,
    },
  );

  return extractData<AiRecipeResponse>(response);
};

/** [POST] AI 랜덤 레시피 재요청 (MAIN05-05) - ⚠️ 경로 수정됨 */
export const retryRandomAiRecipe = async (
  body: RetryAiRecipeRequest,
  options?: AiRecipeRequestOptions,
): Promise<AiRecipeResponse> => {
  const response = await api.post<ApiResponseEnvelope<AiRecipeResponse>>(
    "/api/users/me/ai/recipes/random/retry",
    body,
    {
      timeout: 60000,
      signal: options?.signal,
      headers: options?.requestId
        ? { "X-Request-Id": options.requestId }
        : undefined,
    },
  );
  return extractData<AiRecipeResponse>(response);
};

/** [GET] AI 레시피 대화 세션 목록 조회 (MAIN06-1) */
export const getAiRecipeSessions = async () => {
  const response = await api.get<
    ApiResponseEnvelope<AiRecipeSessionListResponse["data"]>
  >("/api/users/me/ai/recipes/sessions");
  return extractData(response);
};

/** [GET] AI 레시피 대화 세션 상세 조회 (MAIN06-2) */
export const getAiRecipeSessionDetail = async (sessionId: number) => {
  const response = await api.get<
    ApiResponseEnvelope<AiSessionDetailResponse["data"]>
  >(`/api/users/me/ai/recipes/sessions/${sessionId}`);
  return extractData(response);
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
