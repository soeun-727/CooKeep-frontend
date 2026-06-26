import { IngredientItem } from "../../../../types/aiRecipe";

interface Props {
  selectedIngredients: IngredientItem[];
  requiredIngredients?: IngredientItem[];
  substitutions?: IngredientItem[]; // API의 optional_ingredients
}

export default function RecipeIngredientSection({
  selectedIngredients,
  requiredIngredients = [],
  substitutions = [],
}: Props) {
  const formatIngredient = (item: IngredientItem) => {
    if (!item.quantity) return item.name;

    if (!item.unit) return `${item.name} ${item.quantity}`;

    return `${item.name} ${item.quantity}${item.unit}`;
  };

  // --- 추가된 로직: description별로 재료 그룹화 ---
  const groupedSubstitutions = substitutions.reduce(
    (acc, item) => {
      const key = item.description || "기타"; // 메시지가 없는 경우 대비
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, IngredientItem[]>,
  );

  return (
    <div className="flex flex-col items-start gap-[36px] w-full">
      <div className="flex flex-col items-start gap-4 w-full">
        {/* 내 재료 섹션 */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="typo-label text-gray-80">내가 가지고 있는 재료</span>
          <div className="flex flex-wrap items-start gap-[5px]">
            {selectedIngredients.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center justify-center h-[20px] px-[12px] rounded-full bg-green-deep text-white text-[12px] leading-[16px] font-medium"
              >
                {formatIngredient(item)}
              </span>
            ))}
          </div>
        </div>

        {/* 추가로 필요한 재료 섹션 */}
        {requiredIngredients.length > 0 && (
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="typo-label text-gray-80">추가로 필요한 재료</span>
            <div className="flex flex-wrap items-start gap-[5px]">
              {requiredIngredients.map((item, idx) => (
                <span
                  key={idx}
                  className="flex items-center justify-center h-[20px] px-[12px] rounded-full bg-gray-10 text-gray-50 text-[12px] leading-[16px] font-medium"
                >
                  {formatIngredient(item)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- 수정된 대체/생략 가능 재료 섹션 --- */}
      {substitutions.length > 0 && (
        <div className="flex flex-col items-start gap-[10px] self-stretch w-full">
          {/* 섹션 타이틀 */}
          <span className="self-stretch text-gray-50 typo-label">
            대체/생략 가능 재료
          </span>

          {/* 그룹화된 리스트 컨테이너 */}
          <div className="flex flex-col items-start gap-[16px] self-stretch w-full">
            {Object.entries(groupedSubstitutions).map(
              ([description, items], groupIdx) => (
                <div
                  key={groupIdx}
                  className="flex flex-col items-start gap-[10px] w-[331px]"
                >
                  {/* 메시지 (재료보다 위로 노출) */}
                  <span className="w-[255px] typo-label">{description}</span>

                  {/* 해당 메시지에 속한 재료 리스트 */}
                  <div className="flex flex-wrap items-start content-start gap-x-[6px] gap-y-[5px] self-stretch">
                    {items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex px-[12px] py-[2px] justify-center items-center gap-[8px] rounded-[100px] bg-gray-10"
                      >
                        <span className="text-gray-50 text-center text-[12px] leading-[16px] font-medium whitespace-nowrap">
                          {formatIngredient(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
