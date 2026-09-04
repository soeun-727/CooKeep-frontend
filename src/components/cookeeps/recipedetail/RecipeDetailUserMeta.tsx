interface RecipeDetailUserMetaProps {
  userName: string;
  category?: string;
  title: string;
  usedItems: number;
}

export default function RecipeDetailUserMeta({
  userName,
  category,
  title,
  usedItems,
}: RecipeDetailUserMetaProps) {
  return (
    <div className="mx-auto flex w-full flex-col gap-2 px-1">
      <div className="flex items-center gap-2">
        {category && (
          <span className="bg-green-light text-green-deep typo-caption rounded-S px-3 py-[2px]">
            {category}
          </span>
        )}
        <div className="bg-green-light text-green-deep typo-caption rounded-S px-3 py-[2px]">
          <span>{userName} 님의 레시피</span>
        </div>
      </div>

      {/* 레시피 이름 */}
      <h2 className="text-gray-80 typo-h2">{title}</h2>
      <p className="typo-l text-gray-50">
        보유한 재료 중 <span className="text-green-deep">{usedItems}개</span>를
        사용했어요!
      </p>
    </div>
  );
}
