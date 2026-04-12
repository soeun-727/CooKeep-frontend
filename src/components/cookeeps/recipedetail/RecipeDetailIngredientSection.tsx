import { Ingredient, IngredientsJson } from "../../../api/dailyAiRecipe";

interface Props {
  ingredients: IngredientsJson;
}

export default function RecipeDetailIngredientSection({ ingredients }: Props) {
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
    <div className="flex flex-col gap-8 w-full">
      {/* 내가 가진 재료 */}
      <div>
        <span className="typo-body2 text-[#202020]">내가 가지고 있는 재료</span>
        <div className="flex flex-wrap gap-[5px] mt-2">
          {user_ingredients.map((item, idx) => (
            <span
              key={idx}
              className="h-[20px] px-[12px] rounded-full bg-[#1FC16F] text-white text-[12px]"
            >
              {formatIngredient(item)}
            </span>
          ))}
        </div>
      </div>

      {/* 추가로 필요한 재료 */}
      {additional_ingredients.length > 0 && (
        <div>
          <span className="typo-body2 text-[#202020]">추가로 필요한 재료</span>
          <div className="flex flex-wrap gap-[5px] mt-2">
            {additional_ingredients.map((item, idx) => (
              <span
                key={idx}
                className="h-[20px] px-[12px] rounded-full bg-[#EBEBEB] text-[#7D7D7D] text-[12px]"
              >
                {formatIngredient(item)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 대체/생략 가능 재료 - description 위에, 재료 아래 */}
      {/* {optional_ingredients.length > 0 && (
        <div>
          <span className="typo-body2 text-[#7D7D7D]">
            대체 / 생략 가능 재료
          </span>

          <div className="flex flex-col gap-2 mt-2">
            {optional_ingredients.map((item, idx) => (
              <div key={idx} className="flex items-start w-full"> */}
      {/* 왼쪽: 재료 영역 (폭 고정) */}
      {/* <div className="w-[80px] flex justify-start">
                  <span className="px-3 py-[2px] rounded-full bg-[#EBEBEB] text-[12px] text-[#7D7D7D]">
                    {item.name}
                  </span>
                </div> */}

      {/* 오른쪽: 설명 */}
      {/* <span className="text-sm text-[#202020] leading-5">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )} */}
      {optional_ingredients.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="typo-body2 text-[#7D7D7D]">
            대체 / 생략 가능 재료
          </span>
          {Object.entries(groupedOptional).map(
            ([description, items], groupIdx) => (
              <div key={groupIdx} className="flex flex-col gap-2">
                {/* description 먼저 */}
                <span className="typo-body2 text-[#202020]">{description}</span>
                {/* 재료 태그들 */}
                <div className="flex flex-wrap gap-[5px]">
                  {items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-[2px] rounded-full bg-[#EBEBEB] text-[12px] text-[#7D7D7D]"
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
