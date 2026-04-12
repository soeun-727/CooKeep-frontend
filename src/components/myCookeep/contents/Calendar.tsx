import { useEffect, useState } from "react";
import nextIcon from "../../../assets/fridge/addItem/forward.svg";
import prevIcon from "../../../assets/fridge/addItem/backward.svg";
import todaySign from "../../../assets/mycookeep/today.svg";
import { CalendarRecipe, getCalendarRecipes } from "../../../api/myRecipe";

interface Props {
  onDateClick: (date: string) => void;
}

export default function Calendar({ onDateClick }: Props) {
  const [viewDate, setViewDate] = useState(new Date());
  const [apiRecords, setApiRecords] = useState<Record<string, string>>({}); // 🚀 서버 데이터를 담을 상태
  const [isLoading, setIsLoading] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
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

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const monthName = viewDate.toLocaleString("en-US", { month: "long" });

  const getFormattedDate = (d: number) =>
    `${year}.${String(month + 1).padStart(2, "0")}.${String(d).padStart(2, "0")}`;

  return (
    <div
      className={`
    flex flex-col w-[357px] mx-auto items-center justify-center rounded-[6px] p-4 
    bg-white/10 transition-opacity duration-200
    ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}
  `}
    >
      {/* 1. 헤더 */}
      <div className="flex items-center justify-between w-full px-2 mt-[13px] mb-2">
        <h2 className="typo-h3 text-neutral-900">
          {monthName} {year}
        </h2>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2">
            <img src={prevIcon} className="w-4 h-4" alt="prev" />
          </button>
          <button onClick={nextMonth} className="p-2">
            <img src={nextIcon} className="w-4 h-4" alt="next" />
          </button>
        </div>
      </div>
      {/* 2. 요일 */}
      <div className="grid grid-cols-7 w-full mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center typo-body2 text-(--color-green)"
          >
            {day}
          </div>
        ))}
      </div>
      {/* 3. 날짜 그리드 */}
      <div className="grid grid-cols-7 w-full relative gap-y-[6px] mb-[13px]">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getFormattedDate(day);

          // 🚀 데이터 존재 여부 확인
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
          const prevKey = `${prevDate.getFullYear()}.${String(prevDate.getMonth() + 1).padStart(2, "0")}.${String(prevDate.getDate()).padStart(2, "0")}`;
          const nextKey = `${nextDate.getFullYear()}.${String(nextDate.getMonth() + 1).padStart(2, "0")}.${String(nextDate.getDate()).padStart(2, "0")}`;

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
                  className="absolute -top-3 z-40 w-18 max-w-none pointer-events-none drop-shadow-md"
                />
              )}

              {/* 연속 배경 */}
              {isContinuous && (
                <div
                  className={`
            absolute top-1/2 -translate-y-1/2 h-12 bg-[#96E8BE] z-0
            ${hasPrev && hasNext ? "left-[-60%] right-[-60%] rounded-none" : ""}
            ${hasPrev && !hasNext ? "left-[-60%] right-[-2px] rounded-r-full" : ""}
            ${!hasPrev && hasNext ? "left-[-2px] right-[-60%] rounded-l-full" : ""}
          `}
                />
              )}

              {/* 날짜 버튼 */}
              <button
                onClick={() => onDateClick(dateStr)}
                className={`
          relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all
          ${hasRecord ? "scale-105" : "hover:bg-zinc-50"}
          ${hasRecord && !photoUrl ? "bg-[#96E8BE]" : ""} 
        `}
              >
                {/* 🚀 사진이 있을 때만 이미지를 보여줌 */}
                {photoUrl && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src={photoUrl}
                      alt="record"
                      className="w-full h-full object-cover brightness-75"
                    />
                  </div>
                )}

                <span
                  className={`relative z-20 typo-h2 !font-normal ${
                    hasRecord ? "text-white" : "text-neutral-800"
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
