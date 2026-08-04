import { useEffect, useState } from "react";

import { CalendarRecipe, getCalendarRecipes } from "@/api/myRecipe";

import PrevIcon from "@/assets/fridge/addItem/backward.svg?react";
import todaySign from "@/assets/mycookeep/today.svg";

import { daysOfWeek } from "@/constants/dateOfWeek";

import useCalendar from "@/utils/calendar";
import { formatCalendarDate, getDateKey } from "@/utils/formatDate";

interface CalendarProps {
  onDateClick: (date: string) => void;
}

export default function Calendar({ onDateClick }: CalendarProps) {
  const {
    year,
    month,
    monthName,
    firstDayOfMonth,
    daysInMonth,
    prevMonth,
    nextMonth,
  } = useCalendar();

  const [apiRecords, setApiRecords] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const nowDate = new Date();

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const response = await getCalendarRecipes(year, month + 1);
        if (response && response.status === "OK") {
          const formatted: Record<string, string> = {};
          response.data.forEach((item: CalendarRecipe) => {
            const dotDate = item.date.replaceAll("-", ".");
            formatted[dotDate] = item.recipeImageUrl;
          });

          setApiRecords(formatted);
          console.log("매핑된 데이터:", formatted);
        }
      } catch (error) {
        console.error("캘린더 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [year, month]);

  return (
    <div
      className={`bg-gray-0/10 mx-auto flex w-[357px] flex-col items-center justify-center rounded-[6px] p-4 transition-opacity duration-200 ${isLoading ? "pointer-events-none opacity-50" : "opacity-100"} `}
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
          </div>
        ))}
      </div>
      {/* 3. 날짜 그리드 */}
      <div className="relative mb-[13px] grid w-full grid-cols-7 gap-y-[6px]">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatCalendarDate(year, month, day);
          const hasRecord = Object.prototype.hasOwnProperty.call(
            apiRecords,
            dateStr,
          );
          const photoUrl = apiRecords[dateStr];

          const isToday =
            nowDate.getFullYear() === year &&
            nowDate.getMonth() === month &&
            nowDate.getDate() === day;

          // 연속 배경 계산
          const prevDate = new Date(year, month, day - 1);
          const nextDate = new Date(year, month, day + 1);

          const prevKey = getDateKey(prevDate);
          const nextKey = getDateKey(nextDate);

          const hasPrev = Object.prototype.hasOwnProperty.call(
            apiRecords,
            prevKey,
          );
          const hasNext = Object.prototype.hasOwnProperty.call(
            apiRecords,
            nextKey,
          );
          const isContinuous = hasRecord && (hasPrev || hasNext);

          return (
            <div key={dateStr} className="relative flex justify-center">
              {/* 오늘 표시 (생략) */}
              {isToday && (
                <img
                  src={todaySign}
                  alt="today"
                  className="pointer-events-none absolute -top-3 z-40 w-18 max-w-none"
                />
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
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${hasRecord ? "scale-105" : "hover:bg-gray-10"} ${hasRecord && !photoUrl ? "bg-green-light" : ""} `}
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
                  className={`typo-h2 relative z-20 !font-normal ${
                    hasRecord ? "text-gray-0" : "text-gray-80"
                  }`}
                >
                  {day}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
