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
