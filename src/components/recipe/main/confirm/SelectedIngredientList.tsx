import { useNavigate } from "react-router-dom";

import type { Ingredient } from "@/stores/useIngredientStore";

import PlusIcon from "@/assets/icons/plus.svg?react";

import SelectedItem from "./SelectedItem";

interface SelectedIngredientListProps {
  ingredients: Ingredient[];
  onRemove: (id: number) => void;
}

export default function SelectedIngredientList({
  ingredients,
  onRemove,
}: SelectedIngredientListProps) {
  const MAX_PER_ROW = 5;
  const totalCountWithButton = ingredients.length + 1;
  const emptyCount =
    totalCountWithButton < MAX_PER_ROW
      ? MAX_PER_ROW - totalCountWithButton
      : totalCountWithButton % MAX_PER_ROW === 0
        ? 0
        : MAX_PER_ROW - (totalCountWithButton % MAX_PER_ROW);
  const sortedIngredients = [...ingredients].sort((a, b) => a.dDay - b.dDay);
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-center gap-4">
      {/* 제목 / 설명 */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-gray-80 typo-h3 text-center">내가 선택한 재료</h2>
        <p className="typo-m text-gray-50">
          보유한 재료로 AI가 레시피를 추천해줘요
        </p>
      </div>

      {/* 재료 컨테이너 */}
      <div className="bg-gray-0 rounded-L border-gray-10 grid w-full grid-cols-5 justify-items-center gap-y-1 border px-2 py-3">
        {sortedIngredients.map(item => (
          <SelectedItem key={item.id} item={item} onRemove={onRemove} />
        ))}

        {/* 재료 추가 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex h-[70px] w-full flex-1 flex-col items-center justify-center p-1"
        >
          <div className="flex h-11 w-11 items-center justify-center">
            <PlusIcon className="h-6 w-6" />
          </div>
          <div className="text-gray-30 typo-caption">재료 추가</div>
        </button>

        {/* 빈 원 슬롯들 */}
        {Array.from({ length: emptyCount }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="flex h-[70px] w-[70px] items-center justify-center"
          >
            <div className="bg-gray-10 h-2 w-2 rounded-full shadow-inner" />
          </div>
        ))}
      </div>
    </section>
  );
}
