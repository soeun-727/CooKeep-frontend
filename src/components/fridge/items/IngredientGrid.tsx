import {
  type Ingredient,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import Item from "./Item";

export default function IngredientGrid({ items }: { items: Ingredient[] }) {
  const { selectedIds, toggleSelect, openDetail } = useIngredientStore();

  return (
    <div className="mx-auto grid w-full grid-cols-3 gap-x-2 gap-y-2 px-4 py-6 mb-25">
      {items.map(item => (
        <Item
          key={item.id}
          name={item.name}
          image={item.image}
          leftDays={item.dDay}
          isSelected={selectedIds.includes(item.id)}
          onSelect={() => toggleSelect(item.id)}
          onDetail={() => openDetail(item.id)}
        />
      ))}
    </div>
  );
}
