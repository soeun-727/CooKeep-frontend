import { useEffect, useState } from "react";

import { CalendarRecipe, getCalendarRecipes } from "@/api/myRecipe";

import { CalendarShell } from "@/components/ui/CalendarShell";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

import useCalendar from "@/utils/calendar";
import { formatCalendarDate, getDateKey } from "@/utils/formatDate";

interface CalendarProps {
  onDateClick: (date: string) => void;
  onMonthChange?: () => void;
}

export default function Calendar({
  onDateClick,
  onMonthChange,
}: CalendarProps) {
  const { year, month, firstDayOfMonth, daysInMonth, prevMonth, nextMonth } =
    useCalendar();

  const handlePrevMonth = () => {
    prevMonth();
    onMonthChange?.();
  };

  const handleNextMonth = () => {
    nextMonth();
    onMonthChange?.();
  };

  const [apiRecords, setApiRecords] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const nowDate = new Date();

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const response = await getCalendarRecipes(year, month);
        if (response && response.status === "OK") {
          const formatted: Record<string, string> = {};
          response.data.forEach((item: CalendarRecipe) => {
            const dotDate = item.date.replaceAll("-", ".");
            formatted[dotDate] = item.recipeImageUrl;
          });

          setApiRecords(formatted);
        }
      } catch (error) {
        console.error("캘린더 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [year, month]);

<<<<<<< HEAD
  return (
    <div
      className={`bg-gray-0/10 rounded-L mx-auto flex w-[357px] flex-col items-center justify-center p-4 transition-opacity duration-200 ${isLoading ? "pointer-events-none opacity-50" : "opacity-100"} `}
    >
      {/* 1. 헤더 */}
      <div className="mt-[13px] mb-2 flex w-full items-center justify-between px-2">
        <h2 className="typo-h3 text-gray-80">
          {monthName} {year}
        </h2>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2">
            <PrevIcon className="text-gray-30 h-4 w-4" />
          </button>
          <button onClick={nextMonth} className="p-2">
            <PrevIcon className="text-gray-30 h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>
      {/* 2. 요일 */}
      <div className="mb-2 grid w-full grid-cols-7">
        {daysOfWeek.map(day => (
          <div key={day} className="typo-body2 text-green text-center">
            {day}
=======
  const renderDay = (day: number) => {
    const dateStr = formatCalendarDate(year, month - 1, day);
    const hasRecord = Object.prototype.hasOwnProperty.call(apiRecords, dateStr);
    const photoUrl = apiRecords[dateStr];

    const isToday =
      nowDate.getFullYear() === year &&
      nowDate.getMonth() === month - 1 &&
      nowDate.getDate() === day;

    // 연속 배경 계산
    const prevDate = new Date(year, month - 1, day - 1);
    const nextDate = new Date(year, month - 1, day + 1);

    const prevKey = getDateKey(prevDate);
    const nextKey = getDateKey(nextDate);

    const hasPrev = Object.prototype.hasOwnProperty.call(apiRecords, prevKey);
    const hasNext = Object.prototype.hasOwnProperty.call(apiRecords, nextKey);
    const isContinuous = hasRecord && (hasPrev || hasNext);

    return (
      <div className="relative flex justify-center">
        {isToday && (
          <div className="absolute -top-10 z-10">
            <SpeechBubble text="TODAY" />
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b
          </div>
        )}

        {/* 연속 배경 */}
        {isContinuous && (
          <div
            className={`bg-green-light absolute top-1/2 z-0 h-12 -translate-y-1/2 ${hasPrev && hasNext ? "right-[-60%] left-[-60%] rounded-none" : ""} ${hasPrev && !hasNext ? "right-[-2px] left-[-60%] rounded-r-full" : ""} ${!hasPrev && hasNext ? "right-[-60%] left-[-2px] rounded-l-full" : ""} `}
          />
        )}

        {/* 날짜 버튼 */}
        <button
          onClick={() => onDateClick(dateStr)}
          className={`hover:bg-gray-10 group relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${hasRecord && !photoUrl ? "bg-green-medium" : ""} `}
        >
          {photoUrl && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <img
                src={photoUrl}
                alt="record"
                className="h-full w-full object-cover brightness-75"
              />
            </div>
          )}

          <span
            className={`${isToday ? "typo-l-strong" : "typo-l"} group-hover:text-gray-80 group-hover:typo-l-strong relative z-20 ${
              hasRecord ? "text-gray-0" : "text-gray-80"
            }`}
          >
            {day}
          </span>
        </button>
      </div>
    );
  };

  return (
    <CalendarShell
      year={year}
      month={month}
      isLoading={isLoading}
      firstDayOfMonth={firstDayOfMonth}
      daysInMonth={daysInMonth}
      prevMonth={handlePrevMonth}
      nextMonth={handleNextMonth}
      renderDay={renderDay}
    />
  );
}
