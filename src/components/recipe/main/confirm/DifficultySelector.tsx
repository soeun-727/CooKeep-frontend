import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import easyImg from "@/assets/recipe/main/easyImg.svg";
import hardImg from "@/assets/recipe/main/hardImg.svg";
import normalImg from "@/assets/recipe/main/temp_recipe_title.svg";

const options = [
  {
    key: "EASY",
    title: "Easy",
    time: "10분 이내",
    desc: "빠르고 간편하게",
    image: easyImg,
  },
  {
    key: "NORMAL",
    title: "Normal",
    time: "30분 이내",
    desc: "적당히 차려먹기",
    image: normalImg,
  },
  {
    key: "HARD",
    title: "Hard",
    time: "30분 이상",
    desc: "제대로 요리하기",
    image: hardImg,
  },
] as const;

export default function DifficultySelector() {
  const { difficulty, setDifficulty } = useRecipeFlowStore();

  return (
    <section className="mx-auto mt-[38px] flex w-full max-w-[361px] flex-col items-center gap-4">
      {/* 제목 영역 */}
      <div className="flex w-[188px] flex-col items-center gap-[2px]">
        <h2 className="text-gray-80 w-full text-center text-[20px] leading-[28px] font-semibold">
          난이도 선택
        </h2>
        <p className="text-center text-[12px] leading-[16px] text-gray-50">
          선택한 난이도에 따라 요리가 달라져요
        </p>
      </div>

      {/* 난이도 선택 리스트 */}
      <div className="flex w-full flex-col items-start gap-2">
        {options.map(opt => {
          const selected = difficulty === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => setDifficulty(opt.key)}
              className="bg-gray-0 flex w-full items-center justify-center rounded-[6px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]"
            >
              <div className="flex w-full items-center gap-2 p-3">
                <div className="flex w-full items-center gap-3">
                  {/* 왼쪽 이미지 */}
                  <img
                    src={opt.image}
                    alt={opt.title}
                    className="aspect-square h-[36px] w-[36px] flex-shrink-0"
                  />

                  {/* 텍스트 */}
                  <div className="flex-1">
                    <p className="text-gray-80 text-left text-[16px] leading-[24px] font-medium">
                      <span className="text-green-deep">{opt.time}</span>{" "}
                      {opt.desc}
                    </p>
                  </div>

                  {/* 선택 버튼 */}
                  <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center">
                    <div
                      className={`flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 ${selected ? "border-green" : "border-gray-30"} `}
                    >
                      {selected && (
                        <div className="bg-green h-[14px] w-[14px] rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
