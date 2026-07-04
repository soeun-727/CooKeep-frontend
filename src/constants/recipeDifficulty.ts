import easyImg from "@/assets/recipe/main/easyImg.svg";
import hardImg from "@/assets/recipe/main/hardImg.svg";
import normalImg from "@/assets/recipe/main/normalImg.svg";

export const DIFFICULTY_OPTIONS = [
  {
    key: "EASY",
    title: "Easy",
    time: "10분 이내",
    desc: "빠르고 간편하게",
    image: easyImg,
  },
  {
    key: "NORMAL",
    title: "Normal",
    time: "30분 이내",
    desc: "적당히 차려먹기",
    image: normalImg,
  },
  {
    key: "HARD",
    title: "Hard",
    time: "30분 이상",
    desc: "제대로 요리하기",
    image: hardImg,
  },
] as const;
