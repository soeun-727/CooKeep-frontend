import {
  useIngredientStore,
  type Ingredient,
} from "../../../stores/useIngredientStore";
import Item from "./Item";

export default function IngredientGrid({ items }: { items: Ingredient[] }) {
  const { selectedIds, toggleSelect, openDetail } = useIngredientStore();

  return (
    <div className="mx-auto w-[353px] grid grid-cols-3 gap-y-2 gap-x-2 pb-25">
      {items.map((item) => (
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
