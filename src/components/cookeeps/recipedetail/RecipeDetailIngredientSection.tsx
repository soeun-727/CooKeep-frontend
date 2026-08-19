import {
  RecipeDetailContent,
  UserIngredientItem,
  ExtraIngredientItem,
} from "@/api/cookeeps";

interface RecipeDetailIngredientSectionProps {
  ingredients: RecipeDetailContent["ingredients"];
}

export default function RecipeDetailIngredientSection({
  ingredients,
}: RecipeDetailIngredientSectionProps) {
  const { user_ingredients, additional_ingredients, optional_ingredients } =
    ingredients;

  // 단위+수량 포맷 함수
  const formatIngredient = (item: UserIngredientItem | ExtraIngredientItem) => {
    if (!item.quantity) return item.name;
    if (!item.unit) return `${item.name} ${item.quantity}`;
    return `${item.name} ${item.quantity}${item.unit}`;
  };


 return (
    <div className="bg-gray-0 border-gray-10 rounded-L flex w-full flex-col items-start gap-4 border px-3 py-4">
      <p className="typo-l-strong text-gray-80">필요한 재료</p>

      {/* 내가 가지고 있는 재료 */}
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full justify-center">
          <div className="flex h-5 w-5 items-center justify-start">
            <div className="bg-green h-2 w-2 rounded-full" />
          </div>
          <div className="typo-m-strong text-gray-80 flex-1">사용한 재료</div>
        </div>
        <div className="flex flex-wrap items-start gap-2">
          {user_ingredients.map((item, idx) => (
            <span
              key={idx}
              className="bg-green-light text-green-deep rounded-S typo-label flex h-7 items-center justify-center px-3 py-1"
            >
              {formatIngredient(item)}
            </span>
          ))}
        </div>
      </div>

      {/* 추가로 필요한 재료 */}
      {additional_ingredients.length > 0 && (
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full justify-center">
            <div className="flex h-5 w-5 items-center justify-start">
              <div className="bg-gray-30 h-2 w-2 rounded-full" />
            </div>
            <div className="typo-m-strong text-gray-80 flex-1">
              추가로 필요한 재료
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-[5px]">
            {additional_ingredients.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-10 rounded-S typo-label flex h-7 items-center justify-center px-3 py-1 text-gray-50"
              >
                {formatIngredient(item)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 대체/생략 가능 재료 */}
      {optional_ingredients.length > 0 && (
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full justify-center">
            <div className="flex h-5 w-5 items-center justify-start">
              <div className="bg-gray-30 h-2 w-2 rounded-full" />
            </div>
            <div className="typo-m-strong text-gray-80 flex-1">
              재료가 없다면?
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            {optional_ingredients.map((item, idx) => (
              <div
                key={idx}
                className="text-gray-80 border-gray-10 flex w-full flex-col items-start gap-1 border-b py-2 first:pt-0 last:border-none last:pb-0"
              >
                <div className="typo-m-strong w-full">
                  {formatIngredient(item)}
                </div>
                {item.description && (
                  <span className="typo-m w-full">{item.description}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}