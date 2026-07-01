import { Ingredient, IngredientsJson } from "@/api/dailyAiRecipe";

interface RecipeDetailIngredientSectionProps {
  ingredients: IngredientsJson;
}

export default function RecipeDetailIngredientSection({
  ingredients,
}: RecipeDetailIngredientSectionProps) {
  const { user_ingredients, additional_ingredients, optional_ingredients } =
    ingredients;

  // 단위+수량 포맷 함수
  const formatIngredient = (item: Ingredient) => {
    if (!item.quantity) return item.name;
    if (!item.unit) return `${item.name} ${item.quantity}`;
    return `${item.name} ${item.quantity}${item.unit}`;
  };

  // description 기준으로 그룹화
  const groupedOptional = optional_ingredients.reduce(
    (acc, item) => {
      const key = item.description || "생략/대체 가능";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, Ingredient[]>,
  );

  return (
    <div className="flex w-full flex-col gap-8">
      {/* 내가 가진 재료 */}
      <div>
        <span className="typo-body2 text-gray-80">내가 가지고 있는 재료</span>
        <div className="mt-2 flex flex-wrap gap-[5px]">
          {user_ingredients.map((item, idx) => (
            <span
              key={idx}
              className="bg-green-deep text-gray-0 h-[20px] rounded-full px-[12px] text-[12px]"
            >
              {formatIngredient(item)}
            </span>
          ))}
        </div>
      </div>

      {/* 추가로 필요한 재료 */}
      {additional_ingredients.length > 0 && (
        <div>
          <span className="typo-body2 text-gray-80">추가로 필요한 재료</span>
          <div className="mt-2 flex flex-wrap gap-[5px]">
            {additional_ingredients.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-10 h-[20px] rounded-full px-[12px] text-[12px] text-gray-50"
              >
                {formatIngredient(item)}
              </span>
            ))}
          </div>
        </div>
      )}

      {optional_ingredients.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="typo-body2 text-gray-50">대체 / 생략 가능 재료</span>
          {Object.entries(groupedOptional).map(
            ([description, items], groupIdx) => (
              <div key={groupIdx} className="flex flex-col gap-2">
                {/* description 먼저 */}
                <span className="typo-body2 text-gray-80">{description}</span>
                {/* 재료 태그들 */}
                <div className="flex flex-wrap gap-[5px]">
                  {items.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-10 rounded-full px-3 py-[2px] text-[12px] text-gray-50"
                    >
                      {formatIngredient(item)}
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
