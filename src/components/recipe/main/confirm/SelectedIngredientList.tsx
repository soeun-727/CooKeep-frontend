import type { Ingredient } from "../../../../stores/useIngredientStore";

interface Props {
  ingredients: Ingredient[];
}

export default function SelectedIngredientList({ ingredients }: Props) {
  const MAX_PER_ROW = 5;
  const remainder = ingredients.length % MAX_PER_ROW;
  const emptyCount = remainder === 0 ? 0 : MAX_PER_ROW - remainder;

  const sortedIngredients = [...ingredients].sort((a, b) => a.dDay - b.dDay);

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-[361px] mx-auto px-4">
      {/* 제목 / 설명 */}
      <div className="flex flex-col items-center gap-[2px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#1FC16F] text-center">
          내가 선택한 재료
        </h2>
        <p className="text-[12px] leading-[16px] text-[#7D7D7D] text-center">
          보유한 재료로 AI가 레시피를 추천해줘요
        </p>
      </div>

      {/* 재료 컨테이너 */}
      <div
        className="
    w-full
    grid grid-cols-5
    justify-items-center
    gap-y-2
    px-[5px] py-[9px]
    rounded-[10px]
    bg-white
    shadow-[0_-1px_80px_-4px_rgba(32,32,32,0.1)]
  "
      >
        {sortedIngredients.map((item) => {
          const isUrgent = item.dDay <= 3;
          console.log(item.name, item.expiryDate, item.dDay);

          return (
            <div key={item.id} className="relative">
              {/* 유통기한 */}
              <span
                className={`
          absolute bottom-[56px] right-[44px]
          inline-flex items-center justify-center
          px-[5px] py-[1px] whitespace-nowrap leading-2.5
          text-[8px]
          rounded-full border bg-white
          ${
            isUrgent
              ? "border-[#D91F1F] text-[#D91F1F]"
              : "border-[#D1D1D1] text-[#7D7D7D]"
          }
        `}
              >
                {item.dDay >= 0 ? `D-${item.dDay}` : `D+${Math.abs(item.dDay)}`}
              </span>

              {/* 이미지 + 이름 */}
              <div className="w-[70px] h-[70px] flex flex-col items-center">
                <div className="flex flex-col items-center gap-1 w-[56px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[44px] h-[44px] object-cover"
                  />
                  <span className="text-[12px] font-medium leading-[16px] text-[#202020] text-center line-clamp-1">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {Array.from({ length: emptyCount }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="w-[70px] h-[70px] flex items-center justify-center"
          >
            <div className="w-[8px] h-[8px] rounded-full bg-[#EBEBEB] shadow-[inset_0_2px_5.2px_-4px_rgba(0,0,0,0.25)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
