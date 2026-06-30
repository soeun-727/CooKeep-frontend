import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import easyImg from "@/assets/recipe/main/easyImg.svg";
import normalImg from "@/assets/recipe/main/normalImg.svg";
import hardImg from "@/assets/recipe/main/hardImg.svg";

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
      <div className="flex flex-col items-center gap-[2px] w-[188px]">
        <h2 className="w-full text-center text-[20px] font-semibold leading-[28px] text-gray-80">
          난이도 선택
        </h2>
        <p className="text-[12px] leading-[16px] text-gray-50 text-center">
          선택한 난이도에 따라 요리가 달라져요
        </p>
      </div>

      {/* 난이도 선택 리스트 */}
      <div className="flex w-full flex-col items-start gap-2">
        {options.map((opt) => {
          const selected = difficulty === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => setDifficulty(opt.key)}
              className="w-full flex justify-center items-center rounded-[6px] bg-gray-0 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]"
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
                    <p className="text-[16px] text-left font-medium leading-[24px] text-gray-80">
                      <span className="text-green-deep">{opt.time}</span>{" "}
                      {opt.desc}
                    </p>
                  </div>

                  {/* 선택 버튼 */}
                  <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center">
                    <div
                      className={`
      w-[24px] h-[24px] rounded-full
      border-2 flex items-center justify-center
      ${selected ? "border-green" : "border-gray-30"}
    `}
                    >
                      {selected && (
                        <div className="w-[14px] h-[14px] rounded-full bg-green" />
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
