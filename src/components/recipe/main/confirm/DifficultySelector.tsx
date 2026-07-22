import { useState } from "react";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";

import randomImg from "@/assets/recipe/select/random.svg";

import { DIFFICULTY_OPTIONS } from "@/constants/recipeDifficulty";

export default function DifficultySelector() {
  const { difficulty, setDifficulty } = useRecipeFlowStore();
  const [isRandomPending, setIsRandomPending] = useState(false);

  const handleRandomClick = () => {
    setIsRandomPending(true);
    setDifficulty("RANDOM" as any);
    setTimeout(() => {
      setIsRandomPending(false);
    }, 200);
  };

  const isRandomSelected =
    (difficulty as string) === "RANDOM" || isRandomPending;

  return (
    <section className="mx-auto flex w-full flex-col items-center">
      {/* 제목 영역 */}
      <div className="flex w-full flex-col items-center gap-1 pb-4">
        <h2 className="text-gray-80 typo-h3 text-center">음식 종류 선택</h2>
        <p className="typo-m text-center text-gray-50">
          어떤 종류의 음식으로 레시피를 생성할까요?
        </p>
      </div>

      {/* 난이도 선택 리스트 */}
      <div className="grid w-full grid-cols-3 gap-1">
        {DIFFICULTY_OPTIONS.map(opt => {
          const selected = difficulty === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => setDifficulty(opt.key)}
              className={`rounded-S flex w-full cursor-pointer flex-col items-center justify-center border p-3 ${
                selected
                  ? "border-green-deep bg-green-light"
                  : "bg-gray-0 border-gray-10"
              }`}
            >
              <div className="flex w-full flex-col items-center">
                <img
                  src={opt.image}
                  alt={opt.title}
                  className="aspect-square h-9 w-9 flex-shrink-0"
                />
                <p className="text-gray-80 typo-label">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* TO DO: 랜덤 레시피 로직 추가 */}
      <button
        onClick={handleRandomClick}
        className={`bg-green-exception border-gray-10 rounded-S mt-2 flex w-full gap-3 border p-3 ${
          isRandomSelected
            ? "border-green-deep bg-green-light"
            : "bg-green-exception border-gray-10"
        }`}
      >
        <img src={randomImg} alt="random" className="w-[38px]" />
        <div className="text-left">
          <p
            className={`typo-m-strong ${isRandomSelected ? "text-green-deep" : "text-gray-80"}`}
          >
            아무거나 추천받기
          </p>
          <p className="typo-m text-gray-50">쿠킵이 랜덤으로 골라드려요</p>
        </div>
      </button>
    </section>
  );
}
