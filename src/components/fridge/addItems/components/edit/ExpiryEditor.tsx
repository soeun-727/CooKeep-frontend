import { useState } from "react";

import PrevIcon from "@/assets/fridge/addItem/backward.svg?react";

import { SpeechBubble } from "@/components/ui/SpeechBubble";

import { daysOfWeek } from "@/constants/dateOfWeek";

import useCalendar from "@/utils/calendar";
import { formatDate } from "@/utils/formatDate";

interface ExpiryEditorProps {
  value: string; // "2026.01.20" 형식
  onSave: (val: string) => void;
}

export default function ExpiryEditor({ value, onSave }: ExpiryEditorProps) {
  const currentDate = value ? new Date(value.replace(/\./g, "-")) : null;
  const today = new Date();
  const initialDate = currentDate || new Date();

  const { year, month, firstDayOfMonth, daysInMonth, prevMonth, nextMonth } =
    useCalendar(initialDate);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month - 1, day, 12);

    setSelectedDate(newDate);

    setTimeout(() => onSave(formatDate(newDate)), 250);
  };

  return (
    <div className="bg-gray-0 border-gray-10 rounded-L mx-auto flex w-full flex-col items-center justify-center gap-2 border px-3 py-4">
      {/* 1. 달력 헤더 (월 이동) */}
      <div className="flex w-full items-center justify-between">
        <h2 className="typo-l-strong">
          {year}년 {month}월
        </h2>
        <div>
          <button onClick={prevMonth} className="p-2">
            <PrevIcon className="h-4 w-4 text-gray-50" />
          </button>
          <button onClick={nextMonth} className="p-2">
            <PrevIcon className="h-4 w-4 rotate-180 text-gray-50" />
          </button>
        </div>
      </div>

      {/* 2. 요일 표시 */}
      <div className="grid w-full grid-cols-7">
        {daysOfWeek.map(day => (
          <div key={day} className="typo-body text-green-deep text-center">
            {day}
          </div>
        ))}
      </div>

      {/* 3. 날짜 그리드 */}
      <div className="grid w-full grid-cols-7">
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
            currentDate.getMonth() === month - 1 &&
            currentDate.getDate() === day;

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month - 1 &&
            today.getDate() === day;

          const isNewlySelected =
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month - 1 &&
            selectedDate.getDate() === day;

          const isSelected = isNewlySelected || (!selectedDate && isCurrent);

          return (
            <div key={day} className="relative flex flex-col items-center">
              {isToday && (
                <div className="absolute -top-8 z-10">
                  <SpeechBubble text="TODAY" />
                </div>
              )}

              <button
                onClick={() => handleDateClick(day)}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                  isNewlySelected
                    ? "border-green-deep bg-green-light border"
                    : isCurrent
                      ? "bg-gray-10"
                      : ""
                }`}
              >
                <p
                  className={`${
                    isSelected
                      ? "typo-l text-gray-80"
                      : isCurrent
                        ? "typo-l text-gray-80"
                        : ""
                  } `}
                >
                  {day}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
