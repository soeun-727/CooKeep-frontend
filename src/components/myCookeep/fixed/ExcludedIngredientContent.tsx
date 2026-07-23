// TODO: 못먹는 재료 페이지 만들고 연결하기
import { useNavigate } from "react-router-dom";

import BookmarkIcon from "@/assets/mycookeep/bookmark.svg?react";

export const ExcludedIngredientContent = () => {
  const navigate = useNavigate();

  const handleExcludedIngredientsClick = () => {
    navigate("/mycookeep/excluded-ingredients");
  };

  return (
    <button
      className="border-gray-10 bg-gray-0 flex cursor-pointer items-center justify-center rounded-[8px] border px-3 py-2"
      onClick={handleExcludedIngredientsClick}
    >
      <p className="typo-label text-gray-50">못 먹는 재료 관리</p>
      <BookmarkIcon className="h-6 w-6" />
    </button>
  );
};
