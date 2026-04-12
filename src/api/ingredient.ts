import api from "./axios";
import { CATEGORY_ID_TO_SERVER_KEY } from "../constants/category";

// --- 공통 타입 정의 ---
export type CategoryType =
  (typeof CATEGORY_ID_TO_SERVER_KEY)[keyof typeof CATEGORY_ID_TO_SERVER_KEY];
export type StorageType = "FRIDGE" | "FREEZER" | "PANTRY";
export type IngredientType = "DEFAULT" | "CUSTOM";
export type UnitType =
  | "PIECE"
  | "PACK"
  | "BAG"
  | "BOTTLE"
  | "BUNDLE"
  | "CAN"
  | "GRAM"
  | "MILLILITER";

// --- 매핑 사전 (내부 방어용) ---
const STORAGE_MAP: Record<string, StorageType> = {
  냉장: "FRIDGE",
  냉동: "FREEZER",
  상온: "PANTRY",
  FRIDGE: "FRIDGE",
  FREEZER: "FREEZER",
  PANTRY: "PANTRY",
};

const UNIT_MAP: Record<string, UnitType> = {
  개: "PIECE",
  팩: "PACK",
  봉지: "BAG",
  병: "BOTTLE",
  묶음: "BUNDLE",
  캔: "CAN",
  g: "GRAM",
  ml: "MILLILITER",
  PIECE: "PIECE",
  PACK: "PACK",
  BAG: "BAG",
  BOTTLE: "BOTTLE",
  BUNDLE: "BUNDLE",
  CAN: "CAN",
  GRAM: "GRAM",
  MILLILITER: "MILLILITER",
};

// --- 인터페이스 정의 ---

/** 마스터 식재료 (리스트용) */
export interface MasterIngredient {
  id: number;
  type: IngredientType;
  name: string;
  imageUrl: string;
  category: CategoryType;
}

export interface IngredientCategory {
  category: string;
  displayName: string;
  ingredients: MasterIngredient[];
}

export interface MasterIngredientListResponse {
  categories: IngredientCategory[];
}

/** 냉장고 홈 관련 */
export interface HomeIngredient {
  type: IngredientType;
  referenceId: number;
  name: string;
  leftDays: number;
  imageUrl: string;
}

export interface RefrigeratorHomeResponse {
  fridge: HomeIngredient[];
  freezer: HomeIngredient[];
  pantry: HomeIngredient[];
}

/** 식재료 등록 (Bulk) */
export interface AddIngredientRequest {
  ingredients: {
    type: IngredientType;
    referenceId: number;
    quantity: number;
    unit: UnitType | string;
    storage: StorageType | string;
    expirationDate: string;
    memo: string;
  }[];
}

/** 식재료 상세 정보 */
export interface IngredientDetailResponse {
  ingredientId: number;
  name: string;
  storage: StorageType;
  expirationDate: string;
  quantity: number;
  unit: UnitType;
  leftDays: number;
  memo: string;
  aiTip: string;
  imageUrl: string;
  createdAt: string;
}

/** 프리뷰 관련 */
export interface PreviewRequestItem {
  type: IngredientType;
  referenceId: number;
}

export interface PreviewResponseItem {
  type: IngredientType;
  referenceId: number;
  name: string;
  imageUrl: string;
  defaultQuantity: number;
  defaultUnit: UnitType;
  defaultStorage: StorageType;
  defaultExpirationDate: string;
}

export interface CustomIngredientRequest {
  name: string;
  expirationDays: number;
  storage: StorageType;
  category: CategoryType;
}

// --- 인터페이스 정의 추가 ---

/** 최근 추가한 식재료 아이템 */
export interface RecentIngredient {
  ingredientId: number;
  type: IngredientType;
  name: string;
  imageUrl: string;
}

export interface RecentIngredientResponse {
  ingredients: RecentIngredient[];
}

// --- API 함수 추가 ---

/** [GET] 최근 추가한 식재료 목록 조회 */
export const getRecentIngredients = () => {
  return api.get<{ status: string; data: RecentIngredientResponse }>(
    "/api/users/me/ingredients/recent",
  );
};

/** [GET] 마스터 식재료 목록 조회 */
export const getMasterIngredientList = () => {
  return api.get<{ status: string; data: MasterIngredientListResponse }>(
    "/api/users/me/ingredients/list",
  );
};

/** [POST] 식재료 프리뷰 조회 (디폴트값 받아오기) */
export const getIngredientPreview = (ingredients: PreviewRequestItem[]) => {
  return api.post<{
    status: string;
    data: { ingredients: PreviewResponseItem[]; count: number };
  }>("/api/users/me/ingredients/preview", { ingredients });
};

/** [POST] 커스텀 식재료 등록 */
export const registerCustomIngredient = (data: CustomIngredientRequest) => {
  return api.post<{
    status: string;
    data: {
      customIngredientId: number;
      name: string;
      imageUrl: string;
      category: string;
    };
  }>("/api/users/me/ingredients/custom", data);
};

/** [POST] 식재료 냉장고 최종 추가 (Bulk) */
export const addIngredients = (data: AddIngredientRequest) => {
  const sanitizedIngredients = data.ingredients.map((ing) => {
    const item: any = {
      type: ing.type.toUpperCase(),
      referenceId: Number(ing.referenceId),
    };
    if (ing.quantity) item.quantity = Number(ing.quantity);

    if (ing.unit) {
      item.unit = UNIT_MAP[ing.unit] || ing.unit;
    }

    if (ing.storage) {
      item.storage = STORAGE_MAP[ing.storage] || ing.storage;
    }

    if (ing.expirationDate) {
      item.expirationDate = ing.expirationDate
        .replace(/\s/g, "")
        .replace(/\./g, "-");
      if (item.expirationDate.endsWith("-")) {
        item.expirationDate = item.expirationDate.slice(0, -1);
      }
    }

    if (ing.memo && ing.memo.trim() !== "") {
      item.memo = ing.memo.trim();
    }

    return item;
  });

  return api.post("/api/users/me/ingredients", {
    ingredients: sanitizedIngredients,
  });
};

/** [GET] 냉장고 홈 데이터 조회 */
export const getRefrigeratorHome = () => {
  return api.get<{ status: string; data: RefrigeratorHomeResponse }>(
    "/api/users/me/refrigerator/home",
  );
};

/** [GET] 식재료 상세 정보 조회 */
export const getIngredientDetail = (ingredientId: number) => {
  return api.get<{ status: string; data: IngredientDetailResponse }>(
    `/api/users/me/refrigerator/${ingredientId}`,
  );
};

/** [PATCH] 식재료 정보 수정 (개별) */
export const updateIngredientDetail = (
  ingredientId: number,
  field: "storage" | "date" | "quantity" | "memo",
  value: any,
) => {
  const fieldPathMap = {
    storage: "storage",
    date: "date",
    quantity: "quantity",
    memo: "memo",
  };

  const payloadKey = field === "date" ? "expirationDate" : field;
  let finalValue = value;

  if (field === "date") finalValue = String(value).replace(/\./g, "-");
  if (field === "storage") finalValue = STORAGE_MAP[value] || value;

  return api.patch<{ status: string; data: IngredientDetailResponse }>(
    `/api/users/me/ingredients/${ingredientId}/${fieldPathMap[field]}`,
    { [payloadKey]: finalValue },
  );
};

/** [POST] 식재료 섭취 완료 (리워드 지급) */
export const consumeIngredients = (userIngredientIds: number[]) => {
  return api.post<{ status: string; data: any }>(
    "/api/users/me/ingredients/consume",
    { userIngredientIds },
  );
};

/** [DELETE] 내 식재료 삭제 (Bulk) */
export const deleteIngredients = (userIngredientIds: number[]) => {
  return api.delete("/api/users/me/ingredients", {
    data: { userIngredientIds },
  });
};

/** [GET] 내 냉장고 식재료 검색 */
export const searchIngredients = (term: string, page: number = 0) => {
  return api.get<{ status: string; data: any }>(
    `/api/users/me/ingredients/search`,
    {
      params: { name: term, page, size: 20 },
    },
  );
};

// --- 기존 코드들과의 호환성을 위해 추가하는 코드 ---

/** [PATCH] 식재료 메모 변경 (기존 이름 호환) */
export const updateIngredientMemo = (ingredientId: number, memo: string) =>
  updateIngredientDetail(ingredientId, "memo", memo);

/** [PATCH] 식재료 수량 변경 (기존 이름 호환) */
export const updateIngredientQuantity = (
  ingredientId: number,
  quantity: number,
) => updateIngredientDetail(ingredientId, "quantity", quantity);

/** [PATCH] 식재료 유통기한 변경 (기존 이름 호환) */
export const updateIngredientDate = (
  ingredientId: number,
  expirationDate: string,
) => updateIngredientDetail(ingredientId, "date", expirationDate);

/** [PATCH] 식재료 보관 장소 변경 (기존 이름 호환) */
export const updateIngredientStorage = (
  ingredientId: number,
  storage: StorageType,
) => updateIngredientDetail(ingredientId, "storage", storage);

/** [POST] 식재료 냉장고 최종 추가 (이전 단일 등록 함수 호환용) */
export const addIngredientToFridge = (data: any) => {
  // 만약 단일 객체가 들어오면 배열로 감싸서 벌크 함수로 전달
  const payload = data.ingredients ? data : { ingredients: [data] };
  return addIngredients(payload);
};

// 섭취 완료 응답 타입이 필요한 경우를 위해 추가
export interface ConsumeRewardResponse {
  reward: {
    granted: boolean;
    points: number;
    grantedTypes: string[];
  };
  weeklyGoalAchieved: boolean; // 추가
}

/** 커스텀 식재료 삭제 API */
export const deleteCustomIngredient = async (customIngredientId: number) => {
  // 실제 프로젝트의 axios 인스턴스 이름에 맞춰 수정하세요 (예: api, request 등)
  return await api.delete(
    `/api/users/me/ingredients/custom/${customIngredientId}`,
  );
};
