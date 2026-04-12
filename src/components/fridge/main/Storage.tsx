import plus from "../../../assets/fridge/plus.svg";
import plusDisabled from "../../../assets/fridge/plusDisabled.svg";
import Item from "../items/Item";
import character from "../../../assets/character/clear_char.svg";
import {
  useIngredientStore,
  type Ingredient,
} from "../../../stores/useIngredientStore";
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
    <div className="relative w-full min-h-[173px] z-0">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 -z-10 flex flex-col overflow-hidden pointer-events-none">
        <div className="w-full h-[115px] rounded-t-[36px] bg-[#E3EBE6]" />
        <div className="flex flex-col relative w-full bg-[#75D99F] h-12">
          <div className="absolute inset-0 flex gap-[6px] items-start justify-center mt-[7px]">
            {ingredients[0] ? (
              <div className="w-[114px] h-[26px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            ) : (
              <div className="w-[114px]" />
            )}
            {ingredients[1] ? (
              <div className="w-[114px] h-[26px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            ) : (
              <div className="w-[114px]" />
            )}
            {ingredients[2] ? (
              <div className="w-[114px] h-[26px] rounded-[7px] bg-[#63C88D] blur-[1px]" />
            ) : (
              <div className="w-[114px]" />
            )}
          </div>
        </div>
        <div className="w-full bg-[#54BE81] h-[10px]" />
      </div>

      {/* 상단 헤더 */}
      <div className="max-w-[393px] mx-auto">
        <div className="relative z-10 px-[20px] pt-[5px] pb-[11px]">
          <div className="flex justify-between w-full h-10 items-center">
            {/* 카테고리 태그 */}
            <div className="flex items-center justify-center bg-neutral-800 rounded-[6px] h-[22px] min-w-[59px] px-2 gap-1 text-(--color-green)">
              <img src={image} alt="category" className="w-3 h-3" />
              <span className="typo-caption leading-none whitespace-nowrap">
                {category}
              </span>
            </div>

            {/* 전체보기 */}
            <button
              disabled={!isScrollable}
              onClick={() => setViewCategory(category)}
              className="flex items-center gap-1 group transition-all active:scale-95"
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
        <div className="relative w-[353px] mx-auto z-10">
          <div
            className="flex gap-[6px] overflow-x-auto no-scrollbar pb-2
        scroll-snap-x scroll-snap-mandatory"
          >
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="flex gap-[6px] justify-start flex-shrink-0 scroll-snap-start"
                style={{ width: "353px" }}
              >
                {page.map((item) => (
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
        <div className="flex flex-col items-center h-20 animate-fadeIn justify-between">
          <span className="typo-caption text-[#7A8093] !font-medium">
            재료를 등록해주세요
          </span>
          <img src={character} className="w-[74px]" alt="empty" />
        </div>
      )}
    </div>
  );
}
