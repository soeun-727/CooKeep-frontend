// src/mocks/recordMock.ts
import type { CookeepRecord } from "../types/record";

export const MOCK_RECORDS: CookeepRecord[] = [
  {
    id: "rec_01",
    recipeId: 101,
    recipeTitle: "매콤 달콤 제육볶음",
    memo: "설탕을 한 스푼 덜 넣었더니 딱 적당하다.",
    images: [{ url: "https://picsum.photos/id/292/400/300" }],
    createdAt: "2026.02.02",
    isPublic: true,
    recipeContent: { ingredients: [], steps: [] },
  },
  {
    id: "rec_02",
    recipeId: 102,
    recipeTitle: "점심: 시원한 바지락 칼국수",
    memo: "해감이 잘 됨!",
    images: [{ url: "https://picsum.photos/id/429/400/300" }],
    createdAt: "2026.02.04", // 중복 날짜 1
    isPublic: false,
    recipeContent: { ingredients: [], steps: [] },
  },
  {
    id: "rec_04",
    recipeId: 104,
    recipeTitle: "간식: 달콤한 팬케이크",
    memo: "메이플 시럽 듬뿍.",
    images: [{ url: "https://picsum.photos/id/486/400/300" }],
    createdAt: "2026.02.04", // 중복 날짜 2
    isPublic: true,
    recipeContent: { ingredients: [], steps: [] },
  },
  {
    id: "rec_05",
    recipeId: 105,
    recipeTitle: "저녁: 소고기 뭇국",
    memo: "뜨끈한 국물이 최고.",
    images: [{ url: "https://picsum.photos/id/200/400/300" }],
    createdAt: "2026.02.04", // 중복 날짜 3
    isPublic: true,
    recipeContent: { ingredients: [], steps: [] },
  },
  {
    id: "rec_03",
    recipeId: 103,
    recipeTitle: "부들부들 계란찜",
    memo: "아이들이 좋아함.",
    images: [{ url: "https://picsum.photos/id/493/400/300" }],
    createdAt: "2026.02.05",
    isPublic: true,
    recipeContent: { ingredients: [], steps: [] },
  },
];
