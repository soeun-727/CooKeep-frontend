import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";
import {
  cookingChar,
  earth,
  plant,
  seedling,
  seeds,
  tree,
} from "@/assets/index";

export const TOOLTIP_KEY = "cookeepsPlantShortcutSeen";

export const COOKEEPS_SORT_OPIONS = ["좋아요 순", "최신 순", "오래된 순"];

interface OnboardingStep {
  id: number;
  topText?: string;
  img: React.ReactNode;
  imgWidth: number;
  imgHeight: number;
  text: string;
  buttonText: string;
}

export const COOKEEPS_ONBOARDING_DATA: OnboardingStep[] = [
  {
    id: 1,
    img: (
      <img src={earth} className="h-full w-full object-contain" alt="지구" />
    ),
    imgWidth: 58,
    imgHeight: 58,
    text: "요리는 나를 위한 선택이자,\n결국엔 지구를 위한 선택이기도 해요",
    buttonText: "다음",
  },
  {
    id: 2,
    img: (
      <div className="flex w-full flex-wrap items-start gap-x-[2px]">
        {[
          { src: seeds, label: "씨앗" },
          { src: seedling, label: "새싹" },
          { src: plant, label: "성장" },
          { src: tree, label: "완성" },
        ].map((item, i, arr) => (
          <div key={item.label} className="flex items-center">
            <div className="flex flex-col items-center justify-center">
              <img src={item.src} className="h-10 w-10" alt={item.label} />
              <span className="typo-caption w-full text-center text-gray-50">
                {item.label}
              </span>
            </div>
            {i < arr.length - 1 && (
              <ArrowRightIcon className="text-gray-30 h-[11px] w-[7px]" />
            )}
          </div>
        ))}
      </div>
    ),
    imgWidth: 193,
    imgHeight: 58,
    text: "식물을 다 키우면 새로운 씨앗과\n쿠키 선물이 기다리고 있어요!",
    buttonText: "다음",
  },
  {
    id: 3,
    topText:
      "집에 있는 재료로 요리하고, 기록하면\n쿠키를 받고 식물을 키울 수 있어요!",
    img: (
      <img
        src={cookingChar}
        className="h-full w-full object-contain"
        alt="요리 캐릭터"
      />
    ),
    imgWidth: 87.611,
    imgHeight: 80.004,
    text: "자, 이제 키울 식물을 골라볼까요?",
    buttonText: "다음",
  },
];
