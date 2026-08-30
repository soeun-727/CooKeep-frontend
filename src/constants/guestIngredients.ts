// Assets - Ingredients
import type { Ingredient } from "@/stores/useIngredientStore";

// Assets - Thumbnails
import thumbnail1 from "@/assets/guest/Thumbnail1.svg";
import thumbnail2 from "@/assets/guest/Thumbnail2.svg";
import thumbnail3 from "@/assets/guest/Thumbnail3.svg";
import bagel from "@/assets/guest/bagel.svg";
import banana from "@/assets/guest/banana.svg";
import egg from "@/assets/guest/egg.svg";
import milk from "@/assets/guest/milk.svg";
import noodles from "@/assets/guest/noodles.svg";
import strawberry from "@/assets/guest/strawberry.svg";

// Constants & Types
import { DIFFICULTY_OPTIONS } from "@/constants/recipeDifficulty";

// ==========================================
// 1. 게스트 레시피 상수 데이터
// ==========================================
export const GUEST_RECIPE_DATA = {
  title: "딸기 바나나 베이글 프렌치 토스트",
  feature: "SNACK_DESSERT",
  ingredients: {
    user_ingredients: [
      { name: "우유", quantity: 1, unit: "개" },
      { name: "딸기", quantity: 1, unit: "팩" },
      { name: "베이글", quantity: 1, unit: "개" },
      { name: "바나나", quantity: 1, unit: "개" },
    ],
    additional_ingredients: [
      { name: "달걀", quantity: 2, unit: "개" },
      { name: "설탕", quantity: 3, unit: "티스푼" },
      { name: "버터", quantity: 1, unit: "개" },
    ],
    optional_ingredients: [
      {
        name: "슈가파우더",
        quantity: 1,
        unit: "티스푼",
        description: "이 재료는 생략 가능합니다",
      },
      { name: "시럽", quantity: 2, unit: "티스푼" },
    ],
  },
  steps: [
    "볼에 달걀, 우유, 설탕, 소금을 섞어 준비해주세요",
    "빵을 달걀물에 충분히 적신 후, 버터를 두른 팬에 약불로 노릇하게 구워주세요",
    "구운 베이글 위에 슬라이스한 딸기와 바나나를 올리고, 시럽이나 슈가파우더를 뿌려 완성해주세요",
  ],
  youtube_search_queries: [
    "프렌치토스트",
    "딸기바나나샌드위치",
    "베이글토스트",
  ],
  youtube_videos: [
    {
      title:
        "먹기 아까울 정도로 예쁜 딸기 바나나 토스트🍓ㅣ초간단 간식ㅣStrawberry Banana Toast🍞",
      thumbnail: thumbnail1,
      url: "",
    },
    {
      title: "상큼가득 간단한 딸기프렌치토스트만들기♥눈이 호강해요 [램블]",
      thumbnail: thumbnail2,
      url: "",
    },
    {
      title:
        "바나나 뷔렐레 프렌치 토스트 🍌| 바삭한 설탕층에 부드럽고 달콤한 브런치의 정석✨",
      thumbnail: thumbnail3,
      url: "",
    },
  ],
};

// ==========================================
// 2. 파생 레시피 상수
// ==========================================
export const GUEST_RECIPE_STEPS = GUEST_RECIPE_DATA.steps.map((step, idx) => ({
  order: idx + 1,
  description: step,
}));

const matchedOption = DIFFICULTY_OPTIONS.find(
  opt => opt.key === GUEST_RECIPE_DATA.feature,
);

export const GUEST_RECIPE_CATEGORY = matchedOption?.desc || "디저트";

// ==========================================
// 3. 게스트 재료 데이터
// ==========================================
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

export const REQUIRED_RECIPE_IDS = [1, 2, 4, 6];
