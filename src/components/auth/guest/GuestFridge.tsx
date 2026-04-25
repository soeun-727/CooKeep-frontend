import { type Ingredient } from "../../../stores/useIngredientStore";
import header from "../../../assets/guest/fridge_header.svg";
import Storage from "../../fridge/main/Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import strawberry from "../../../assets/guest/strawberry.svg";
import egg from "../../../assets/guest/egg.svg";
import noodles from "../../../assets/guest/noodles.svg";
import bagel from "../../../assets/guest/bagel.svg";
import banana from "../../../assets/guest/banana.svg";
import milk from "../../../assets/guest/milk.svg";
import FAB from "../../../assets/guest/fab.svg";
import notice from "../../../assets/guest/fab_2.svg";
import { useState } from "react";
import Button from "../../ui/Button";
import FloatingNotice from "../../recipe/main/FloatingNotice";
import Item from "../../fridge/items/Item";

interface Props {
  onNext: () => void;
  mode?: "fridge" | "recipe";
}

export default function GuestFridge({ onNext, mode = "fridge" }: Props) {
  const [isDimmed, setIsDimmed] = useState(false);
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
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const isAllRequiredSelected = REQUIRED_IDS.every((id) =>
    selectedIds.includes(id),
  );

  return (
    <div onClick={() => setIsDimmed(true)} className="relative w-full">
      {isDimmed && (
        <div className="fixed inset-0 z-90 bg-neutral-900/50 left-1/2 -translate-x-1/2 max-w-[450px] w-full" />
      )}

      <div
        className={`flex flex-col w-full gap-7 relative ${mode === "recipe" ? "pb-20" : ""}`}
      >
        <img src={header} className="w-full" />
        <div className="relative w-full">
          {mode === "recipe" && (
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 z-[130] w-full flex justify-center">
              <FloatingNotice text="요리할 재료를 선택해 주세요" />
            </div>
          )}
          {!isDimmed && (
            <div className="absolute inset-0 z-[120] cursor-pointer" />
          )}

          <div className="flex flex-col gap-[10px] w-full relative z-0">
            <Storage
              category="냉장"
              image={fridgeIcon}
              ingredients={guestIngredients.filter(
                (i) => i.category === "냉장",
              )}
            />
            <Storage
              category="냉동"
              image={freezerIcon}
              ingredients={guestIngredients.filter(
                (i) => i.category === "냉동",
              )}
            />
            <Storage
              category="상온"
              image={pantryIcon}
              ingredients={guestIngredients.filter(
                (i) => i.category === "상온",
              )}
            />
          </div>

          {mode === "recipe" && isDimmed && (
            <div className="absolute inset-0 z-[100] pointer-events-none w-[354px] left-1/2 -translate-x-1/2">
              <Item
                image={guestIngredients[0].image}
                name={guestIngredients[0].name}
                leftDays={guestIngredients[0].dDay}
                isSelected={selectedIds.includes(1)}
                onSelect={() => handleSelect(1)}
                className="absolute !z-[110] pointer-events-auto"
                style={{ top: "55px", left: "0px" }}
              />
              <Item
                image={guestIngredients[1].image}
                name={guestIngredients[1].name}
                leftDays={guestIngredients[1].dDay}
                isSelected={selectedIds.includes(2)}
                onSelect={() => handleSelect(2)}
                className="absolute !z-[110] pointer-events-auto"
                style={{ top: "55px", left: "120px" }}
              />
              <Item
                image={guestIngredients[5].image}
                name={guestIngredients[5].name}
                leftDays={guestIngredients[5].dDay}
                isSelected={selectedIds.includes(6)}
                onSelect={() => handleSelect(6)}
                className="absolute !z-[110] pointer-events-auto"
                style={{ top: "238px", left: "0px" }}
              />
              <Item
                image={guestIngredients[3].image}
                name={guestIngredients[3].name}
                leftDays={guestIngredients[3].dDay}
                isSelected={selectedIds.includes(4)}
                onSelect={() => handleSelect(4)}
                className="absolute !z-[110] pointer-events-auto"
                style={{ top: "421px", left: "0px" }}
              />
            </div>
          )}
        </div>
      </div>

      {mode === "fridge" ? (
        <div className="absolute -bottom-15 right-[31px] flex flex-col items-end z-[130]">
          {isDimmed && (
            <div className="relative w-full">
              <img
                src={notice}
                alt="click notice"
                className="absolute -bottom-4 right-[-8px] w-[270px] max-w-none"
              />
            </div>
          )}
          <button
            className="relative translate-y-4"
            onClick={(e) => {
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
        <div className="fixed bottom-[34px] left-1/2 -translate-x-1/2 z-[130]">
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
