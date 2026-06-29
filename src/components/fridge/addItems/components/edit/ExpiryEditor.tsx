import { useState } from "react";

import prevIcon from "@/assets/fridge/addItem/backward.svg";
import nextIcon from "@/assets/fridge/addItem/forward.svg";

interface ExpiryEditorProps {
  value: string; // "2026.01.20" 형식
  onSave: (val: string) => void;
}

export default function ExpiryEditor({ value, onSave }: ExpiryEditorProps) {
  const currentDate = value ? new Date(value.replace(/\./g, "-")) : null;
  const initialDate = currentDate || new Date();
  const [viewDate, setViewDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const monthName = viewDate.toLocaleString("en-US", { month: "long" });

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day, 12, 0, 0);
    setSelectedDate(newDate);

    const formattedDate = `${newDate.getFullYear()}.${String(
      newDate.getMonth() + 1,
    ).padStart(2, "0")}.${String(newDate.getDate()).padStart(2, "0")}`;
    setTimeout(() => onSave(formattedDate), 250);
  };

  return (
    <div className="mx-auto mb-[34px] flex w-[357px] flex-col items-center justify-center rounded-[6px] bg-white px-4 py-[13px] shadow-[0px_10px_60px_0px_rgba(0,0,0,0.1)]">
      {/* 1. 달력 헤더 (월 이동) */}
      <div className="flex h-11 w-[325px] items-center justify-between">
        <h2 className="typo-h3 font-semibold">
          {monthName} {year}
        </h2>
        <div>
          <button onClick={prevMonth} className="p-2 text-zinc-400">
            <img src={prevIcon} alt="back" />
          </button>
          <button onClick={nextMonth} className="p-2 text-zinc-400">
            <img src={nextIcon} alt="next" />
          </button>
        </div>
      </div>

      {/* 2. 요일 표시 */}
      <div className="mb-2 grid w-full grid-cols-7">
        {daysOfWeek.map(day => (
          <div
            key={day}
            className="typo-body2 py-2 text-center text-[var(--color-green)]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 3. 날짜 그리드 */}
      <div className="grid w-full grid-cols-7 gap-y-1">
        {/* 1일 이전 빈칸 처리 */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* 실제 날짜 버튼 */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isCurrent =
            currentDate &&
            currentDate.getFullYear() === year &&
            currentDate.getMonth() === month &&
            currentDate.getDate() === day;
          const isNewlySelected =
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day;

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`typo-h2 mx-auto flex h-10 w-10 items-center justify-center rounded-full !font-normal text-zinc-800 transition-all ${
                isNewlySelected
                  ? "!border !border-[var(--color-green-deep)] !bg-[var(--color-green-light)] !font-semibold"
                  : isNewlySelected || isCurrent
                    ? "!cursor-not-allowed !bg-zinc-200 !text-zinc-500"
                    : "hover:bg-zinc-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
