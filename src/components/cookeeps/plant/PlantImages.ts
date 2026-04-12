// src/components/cookeeps/plant/plantImages.ts
// 이미지 바꿀때 public사용하는거로 바꿔서 수정시키기 그래도 느리다고 판단이 된다면
import type { PlantType } from "../../../stores/useCookeepsStore";

export type PlantStage = 1 | 2 | 3 | 4;

/** 선택 전 이미지 */
export const EMPTY_PLANT_IMAGE = "/assets/cookeeps/plant/plant_before.svg";

/** 선택 후 성장 이미지 */
export const PLANT_IMAGES: Record<PlantType, Record<PlantStage, string>> = {
  apple: {
    1: "/assets/cookeeps/plant/apple/apple_stage_1.svg",
    2: "/assets/cookeeps/plant/apple/apple_stage_2.svg",
    3: "/assets/cookeeps/plant/apple/apple_stage_3.svg",
    4: "/assets/cookeeps/plant/apple/apple_stage_4.svg",
  },
  beans: {
    1: "/assets/cookeeps/plant/beans/beans_stage_1.svg",
    2: "/assets/cookeeps/plant/beans/beans_stage_2.svg",
    3: "/assets/cookeeps/plant/beans/beans_stage_3.svg",
    4: "/assets/cookeeps/plant/beans/beans_stage_4.svg",
  },
  lettuce: {
    1: "/assets/cookeeps/plant/lettuce/lettuce_stage_1.svg",
    2: "/assets/cookeeps/plant/lettuce/lettuce_stage_2.svg",
    3: "/assets/cookeeps/plant/lettuce/lettuce_stage_3.svg",
    4: "/assets/cookeeps/plant/lettuce/lettuce_stage_4.svg",
  },
  tomato: {
    1: "/assets/cookeeps/plant/tomato/tomato_stage_1.svg",
    2: "/assets/cookeeps/plant/tomato/tomato_stage_2.svg",
    3: "/assets/cookeeps/plant/tomato/tomato_stage_3.svg",
    4: "/assets/cookeeps/plant/tomato/tomato_stage_4.svg",
  },
  potato: {
    1: "/assets/cookeeps/plant/potato/potato_stage_1.svg",
    2: "/assets/cookeeps/plant/potato/potato_stage_2.svg",
    3: "/assets/cookeeps/plant/potato/potato_stage_3.svg",
    4: "/assets/cookeeps/plant/potato/potato_stage_4.svg",
  },
  strawberry: {
    1: "/assets/cookeeps/plant/strawberry/strawberry_stage_1.svg",
    2: "/assets/cookeeps/plant/strawberry/strawberry_stage_2.svg",
    3: "/assets/cookeeps/plant/strawberry/strawberry_stage_3.svg",
    4: "/assets/cookeeps/plant/strawberry/strawberry_stage_4.svg",
  },
};
