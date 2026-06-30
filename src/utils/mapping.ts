// src/utils/mapping.ts

export const UNIT_MAP: Record<string, string> = {
  PIECE: "개",
  COUNT: "개",
  PACK: "팩",
  BAG: "봉지",
  BOTTLE: "병",
  BUNDLE: "묶음",
  CAN: "캔",
  GRAM: "g",
  MILLILITER: "ml",
};

export const STORAGE_MAP: Record<string, string> = {
  FRIDGE: "냉장",
  FREEZER: "냉동",
  PANTRY: "상온",
};

/** 영문 단위를 한글로 변환하는 안전한 헬퍼 함수 */
export const getKoreanUnit = (unit: string): string => {
  return UNIT_MAP[unit.toUpperCase()] || unit;
};

/** 영문 보관 타입을 한글로 변환하는 안전한 헬퍼 함수 */
export const getKoreanStorage = (storage: string): string => {
  return STORAGE_MAP[storage.toUpperCase()] || storage;
};
// src/constants/goalType.ts

export const GOAL_TYPE_MAP = {
  cook: { value: "COOKING", label: "직접 요리하기" },
  photo: { value: "PHOTO_RECORD", label: "요리 사진 기록하기" },
  expired: {
    value: "USE_EXPIRING_INGREDIENT",
    label: "유통기한 임박 재료 사용",
  },
  like: { value: "RECIPE_LIKE", label: "레시피 좋아요 누르기" },
} as const;

// 서버 전송용 타입 추출
export type GoalActionType =
  (typeof GOAL_TYPE_MAP)[keyof typeof GOAL_TYPE_MAP]["value"];

/** 서버에서 받은 "COOKING"을 "직접 요리하기"로 바꿔주는 헬퍼 */
export const getGoalLabel = (serverValue: string): string => {
  const goal = Object.values(GOAL_TYPE_MAP).find(
    (g) => g.value === serverValue,
  );
  return goal ? goal.label : serverValue;
};
