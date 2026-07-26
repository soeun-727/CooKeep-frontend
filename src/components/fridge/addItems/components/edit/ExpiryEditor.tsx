import { useState } from "react";

import { CalendarShell } from "@/components/ui/CalendarShell";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

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

  const renderDay = (day: number) => {
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
      <div className="relative flex flex-col items-center">
        {isToday && (
          <div className="absolute -top-3 z-10">
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
  };

  return (
    <CalendarShell
      containerClassName="bg-gray-0 border-gray-10 mx-auto flex w-full flex-col items-center justify-center gap-2 rounded-[16px] border px-3 py-4"
      headerClassName="flex w-full items-center justify-between"
      title={
        <>
          {year}년 {month}월
        </>
      }
      titleClassName="typo-l-strong"
      navIconClassName="h-4 w-4 text-gray-50"
      weekdayRowClassName="grid w-full grid-cols-7"
      weekdayItemClassName="typo-body text-green-deep text-center"
      gridClassName="grid w-full grid-cols-7"
      firstDayOfMonth={firstDayOfMonth}
      daysInMonth={daysInMonth}
      prevMonth={prevMonth}
      nextMonth={nextMonth}
      renderDay={renderDay}
    />
  );
}
