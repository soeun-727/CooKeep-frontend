import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

import character from "@/components/assets/temp_simplelogin_icon.svg";

import Item from "./components/Item";

interface InventoryItem {
  id: string | number;
  name: string;
  image: string;
  categoryId: number;
}
interface ItemsGridProps {
  items: InventoryItem[];
}

export default function ItemsGrid({ items }: ItemsGridProps) {
  const { selectedItems, toggleItem } = useAddIngredientStore();
  return (
    <div className="items-justify-center flex w-full flex-col pt-6">
      <div className="no-scrollbar h-[482px] w-[294px] overflow-y-auto scroll-smooth">
        <div className="grid grid-cols-3 justify-items-center gap-3">
          {items.map(item => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              isSelected={selectedItems.some(i => i.id === item.id)}
              onSelect={() => toggleItem(item)}
            />
          ))}
        </div>
        <div className="mt-4 mb-50 flex flex-col items-center gap-[10px]">
          <img src={character} className="w-[50px]" />
          <button>
            <div className="items-justify-center flex h-6 w-[125px] flex-col rounded-full bg-black">
              <span className="typo-caption text-gray-0 py-1 text-center">
                찾는 재료가 없어요
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
