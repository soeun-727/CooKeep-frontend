import { useEffect, useRef, useState } from "react";
import bagel from "@/assets/guest/bagel.svg";
import Triangle from "@/assets/guest/triangle.svg?react";

import Button from "@/components/ui/Button";
import { Search } from "@/components/fridge/features/Search";
import { INGREDIENT_CATEGORIES } from "@/constants/category";
import Category from "@/components/fridge/addItems/components/Category";
import Item from "@/components/fridge/addItems/components/Item";
import RecentlyAdded from "@/components/fridge/addItems/components/RecentlyAdded";
import Selected from "@/components/fridge/addItems/components/Selected";

interface GuestAddItemProps {
  onNext: () => void;
  isDimmed: boolean;
  setIsDimmed: (isDimmed: boolean) => void;
}

export default function GuestAddItem({
  onNext,
  isDimmed,
  setIsDimmed,
}: GuestAddItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const targetCategoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (targetCategoryRef.current) {
      targetCategoryRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  return (
    <div
      onClick={() => setIsDimmed(true)}
      className="relative flex h-[calc(100dvh-40px)] w-full flex-col items-center overflow-hidden"
    >
      {/* 헤더 영역 */}
      <div className="mt-3 flex w-full shrink-0 flex-col gap-3">
        <div className="px-4">
          <Search
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="no-scrollbar flex gap-[5px] overflow-x-auto scroll-smooth">
          {INGREDIENT_CATEGORIES.map(category => (
            <div
              key={category.id}
              className="flex-shrink-0"
              ref={category.id === 7 ? targetCategoryRef : null}
            >
              <Category
                name={category.name}
                image={category.image}
                isSelected={category.id === 7}
                onSelect={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 그리드 영역 */}
      <div className="flex w-full flex-1 items-start justify-center overflow-y-auto px-4">
        <div className="z-45 flex w-full flex-col gap-3 p-3">
          <Item
            name="베이글"
            image={bagel}
            isCustom={false}
            isSelected={isSelected}
            onSelect={() => {
              if (isDimmed) {
                setIsSelected(!isSelected);
              }
            }}
            onDelete={() => {}}
          />

          {isDimmed && (
            <div className="flex flex-col items-start">
              <div className="px-4">
                <Triangle className="w-4 rotate-180" />
              </div>
              <div className="rounded-S bg-gray-0 -mt-1 px-3 py-2">
                <p className="text-green-deep typo-label">
                  화면의 ‘베이글’을 선택해 추가해볼까요?
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        onClick={e => e.stopPropagation()}
        className={`absolute bottom-[env(safe-area-inset-bottom)] flex w-full justify-center ${
          isSelected ? "z-50" : "z-auto"
        }`}
      >
        <div className="flex w-full flex-col gap-4 px-4 pb-1">
          <div>
            <div className="pointer-events-none -mb-1 select-none">
              <RecentlyAdded />
            </div>
            <div className="relativez-10">
              <Selected
                isGuest={true}
                isGuestSelected={isSelected}
                guestImage={bagel}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="S"
              variant="black"
              className={` ${!isSelected ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => setIsSelected(false)}
            >
              선택 초기화
            </Button>
            <Button
              size="S"
              variant="green"
              onClick={onNext}
              disabled={!isSelected}
            >
              재료 추가하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
