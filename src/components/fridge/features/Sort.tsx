import { useState } from "react";

import {
  type SortOrder,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import SortIcon from "@/assets/fridge/sort.svg?react";

import type { IconComponent } from "@/types/icon";

interface SortProps {
  categoryIcon: IconComponent;
  viewCategory: string;
}

export default function Sort({
  categoryIcon: CategoryIcon,
  viewCategory,
}: SortProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSortOrder } = useIngredientStore();
  const options: SortOrder[] = [
    "유통기한 임박 순",
    "등록 최신 순",
    "등록 오래된 순",
  ];
  return (
    <>
      <div className="mt-[3px] mb-4 flex w-full flex-col items-center">
        <div className="relative flex w-[353px] items-center justify-center">
          <div className="bg-gray-80 text-gray-0 text-3 flex h-[22px] w-[59px] items-center justify-center gap-1 rounded-[6px] px-2">
            <CategoryIcon className="text-green w-3" />
            <span className="typo-caption">{viewCategory}</span>
          </div>

          <div className="absolute right-0 flex items-center">
            {isMenuOpen && (
              <div className="bg-gray-0 animate-fadeIn shadow-add-button rounded-L absolute right-[34px] bottom-0 z-50 flex h-[104px] w-[130px] flex-col items-center justify-center overflow-hidden">
                {options.map((option, index) => (
                  <div
                    key={option}
                    className="flex w-full flex-col items-center"
                  >
                    <button
                      onClick={() => {
                        setSortOrder(option);
                        setIsMenuOpen(false);
                      }}
                      className="typo-caption h-[30px] w-full leading-none !font-semibold whitespace-nowrap"
                    >
                      {option}
                    </button>
                    {/* 구분선 */}
                    {index < options.length - 1 && (
                      <div className="bg-gray-10 h-[0.5px] w-[105px]" />
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 flex-shrink-0"
            >
              <SortIcon className="w-[30px]" aria-label="sort" role="img" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
