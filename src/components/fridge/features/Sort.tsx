import { useState } from "react";
import sortIcon from "../../../assets/fridge/sort.svg";
import {
  useIngredientStore,
  type SortOrder,
} from "../../../stores/useIngredientStore";

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
      <div className="w-full flex flex-col items-center mt-[3px] mb-4">
        <div className="w-[353px] relative items-center justify-center flex">
          <div className="flex items-center justify-center bg-neutral-800 rounded-[6px] h-[22px] w-[59px] px-2 gap-1 text-white text-3">
            <img src={categoryIcon} alt="category" className="w-3" />
            <span className="typo-caption">{viewCategory}</span>
          </div>

          <div className="absolute right-0 flex items-center">
            {isMenuOpen && (
              <div className="absolute right-[34px] bottom-0 flex flex-col items-center justify-center bg-white rounded-[10px] w-[130px] h-[104px] shadow-[0_1px_8.2px_-2px_#11111140] animate-fadeIn z-50 overflow-hidden">
                {options.map((option, index) => (
                  <div
                    key={option}
                    className="flex flex-col items-center w-full"
                  >
                    <button
                      onClick={() => {
                        setSortOrder(option);
                        setIsMenuOpen(false);
                      }}
                      className="whitespace-nowrap w-full h-[30px] typo-caption !font-semibold leading-none"
                    >
                      {option}
                    </button>
                    {/* 구분선 */}
                    {index < options.length - 1 && (
                      <div className="w-[105px] h-[0.5px] bg-[#D1D1D1]" />
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
