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

export const COOKEEPS_ONBOARDING_DATA = [
  {
    id: 1,
    img: earth,
    text: "요리는 나를 위한 선택이자,\n결국엔 지구를 위한 선택이기도 해요",
  },
  {
    id: 2,
    img: cookingChar,
    text: "집에 있는 재료로 요리하고\nCooKeep에 기록하면\n쿠키를 받고, 식물을 키울 수 있어요",
  },
  {
    id: 3,
    img: (
      <div className="flex items-end gap-[4px] pb-1">
        {[
          { src: seeds, label: "씨앗" },
          { src: seedling, label: "새싹" },
          { src: plant, label: "성장" },
          { src: tree, label: "완성" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-[3px]">
            <img src={item.src} className="w-[37px]" alt={item.label} />
            <span className="text-[8px] font-medium text-gray-50">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    ),
    text: "식물을 다 키우면 새로운 씨앗과\n쿠키 선물이 기다리고 있어요!",
  },
];
