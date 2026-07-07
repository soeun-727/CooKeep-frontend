import {
  type Ingredient,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import Item from "./Item";
import { memo, useCallback } from "react";

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
    <div className="mx-auto grid w-[353px] grid-cols-3 gap-x-2 gap-y-2 pb-25">
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
