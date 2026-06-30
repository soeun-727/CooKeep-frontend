import {
  type Ingredient,
  useIngredientStore,
} from "@/stores/useIngredientStore";

import character from "@/assets/character/clear_char.svg";
import plus from "@/assets/fridge/plus.svg";
import plusDisabled from "@/assets/fridge/plusDisabled.svg";

import Item from "../items/Item";

interface StorageIngredient extends Ingredient {
  className?: string; // 기존 Ingredient에 className이 있을 수도 있다고 알려줌
}
interface StorageProps {
  category: string;
  image: string;
  ingredients: StorageIngredient[];
  onItemClick?: (id: number) => void;
}
function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Storage({
  category,
  image,
  ingredients,
  onItemClick,
}: StorageProps) {
  const { selectedIds, toggleSelect, setViewCategory, openDetail } =
    useIngredientStore();
  // 3개 이상일 때만 전체보기 활성화
  const isScrollable = ingredients.length >= 3;
  const pages = chunk(ingredients, 3);

  return (
    <div className="relative z-0 min-h-[173px] w-full">
      {/* 배경 레이어 */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col overflow-hidden">
        <div className="h-[115px] w-full rounded-t-[36px] bg-[#E3EBE6]" />
        <div className="relative flex h-12 w-full flex-col bg-[#75D99F]">
          <div className="absolute inset-0 mt-[7px] flex items-start justify-center gap-[6px]">
            {ingredients[0] ? (
              <div className="h-[26px] w-[114px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            ) : (
              <div className="w-[114px]" />
            )}
            {ingredients[1] ? (
              <div className="h-[26px] w-[114px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            ) : (
              <div className="w-[114px]" />
            )}
            {ingredients[2] ? (
              <div className="h-[26px] w-[114px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            ) : (
              <div className="w-[114px]" />
            )}
          </div>
        </div>
        <div className="h-[10px] w-full bg-[#54BE81]" />
      </div>

      {/* 상단 헤더 */}
      <div className="mx-auto max-w-[393px]">
        <div className="relative z-10 px-[20px] pt-[5px] pb-[11px]">
          <div className="flex h-10 w-full items-center justify-between">
            {/* 카테고리 태그 */}
            <div className="flex h-[22px] min-w-[59px] items-center justify-center gap-1 rounded-[6px] bg-neutral-800 px-2 text-(--color-green)">
              <img src={image} alt="category" className="h-3 w-3" />
              <span className="typo-caption leading-none whitespace-nowrap">
                {category}
              </span>
            </div>

            {/* 전체보기 */}
            <button
              disabled={!isScrollable}
              onClick={() => setViewCategory(category)}
              className="group flex items-center gap-1 transition-all active:scale-95"
            >
              <span
                className={`typo-caption !text-[13px] !font-semibold transition-colors ${
                  isScrollable
                    ? "text-[var(--color-green-deep)]"
                    : "text-zinc-500"
                }`}
              >
                전체보기
              </span>
              <img
                src={isScrollable ? plus : plusDisabled}
                className="w-3 transition-opacity"
                alt="plus"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 아이템 리스트 */}
      {ingredients.length > 0 ? (
        <div className="relative z-10 mx-auto w-[353px]">
          <div className="no-scrollbar scroll-snap-x scroll-snap-mandatory flex gap-[6px] overflow-x-auto pb-2">
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="scroll-snap-start flex flex-shrink-0 justify-start gap-[6px]"
                style={{ width: "353px" }}
              >
                {page.map(item => (
                  <Item
                    key={item.id}
                    name={item.name}
                    leftDays={item.dDay}
                    image={item.image}
                    isSelected={selectedIds.includes(item.id)}
                    onSelect={() => {
                      if (onItemClick) {
                        onItemClick(item.id);
                      } else {
                        toggleSelect(item.id);
                      }
                    }}
                    onDetail={() => {
                      if (!onItemClick) openDetail(item.id);
                    }}
                    className={item.className}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn flex h-20 flex-col items-center justify-between">
          <span className="typo-caption !font-medium text-[#7A8093]">
            재료를 등록해주세요
          </span>
          <img src={character} className="w-[74px]" alt="empty" />
        </div>
      )}
    </div>
  );
}
