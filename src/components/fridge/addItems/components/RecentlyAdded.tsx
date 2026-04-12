import { useState } from "react";
import { useAddIngredientStore } from "../../../../stores/useAddIngredientStore";

export default function RecentlyAdded() {
  const [isOpen, setIsOpen] = useState(false);
  const { historyItems, toggleItem } = useAddIngredientStore();
  const displayHistory = historyItems.slice(0, 6);
  const emptyCount = Math.max(0, 6 - displayHistory.length);
  const emptySlots = Array(emptyCount).fill(null);
  const allSlots = [...displayHistory, ...emptySlots];

  return (
    <div className="flex flex-col w-full">
      <div className="pl-[15px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[139px] h-6 flex items-center justify-center gap-2 relative z-30 transition-all duration-300 rounded-t-[15px] ${
            isOpen
              ? "bg-white shadow-[0_-10px_20px_-5px_rgba(17,17,17,0.1)]" // 메뉴바와 연결되는 느낌의 그림자
              : "bg-white"
          }`}
        >
          <span
            className={`typo-caption transition-colors duration-300 ${
              isOpen ? "text-[var(--color-green-deep)]" : "text-zinc-500"
            }`}
          >
            최근 추가한 재료
          </span>
          <div
            className={`w-2 h-2 border-b-2 border-r-2 transition-all duration-300 ${
              isOpen
                ? "rotate-45 -translate-y-[1px] border-[var(--color-green-deep)]"
                : "rotate-[225deg] translate-y-[2px] border-zinc-500"
            }`}
          />
        </button>
      </div>

      {/* 2. 메뉴바 (361px 너비) */}
      <div
        className={`w-[361px] bg-white rounded-t-[10px] shadow-[0_-1px_100px_-4px_rgba(17,17,17,0.15)] overflow-hidden transition-all duration-300 ease-in-out relative z-20 ${
          isOpen
            ? "max-h-[100px] opacity-100 mt-[-1px]" // 버튼과 겹치게 하여 경계선 제거
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-3 flex items-center justify-between overflow-x-auto no-scrollbar">
          {allSlots.map((item, idx) => (
            <div
              key={item?.id || `history-empty-${idx}`}
              className="flex flex-col items-center w-[56px]"
            >
              {item ? (
                <button
                  onClick={() => toggleItem(item)}
                  className="flex flex-col items-center group active:scale-90 transition-transform"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <span className="text-[10px] truncate w-11 text-center text-zinc-600">
                    {item.name}
                  </span>
                </button>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
