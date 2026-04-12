// constants/plantTypeMap.ts
import type { PlantType } from "../stores/useCookeepsStore";

/** UI 선택 (id → type) */
export const PLANT_ID_TO_TYPE: Record<number, PlantType> = {
  1: "beans",
  2: "potato",
  3: "apple",
  4: "lettuce",
  5: "tomato",
  6: "strawberry",
};

/** 서버 응답 (이름 → type) */
export const PLANT_NAME_TO_TYPE: Record<string, PlantType> = {
  감자: "potato",
  토마토: "tomato",
  상추: "lettuce",
  딸기: "strawberry",
  사과: "apple",
  강낭콩: "beans",
};

// plantId → plantName 매핑 추가
export const PLANT_ID_TO_NAME: Record<number, string> = {
  1: "강낭콩",
  2: "감자",
  3: "사과",
  4: "상추",
  5: "토마토",
  6: "딸기",
};
