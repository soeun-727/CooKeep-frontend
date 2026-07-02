import { useState } from "react";

import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

export default function RecentlyAdded() {
  const [isOpen, setIsOpen] = useState(false);
  const { historyItems, toggleItem } = useAddIngredientStore();
  const displayHistory = historyItems.slice(0, 6);
  const emptyCount = Math.max(0, 6 - displayHistory.length);
  const emptySlots = Array(emptyCount).fill(null);
  const allSlots = [...displayHistory, ...emptySlots];

  return (
    <div className="flex w-full flex-col">
      <div className="pl-[15px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-30 flex h-6 w-[139px] items-center justify-center gap-2 rounded-t-[15px] transition-all duration-300 ${
            isOpen
              ? "bg-gray-0 shadow-[0_-10px_20px_-5px_rgba(17,17,17,0.1)]" // 메뉴바와 연결되는 느낌의 그림자
              : "bg-gray-0"
          }`}
        >
          <span
            className={`typo-caption transition-colors duration-300 ${
              isOpen ? "text-green-deep" : "text-gray-50"
            }`}
          >
            최근 추가한 재료
          </span>
          <div
            className={`h-2 w-2 border-r-2 border-b-2 transition-all duration-300 ${
              isOpen
                ? "border-green-deep -translate-y-[1px] rotate-45"
                : "translate-y-[2px] rotate-[225deg] border-gray-50"
            }`}
          />
        </button>
      </div>

      {/* 2. 메뉴바 (361px 너비) */}
      <div
        className={`bg-gray-0 relative z-20 w-[361px] overflow-hidden rounded-t-[10px] shadow-[0_-1px_100px_-4px_rgba(17,17,17,0.15)] transition-all duration-300 ease-in-out ${
          isOpen
            ? "mt-[-1px] max-h-[100px] opacity-100" // 버튼과 겹치게 하여 경계선 제거
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="no-scrollbar flex items-center justify-between overflow-x-auto px-5 py-3">
          {allSlots.map((item, idx) => (
            <div
              key={item?.id || `history-empty-${idx}`}
              className="flex w-[56px] flex-col items-center"
            >
              {item ? (
                <button
                  onClick={() => toggleItem(item)}
                  className="group flex flex-col items-center transition-transform active:scale-90"
                >
                  <div className="flex h-10 w-10 items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <span className="text-gray-80 w-11 truncate text-center text-[10px]">
                    {item.name}
                  </span>
                </button>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
