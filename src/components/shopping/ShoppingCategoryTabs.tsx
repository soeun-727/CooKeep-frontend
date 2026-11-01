import type { ShoppingIngredient } from "@/types/shopping";

interface ShoppingCategoryTabsProps {
  ingredients: ShoppingIngredient[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function ShoppingCategoryTabs({
  ingredients,
  selectedId,
  onSelect,
}: ShoppingCategoryTabsProps) {
  return (
    <div
      className="no-scrollbar flex w-full overflow-x-auto px-4"
      aria-label="재료 선택"
    >
      {ingredients.map(ingredient => (
        <button
          key={ingredient.id}
          type="button"
          aria-pressed={selectedId === ingredient.id}
          onClick={() => onSelect(ingredient.id)}
          className={`typo-m-strong h-9 shrink-0 border-b-2 px-3 py-2 whitespace-nowrap ${
            selectedId === ingredient.id
              ? "border-green text-gray-80"
              : "text-gray-30 border-transparent"
          }`}
        >
          {ingredient.name}
        </button>
      ))}
    </div>
  );
}
