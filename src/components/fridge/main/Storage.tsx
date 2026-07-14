import { memo, useCallback } from "react";

import {
  type Ingredient,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import character from "@/assets/character/clear_char.svg";
import ArrowRight from "@/assets/fridge/arrow_right.svg?react";

import type { IconComponent } from "@/types/icon";

import Item from "../items/Item";

interface StorageIngredient extends Ingredient {
  className?: string; // 기존 Ingredient에 className이 있을 수도 있다고 알려줌
}
interface StorageProps {
  category: string;
  icon: IconComponent;
  ingredients: StorageIngredient[];
  onItemClick?: (id: number) => void;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default memo(function Storage({
  category,
  icon: Icon,
  ingredients,
  onItemClick,
}: StorageProps) {
  const { selectedIds, toggleSelect, setViewCategory, openDetail } =
    useIngredientStore();
  // 3개 이상일 때만 전체보기 활성화
  const isScrollable = ingredients.length > 3;
  const topIngredients = ingredients.slice(0, 3);

  return (
    <div className="relative z-0 min-h-[173px] w-full">
      {/* 배경 레이어 */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col overflow-hidden">
        <div className="h-[115px] w-full rounded-t-[16px] bg-[#E3EBE6]" />
        <div className="relative flex h-12 w-full flex-col bg-[#75D99F]"></div>
        <div className="h-[10px] w-full bg-[#54BE81]" />
      </div>

      {/* 상단 헤더 */}
      <div className="mx-auto w-full">
        <div className="relative z-10 px-4 py-2">
          <div className="flex h-10 w-full items-center justify-between">
            {/* 카테고리 태그 */}
            <div className="bg-gray-80 text-green flex h-[22px] min-w-[59px] items-center justify-center gap-1 rounded-[6px] px-2">
              <Icon className="h-3 w-3" />
              <span className="typo-caption leading-none whitespace-nowrap">
                {category}
              </span>
            </div>

            {/* 전체보기 */}
            <button
              disabled={!isScrollable}
              onClick={() => setViewCategory(category)}
              className="group flex items-center transition-all active:scale-95"
            >
              <span
                className={`typo-label ${
                  isScrollable ? "text-green-deep" : "text-gray-50"
                }`}
              >
                전체보기
              </span>
              <ArrowRight
                className={`${isScrollable ? "text-green-deep" : "text-gray-50"} h-5 w-5`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 아이템 리스트 */}
      {ingredients.length > 0 ? (
        <div className="mx-auto flex max-w-[375px] justify-between px-4">
          {topIngredients.map(item => (
            <div key={item.id} className="flex flex-col">
              <Item
                name={item.name}
                leftDays={item.dDay}
                image={item.image}
                isSelected={selectedIds.includes(item.id)}
                onSelect={() => {
                  if (onItemClick) {
                    onItemClick(item.id);
                  } else {
                    toggleSelect(item.id);
                  }
                }}
                onDetail={() => {
                  if (!onItemClick) openDetail(item.id);
                }}
                className={item.className}
              />
              <div className="-z-10 mt-[-14px] h-[26px] w-[109px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn flex h-20 flex-col items-center justify-between">
          <span className="typo-caption !font-medium text-[#7A8093]">
            재료를 등록해주세요
          </span>
          <img src={character} className="w-[74px]" alt="empty" />
        </div>
      )}
    </div>
  );
});
