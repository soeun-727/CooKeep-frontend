import { useState } from "react";

import { useIngredientStore } from "@/stores/useIngredientStore";

import BackIcon from "@/assets/back.svg?react";
import SortIcon from "@/assets/fridge/sort.svg?react";

import { SortDropdown } from "../fridge/features/SortDropdown";

interface BackHeaderProps {
  title: string;
  sortIcon: boolean;
}

export const BackHeader = ({ title, sortIcon }: BackHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { viewCategory, setViewCategory, setSortOrder } = useIngredientStore();

  const handleBack = () => {
    if (viewCategory) {
      setViewCategory("");
    } else {
      window.history.back();
    }
  };

  return (
    <section className="relative flex items-center justify-between py-2">
      {/* 뒤로가기 버튼 */}
      <button type="button" onClick={() => handleBack()}>
        <BackIcon className="h-10 w-10" />
      </button>

      {/* 타이틀 */}
      <p className="typo-l-strong">{title}</p>

      {/* 정렬 영역 */}
      <div className="relative flex h-10 w-10 items-center justify-center">
        {sortIcon && (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 focus:outline-none"
            >
              <SortIcon className="h-10 w-10" />
            </button>

            {/* 분리한 드롭다운 컴포넌트 장착 */}
            <SortDropdown
              isOpen={isMenuOpen}
              onSelect={option => {
                setSortOrder(option);
                setIsMenuOpen(false);
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};
