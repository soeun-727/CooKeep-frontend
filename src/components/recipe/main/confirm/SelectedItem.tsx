import type { Ingredient } from "@/stores/useIngredientStore";
import XIcon from "@/assets/icons/x.svg?react";

interface SelectedItemProps {
  item: Ingredient;
  onRemove: (id: number) => void;
}

export default function SelectedItem({ item, onRemove }: SelectedItemProps) {
  const isUrgent = item.dDay <= 3;

  return (
    <div className="relative h-[70px] w-full flex-1 p-1">
      {/* 유통기한 디데이 */}
      <span
        className={`bg-gray-0 absolute top-[1px] left-1 inline-flex items-center justify-center rounded-full border px-1 py-[1px] text-[8px] leading-2.5 whitespace-nowrap ${
          isUrgent
            ? "border-semantic-negative text-semantic-negative"
            : "border-gray-30 text-gray-50"
        } `}
      >
        {item.dDay >= 0 ? `D-${item.dDay}` : `D+${Math.abs(item.dDay)}`}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-0 right-0 flex h-6 w-6 items-start justify-end px-1 py-[3px]"
      >
        <XIcon className="h-2 w-2" />
      </button>

      {/* 이미지 + 이름 */}
      <div className="flex flex-col items-center">
        <img
          src={item.image}
          alt={item.name}
          className="h-11 w-11 object-cover"
        />
        <span className="text-gray-80 typo-caption line-clamp-1">
          {item.name}
        </span>
      </div>
    </div>
  );
}
