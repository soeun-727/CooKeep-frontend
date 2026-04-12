import { useState } from "react";
import nextIcon from "../../../../../assets/fridge/addItem/forward.svg";
import prevIcon from "../../../../../assets/fridge/addItem/backward.svg";

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
    <div className="flex flex-col w-[357px] mx-auto items-center justify-center rounded-[6px] py-[13px] px-4 mb-[34px] shadow-[0px_10px_60px_0px_rgba(0,0,0,0.1)] bg-white">
      {/* 1. 달력 헤더 (월 이동) */}
      <div className="flex items-center justify-between w-[325px] h-11">
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
      <div className="grid grid-cols-7 w-full mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center typo-body2 text-[var(--color-green)] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 3. 날짜 그리드 */}
      <div className="grid grid-cols-7 w-full gap-y-1">
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
              className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full typo-h2 text-zinc-800 transition-all !font-normal
                ${
                  isNewlySelected
                    ? "!bg-[var(--color-green-light)] !border !border-[var(--color-green-deep)] !font-semibold"
                    : isNewlySelected || isCurrent
                      ? "!bg-zinc-200 !text-zinc-500 !cursor-not-allowed"
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
