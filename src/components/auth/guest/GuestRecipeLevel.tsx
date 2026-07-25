import { useEffect, useState } from "react";

import {
  GUEST_INGREDIENTS,
  REQUIRED_RECIPE_IDS,
} from "@/constants/guestIngredients";
import { DIFFICULTY_OPTIONS } from "@/constants/recipeDifficulty";
import type { Ingredient } from "@/stores/useIngredientStore";

import DifficultySelector from "@/components/recipe/main/confirm/DifficultySelector";
import SelectedIngredientList from "@/components/recipe/main/confirm/SelectedIngredientList";
import Button from "@/components/ui/Button";

interface GuestRecipeLevelProps {
  onNext: () => void;
  isDimmed?: boolean;
  setIsDimmed?: (dimmed: boolean) => void;
  ingredients?: Ingredient[];
}

export default function GuestRecipeLevel({
  onNext,
  isDimmed = false,
  setIsDimmed,
  ingredients,
}: GuestRecipeLevelProps) {
  useEffect(() => {
    setIsDimmed?.(false);
  }, [setIsDimmed]);

  const targetIngredients = (ingredients ?? GUEST_INGREDIENTS).filter(item =>
    REQUIRED_RECIPE_IDS.includes(item.id),
  );

  const [difficulty, setDifficulty] = useState<string | null>(null);
  const dessertOption = DIFFICULTY_OPTIONS.find(opt => opt.title === "Dessert");

  return (
    <div
      onClick={() => {
        if (!isDimmed) setIsDimmed?.(true);
      }}
      className="relative flex w-full flex-col items-center px-4"
    >
      <div className="no-scrollbar mt-[30px] flex w-full flex-col gap-[30px] overflow-y-auto pb-28">
        <div className="pointer-events-none select-none">
          <SelectedIngredientList
            ingredients={targetIngredients}
            onRemove={() => {}}
          />
        </div>

        <div className="relative w-full">
          <DifficultySelector
            value={difficulty}
            onChange={(val: string) => setDifficulty(val)}
          />

          {isDimmed && dessertOption && (
            <div className="pointer-events-none absolute inset-0 z-[110] mt-[86px] flex w-full flex-col items-center">
              <div className="pointer-events-none flex w-full flex-col items-center gap-1 pb-4 opacity-0">
                <h2 className="typo-h3 text-center">음식 종류 선택</h2>
                <p className="typo-m text-center">
                  어떤 종류의 음식으로 레시피를 생성할까요?
                </p>
              </div>

              <div className="grid w-full grid-cols-3 gap-1">
                <div />
                <div />
                {/* 오버레이 위 디저트 버튼만 클릭 가능 */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setDifficulty(dessertOption.key);
                  }}
                  className={`rounded-S pointer-events-auto flex w-full cursor-pointer flex-col items-center justify-center border p-3 transition-all ${
                    difficulty === dessertOption.key
                      ? "border-green-deep bg-green-light"
                      : "bg-gray-0 border-gray-10"
                  }`}
                >
                  <div className="flex w-full flex-col items-center">
                    <img
                      src={dessertOption.image}
                      alt={dessertOption.title}
                      className="aspect-square h-9 w-9 flex-shrink-0"
                    />
                    <p className="text-gray-80 typo-label">
                      {dessertOption.desc}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 AI 레시피 추천받기 버튼 */}
      <div
        className={`pointer-events-auto fixed bottom-[env(safe-area-inset-bottom)] flex w-full max-w-[450px] justify-center px-4 ${
          isDimmed ? "z-[110]" : "z-20"
        }`}
        onClick={e => {
          if (isDimmed) e.stopPropagation();
        }}
      >
        <Button
          size="L"
          variant="green"
          disabled={!difficulty}
          onClick={onNext}
        >
          AI 레시피 추천받기
        </Button>
      </div>
    </div>
  );
}
