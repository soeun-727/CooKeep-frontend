import { useState } from "react";

import {
  type SortOrder,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import sortIcon from "@/assets/fridge/sort.svg";

interface SortProps {
  categoryIcon: string;
  viewCategory: string; // 추가: 카테고리 텍스트를 받아야 합니다.
}

export default function Sort({ categoryIcon, viewCategory }: SortProps) {
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
          <div className="text-3 flex h-[22px] w-[59px] items-center justify-center gap-1 rounded-[6px] bg-neutral-800 px-2 text-white">
            <img src={categoryIcon} alt="category" className="w-3" />
            <span className="typo-caption">{viewCategory}</span>
          </div>

          <div className="absolute right-0 flex items-center">
            {isMenuOpen && (
              <div className="animate-fadeIn absolute right-[34px] bottom-0 z-50 flex h-[104px] w-[130px] flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white shadow-[0_1px_8.2px_-2px_#11111140]">
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
                      <div className="h-[0.5px] w-[105px] bg-[#D1D1D1]" />
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 flex-shrink-0"
            >
              <img src={sortIcon} className="w-[30px]" alt="sort" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
