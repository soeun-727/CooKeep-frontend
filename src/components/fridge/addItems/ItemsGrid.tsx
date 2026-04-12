import Item from "./components/Item";
import character from "../../../../assets/temp_simplelogin_icon.svg";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";

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
    <div className="w-full flex flex-col items-justify-center pt-6">
      <div className="w-[294px] h-[482px] overflow-y-auto no-scrollbar scroll-smooth">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              isSelected={selectedItems.some((i) => i.id === item.id)}
              onSelect={() => toggleItem(item)}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-[10px] mt-4 mb-50">
          <img src={character} className="w-[50px]" />
          <button>
            <div className="flex flex-col items-justify-center rounded-full bg-black w-[125px] h-6">
              <span className="typo-caption text-white text-center py-1">
                찾는 재료가 없어요
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
