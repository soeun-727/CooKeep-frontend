import type { Recipe } from "../types/recipe";

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    recipeName: "고추장 마요 달걀밥",
    tags: ["고추장", "달걀밥", "마요네즈"],

    ingredients: [
      { name: "마요네즈", isRequired: true },
      { name: "달걀", isRequired: true },
      { name: "고추장", isRequired: true },
      { name: "버터", isRequired: false },
      { name: "밥", isRequired: true },
      { name: "파", isRequired: false },
    ],

    substitutions: [
      {
        original: "파",
        replacement: "양파로 대체 가능하거나 생략 가능",
      },
      {
        original: "버터",
        replacement: "식용유 또는 참기름 소량",
      },
    ],

    steps: [
      { order: 1, description: "뜨거운 밥 위에 버터를 녹인다." },
      { order: 2, description: "달걀 프라이를 반숙으로 굽는다." },
      { order: 3, description: "고추장과 마요네즈를 넣고 비빈다." },
    ],

    relatedVideos: [
      {
        title: "초간단 고추장 마요 달걀밥",
        thumbnail: "https://img.youtube.com/vi/aaa/0.jpg",
        url: "https://www.youtube.com/watch?v=aaa",
      },
      {
        title: "자취생 필수 달걀밥 레시피",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        url: "https://www.youtube.com/watch?v=bbb",
      },
      {
        title: "고추장 말고 간장 버전",
        thumbnail: "https://img.youtube.com/vi/ccc/0.jpg",
        url: "https://www.youtube.com/watch?v=ccc",
      },
    ],
  },

  {
    id: 2,
    recipeName: "우유 계란찜",
    tags: ["우유", "달걀", "부드러운"],
    ingredients: [
      { name: "달걀", isRequired: true },
      { name: "우유", isRequired: true },
      { name: "소금", isRequired: true },
    ],
    steps: [
      { order: 1, description: "달걀을 풀고 우유를 섞는다." },
      { order: 2, description: "소금으로 간을 한다." },
      { order: 3, description: "약불에서 천천히 찐다." },
    ],
  },
];
