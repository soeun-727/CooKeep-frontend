import { useState } from "react";

import { type Ingredient } from "@/stores/useIngredientStore";

import bagel from "@/assets/guest/bagel.svg";
import banana from "@/assets/guest/banana.svg";
import egg from "@/assets/guest/egg.svg";
import FAB from "@/assets/guest/fab.svg";
import milk from "@/assets/guest/milk.svg";
import noodles from "@/assets/guest/noodles.svg";
import strawberry from "@/assets/guest/strawberry.svg";
import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";

import Triangle from "@/assets/guest/triangle.svg?react";

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
}

export default function GuestFridge({
  onNext,
  mode = "fridge",
  isDimmed,
  setIsDimmed,
}: GuestFridgeProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const REQUIRED_IDS = [1, 2, 4, 6];

  const defaultProps = {
    quantity: 1,
    unit: "개",
    expiryDate: "2026-12-31",
    createdAt: Date.now(),
  };

  const guestIngredients: Ingredient[] = [
    {
      id: 1,
      name: "우유",
      category: "냉장",
      dDay: 1,
      image: milk,
      ...defaultProps,
    },
    {
      id: 2,
      name: "딸기",
      category: "냉장",
      dDay: 3,
      image: strawberry,
      ...defaultProps,
    },
    {
      id: 3,
      name: "계란",
      category: "냉장",
      dDay: 21,
      image: egg,
      ...defaultProps,
    },
    {
      id: 4,
      name: "바나나",
      category: "상온",
      dDay: 6,
      image: banana,
      ...defaultProps,
    },
    {
      id: 5,
      name: "소면",
      category: "상온",
      dDay: 10,
      image: noodles,
      ...defaultProps,
    },
    ...(mode === "recipe"
      ? [
          {
            id: 6,
            name: "베이글",
            category: "냉동" as const,
            dDay: 6,
            image: bagel,
            ...defaultProps,
          },
        ]
      : []),
  ];

  const handleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const isAllRequiredSelected = REQUIRED_IDS.every(id =>
    selectedIds.includes(id),
  );

  return (
    <div onClick={() => setIsDimmed(true)} className="relative h-screen w-full">
      <div
        className={`relative flex w-full flex-col gap-7 ${mode === "recipe" ? "pb-20" : ""}`}
      >
        <div className="mt-3 px-4">
          <Search
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="relative w-full">
          {mode === "recipe" && (
            <div className="absolute -top-[120px] left-1/2 z-[130] flex w-full -translate-x-1/2 justify-center">
              <FloatingNotice text="요리할 재료를 선택해 주세요" />
            </div>
          )}
          {!isDimmed && (
            <div className="absolute inset-0 z-[120] cursor-pointer" />
          )}

          <div className="relative z-0 flex w-full flex-col gap-3">
            <Storage
              category="냉장"
              icon={FridgeIcon}
              ingredients={guestIngredients.filter(i => i.category === "냉장")}
            />
            <Storage
              category="냉동"
              icon={FreezerIcon}
              ingredients={guestIngredients.filter(i => i.category === "냉동")}
            />
            <Storage
              category="상온"
              icon={PantryIcon}
              ingredients={guestIngredients.filter(i => i.category === "상온")}
            />
          </div>

          {mode === "recipe" && isDimmed && (
            <div className="pointer-events-none absolute inset-0 left-1/2 z-[100] w-[354px] -translate-x-1/2">
              <Item
                image={guestIngredients[0].image}
                name={guestIngredients[0].name}
                leftDays={guestIngredients[0].dDay}
                isSelected={selectedIds.includes(1)}
                onSelect={() => handleSelect(1)}
                className="pointer-events-auto absolute !z-[110]"
                style={{ top: "55px", left: "0px" }}
              />
              <Item
                image={guestIngredients[1].image}
                name={guestIngredients[1].name}
                leftDays={guestIngredients[1].dDay}
                isSelected={selectedIds.includes(2)}
                onSelect={() => handleSelect(2)}
                className="pointer-events-auto absolute !z-[110]"
                style={{ top: "55px", left: "120px" }}
              />
              <Item
                image={guestIngredients[5].image}
                name={guestIngredients[5].name}
                leftDays={guestIngredients[5].dDay}
                isSelected={selectedIds.includes(6)}
                onSelect={() => handleSelect(6)}
                className="pointer-events-auto absolute !z-[110]"
                style={{ top: "238px", left: "0px" }}
              />
              <Item
                image={guestIngredients[3].image}
                name={guestIngredients[3].name}
                leftDays={guestIngredients[3].dDay}
                isSelected={selectedIds.includes(4)}
                onSelect={() => handleSelect(4)}
                className="pointer-events-auto absolute !z-[110]"
                style={{ top: "421px", left: "0px" }}
              />
            </div>
          )}
        </div>
      </div>

      {mode === "fridge" ? (
        <div className="fixed right-4 bottom-[calc(72px+env(safe-area-inset-bottom))] z-[130] flex flex-col items-end gap-2">
          {isDimmed && (
            <div className="flex flex-col items-end">
              <div className="rounded-S bg-gray-0 px-3 py-2">
                <p className="text-green-deep typo-label">
                  지금 냉장고에 있는 재료부터 등록해보세요!
                </p>
              </div>
              <div className="-mt-1 px-4">
                <Triangle className="w-4" />
              </div>
            </div>
          )}
          <button
            className="relative -mr-2"
            onClick={e => {
              if (!isDimmed) {
                setIsDimmed(true);
              } else {
                e.stopPropagation();
                onNext();
              }
            }}
          >
            <img src={FAB} alt="add button" />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-[34px] left-1/2 z-[130] -translate-x-1/2">
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
