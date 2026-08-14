interface RecipeTitleProps {
  name: string;
  category?: string;
  usedItems: number;
}

export default function RecipeTitle({
  name,
  category,
  usedItems,
}: RecipeTitleProps) {
  return (
    <div className="mx-auto flex w-full flex-col gap-2 px-1">
      {category && (
        <span className="bg-green-light text-green-deep typo-caption rounded-S self-start px-3 py-[2px]">
          {category}
        </span>
      )}

      {/* 레시피 이름 */}
      <h2 className="text-gray-80 typo-h2">{name}</h2>
      <p className="typo-l text-gray-50">
        보유한 재료 중 <span className="text-green-deep">{usedItems}개</span>를
        사용했어요!
      </p>
    </div>
  );
}
