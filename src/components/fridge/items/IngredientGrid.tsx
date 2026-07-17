import { memo, useCallback } from "react";

import {
  type Ingredient,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import Item from "./Item";

export default memo(function IngredientGrid({
  items,
}: {
  items: Ingredient[];
}) {
  const { selectedIds, toggleSelect, openDetail } = useIngredientStore();

  const handleSelect = useCallback(
    (id: number) => toggleSelect(id),
    [toggleSelect],
  );

  const handleDetail = useCallback(
    (id: number) => openDetail(id),
    [openDetail],
  );

  return (
    <div className="mx-auto mb-25 grid w-full grid-cols-3 gap-x-2 gap-y-2 px-4 py-6">
      {items.map(item => (
        <Item
          key={item.id}
          name={item.name}
          image={item.image}
          leftDays={item.dDay}
          isSelected={selectedIds.includes(item.id)}
          onSelect={() => handleSelect(item.id)}
          onDetail={() => handleDetail(item.id)}
        />
      ))}
    </div>
  );
});
