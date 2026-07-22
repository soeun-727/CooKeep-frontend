import LeftArrow from "@/assets/icons/arrow_left.svg?react";
import RightArrow from "@/assets/icons/arrow_right.svg?react";

interface PagenationProps {
  currentPage: number;
  totalPage: number;
}

export default function RecipePagination({
  currentPage,
  totalPage,
}: PagenationProps) {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPage;

  return (
    <div className="bg-gray-0 typo-caption-strong text-gray-30 flex items-center gap-4 rounded-full px-6 py-1">
      {/* 이전 버튼 */}
      <button
        disabled={isPrevDisabled}
        className={isPrevDisabled ? "text-gray-30" : "text-gray-50"}
      >
        이전
      </button>

      <div className="flex items-center gap-3">
        <LeftArrow className="text-gray-10 w-5" />
        <div className="typo-caption text-green-deep">
          <span>{currentPage}</span>
          <span>/</span>
          <span>{totalPage}</span>
        </div>
        <RightArrow className="text-gray-10 w-5" />
      </div>

      {/* 다음 버튼 */}
      <button
        disabled={isNextDisabled}
        className={isNextDisabled ? "text-gray-30" : "text-gray-50"}
      >
        다음
      </button>
    </div>
  );
}
