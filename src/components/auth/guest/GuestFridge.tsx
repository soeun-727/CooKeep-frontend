import { useState } from "react";

import { type Ingredient } from "@/stores/useIngredientStore";
import {
  GUEST_INGREDIENTS,
  REQUIRED_RECIPE_IDS,
} from "@/constants/guestIngredients";

import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";
import Triangle from "@/assets/guest/triangle.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import Item from "@/components/fridge/items/Item";
import Storage from "@/components/fridge/main/Storage";
import FloatingNotice from "@/components/recipe/main/FloatingNotice";
import Button from "@/components/ui/Button";
import { Search } from "@/components/fridge/features/Search";

interface GuestFridgeProps {
  onNext: () => void;
  mode?: "fridge" | "recipe";
  isDimmed: boolean;
  setIsDimmed: (dimmed: boolean) => void;
  ingredients?: Ingredient[];
}

export default function GuestFridge({
  onNext,
  mode = "fridge",
  isDimmed,
  setIsDimmed,
  ingredients = GUEST_INGREDIENTS,
}: GuestFridgeProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const currentIngredients =
    mode === "recipe" ? ingredients : ingredients.filter(i => i.id !== 6);
  const getIngredient = (id: number) =>
    currentIngredients.find(item => item.id === id);

  const handleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };
  const isAllRequiredSelected = REQUIRED_RECIPE_IDS.every(id =>
    selectedIds.includes(id),
  );

  return (
    <div
      onClickCapture={e => {
        if (mode === "recipe" && !isDimmed) {
          e.stopPropagation();
          setIsDimmed(true);
        }
      }}
      onClick={() => setIsDimmed(true)}
      className="relative h-[calc(100dvh-40px)] w-full max-w-[450px]"
    >
      <div className="relative flex w-full flex-col gap-6">
        <div className="mt-3 px-4">
          <Search
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="relative w-full">
          {mode === "recipe" && (
            <FloatingNotice text="요리할 재료를 선택해 주세요" />
          )}

          <div className="relative z-0 flex w-full flex-col gap-[10px]">
            <Storage
              category="냉장"
              icon={FridgeIcon}
              ingredients={currentIngredients.filter(
                i => i.category === "냉장",
              )}
            />
            <Storage
              category="냉동"
              icon={FreezerIcon}
              ingredients={currentIngredients.filter(
                i => i.category === "냉동",
              )}
            />
            <Storage
              category="상온"
              icon={PantryIcon}
              ingredients={currentIngredients.filter(
                i => i.category === "상온",
              )}
            />
          </div>
          {mode === "recipe" && isDimmed && (
            <div className="pointer-events-none absolute inset-0 left-1/2 z-[100] flex w-full -translate-x-1/2 flex-col items-center gap-[77px]">
              {/* 1. 냉장 영역 (우유:1, 딸기:2) */}
              <div className="flex w-full max-w-[375px] flex-col gap-2 px-4 py-2 pt-14">
                <div className="grid grid-cols-3 gap-2">
                  {getIngredient(1) && (
                    <div className="pointer-events-auto flex flex-col">
                      <Item
                        image={getIngredient(1)!.image}
                        name={getIngredient(1)!.name}
                        leftDays={getIngredient(1)!.dDay}
                        isSelected={selectedIds.includes(1)}
                        onSelect={() => handleSelect(1)}
                      />
                      <div className="rounded-S -z-10 -mt-4 h-[26px] w-[109px] bg-[#63C88D] blur-[1px]" />
                    </div>
                  )}
                  {getIngredient(2) && (
                    <div className="pointer-events-auto flex flex-col">
                      <Item
                        image={getIngredient(2)!.image}
                        name={getIngredient(2)!.name}
                        leftDays={getIngredient(2)!.dDay}
                        isSelected={selectedIds.includes(2)}
                        onSelect={() => handleSelect(2)}
                      />
                      <div className="rounded-S -z-10 -mt-4 h-[26px] w-[109px] bg-[#63C88D] blur-[1px]" />
                    </div>
                  )}
                  <div className="h-20" />
                </div>
              </div>

              {/* 2. 냉동 영역 (베이글:6) */}
              <div className="flex w-full max-w-[375px] flex-col gap-2 px-4 py-2">
                <div className="grid grid-cols-3 gap-2">
                  {getIngredient(6) && (
                    <div className="pointer-events-auto flex flex-col">
                      <Item
                        image={getIngredient(6)!.image}
                        name={getIngredient(6)!.name}
                        leftDays={getIngredient(6)!.dDay}
                        isSelected={selectedIds.includes(6)}
                        onSelect={() => handleSelect(6)}
                      />
                      <div className="rounded-S -z-10 -mt-4 h-[26px] w-[109px] bg-[#63C88D] blur-[1px]" />
                    </div>
                  )}
                </div>
              </div>

              {/* 3. 상온 영역 (바나나:4) */}
              <div className="flex w-full max-w-[375px] flex-col gap-2 px-4 py-2">
                <div className="grid grid-cols-3 gap-2">
                  {getIngredient(4) && (
                    <div className="pointer-events-auto flex flex-col">
                      <Item
                        image={getIngredient(4)!.image}
                        name={getIngredient(4)!.name}
                        leftDays={getIngredient(4)!.dDay}
                        isSelected={selectedIds.includes(4)}
                        onSelect={() => handleSelect(4)}
                      />
                      <div className="rounded-S -z-10 -mt-4 h-[26px] w-[109px] bg-[#63C88D] blur-[1px]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 컨트롤 영역 */}
      {mode === "fridge" ? (
        <div className="pointer-events-none fixed right-0 bottom-[calc(72px+env(safe-area-inset-bottom))] left-0 z-[130] mx-auto w-full max-w-[450px] px-4">
          <div className="pointer-events-auto flex flex-col items-end gap-3">
            {isDimmed && (
              <div className="flex flex-col items-end">
                <div className="rounded-S bg-gray-0 px-3 py-2">
                  <p className="text-green-deep typo-label whitespace-nowrap">
                    지금 냉장고에 있는 재료부터 등록해보세요!
                  </p>
                </div>

                <div className="-mt-1 px-4">
                  <Triangle className="w-4" />
                </div>
              </div>
            )}

            {/* <img src={FAB} alt="재료 추가" /> */}
            <button
              onClick={e => {
                if (!isDimmed) {
                  setIsDimmed(true);
                } else {
                  e.stopPropagation();
                  onNext();
                }
              }}
              className="bg-gray-80 flex h-12 w-12 items-center justify-center rounded-full"
            >
              <Plus strokeWidth={3} className="text-green h-8 w-8" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`fixed right-0 bottom-[env(safe-area-inset-bottom)] left-0 mx-auto flex w-full max-w-[450px] justify-center px-4 transition-all ${
            isAllRequiredSelected ? "z-90" : "z-10"
          }`}
        >
          <Button
            size="L"
            variant="black"
            onClick={onNext}
            disabled={!isAllRequiredSelected}
          >
            선택 완료
          </Button>
        </div>
      )}
    </div>
  );
}
