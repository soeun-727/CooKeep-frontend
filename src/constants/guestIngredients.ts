import bagel from "@/assets/guest/bagel.svg";
import banana from "@/assets/guest/banana.svg";
import egg from "@/assets/guest/egg.svg";
import milk from "@/assets/guest/milk.svg";
import noodles from "@/assets/guest/noodles.svg";
import strawberry from "@/assets/guest/strawberry.svg";
import { type Ingredient } from "@/stores/useIngredientStore";

const DEFAULT_INGREDIENT_PROPS = {
  quantity: 1,
  unit: "개",
  expiryDate: "2026-12-31",
  createdAt: Date.now(),
};

export const GUEST_INGREDIENTS: Ingredient[] = [
  {
    id: 1,
    name: "우유",
    category: "냉장",
    dDay: 1,
    image: milk,
    ...DEFAULT_INGREDIENT_PROPS,
  },
  {
    id: 2,
    name: "딸기",
    category: "냉장",
    dDay: 3,
    image: strawberry,
    ...DEFAULT_INGREDIENT_PROPS,
  },
  {
    id: 3,
    name: "계란",
    category: "냉장",
    dDay: 21,
    image: egg,
    ...DEFAULT_INGREDIENT_PROPS,
  },
  {
    id: 4,
    name: "바나나",
    category: "상온",
    dDay: 6,
    image: banana,
    ...DEFAULT_INGREDIENT_PROPS,
  },
  {
    id: 5,
    name: "소면",
    category: "상온",
    dDay: 10,
    image: noodles,
    ...DEFAULT_INGREDIENT_PROPS,
  },
  {
    id: 6,
    name: "베이글",
    category: "냉동",
    dDay: 6,
    image: bagel,
    ...DEFAULT_INGREDIENT_PROPS,
  },
];

// 레시피 추천에 필요한 필수 선택 대상 ID
export const REQUIRED_RECIPE_IDS = [1, 2, 4, 6];
