import { useState } from "react";

import { useIngredientStore } from "@/stores/useIngredientStore";

import BackIcon from "@/assets/back.svg?react";
import SortIcon from "@/assets/fridge/sort.svg?react";

import { SortDropdown } from "../fridge/features/SortDropdown";

interface BackHeaderProps {
  title?: string;
  sortIcon?: boolean;
  recipeOptionMenu?: boolean;
  onBack?: () => void;
}

export const BackHeader = ({
  title,
  sortIcon = false,
  onBack,
}: BackHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { viewCategory, setViewCategory, setSortOrder } = useIngredientStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (viewCategory) {
      setViewCategory("");
    } else {
      window.history.back();
    }
  };

  return (
    <section className="relative flex h-10 w-full items-center justify-between py-2">
      {/* 1. 뒤로가기 버튼 */}
      <button
        type="button"
        onClick={() => handleBack()}
        className="z-10 flex h-10 w-10 items-center justify-center"
      >
        <BackIcon className="h-5 w-5" />
      </button>
      {/* 2. 타이틀 (absolute 수평 중앙 정렬) */}
      {title && (
        <p className="typo-l-strong pointer-events-none absolute inset-x-0 text-center">
          {title}
        </p>
      )}
      {/* 3. 정렬 영역 */}
      {sortIcon && (
        <div className="relative z-10 flex h-10 w-10 items-center justify-center">
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 focus:outline-none"
            >
              <SortIcon className="h-10 w-10" />
            </button>

            <SortDropdown
              isOpen={isMenuOpen}
              onSelect={option => {
                setSortOrder(option);
                setIsMenuOpen(false);
              }}
            />
          </>
        </div>
      )}
    </section>
  );
};
