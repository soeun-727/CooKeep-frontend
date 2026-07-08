import { useState } from "react";

import PrevIcon from "@/assets/fridge/addItem/backward.svg?react";

import { daysOfWeek } from "@/constants/dateOfWeek";

import useCalendar from "@/utils/calendar";
import { formatDate } from "@/utils/formatDate";

interface ExpiryEditorProps {
  value: string; // "2026.01.20" 형식
  onSave: (val: string) => void;
}

export default function ExpiryEditor({ value, onSave }: ExpiryEditorProps) {
  const currentDate = value ? new Date(value.replace(/\./g, "-")) : null;
  const initialDate = currentDate || new Date();

  const {
    year,
    month,
    monthName,
    firstDayOfMonth,
    daysInMonth,
    prevMonth,
    nextMonth,
  } = useCalendar(initialDate);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day, 12);

    setSelectedDate(newDate);

    setTimeout(() => onSave(formatDate(newDate)), 250);
  };

  return (
    <div className="bg-gray-0 mx-auto mb-[34px] flex w-[357px] flex-col items-center justify-center rounded-[6px] px-4 py-[13px]">
      {/* 1. 달력 헤더 (월 이동) */}
      <div className="flex h-11 w-[325px] items-center justify-between">
        <h2 className="typo-h3 font-semibold">
          {monthName} {year}
        </h2>
        <div>
          <button onClick={prevMonth} className="text-gray-30 p-2">
            <PrevIcon className="text-gray-30 h-4 w-4" />
          </button>
          <button onClick={nextMonth} className="text-gray-30 p-2">
            <PrevIcon className="text-gray-30 h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>

      {/* 2. 요일 표시 */}
      <div className="mb-2 grid w-full grid-cols-7">
        {daysOfWeek.map(day => (
          <div key={day} className="typo-body2 text-green py-2 text-center">
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
              className={`typo-h2 text-gray-80 mx-auto flex h-10 w-10 items-center justify-center rounded-full !font-normal transition-all ${
                isNewlySelected
                  ? "!bg-green-light !border-green-deep !border !font-semibold"
                  : isNewlySelected || isCurrent
                    ? "!bg-gray-30 !cursor-not-allowed !text-gray-50"
                    : "hover:bg-gray-10"
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
