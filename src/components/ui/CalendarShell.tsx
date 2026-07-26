import { Fragment, ReactNode } from "react";

import PrevIcon from "@/assets/fridge/addItem/backward.svg?react";

import { daysOfWeek } from "@/constants/dateOfWeek";

interface CalendarShellProps {
  year: number;
  month: number;
  firstDayOfMonth: number;
  daysInMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
  renderDay: (day: number) => ReactNode;
  isLoading?: boolean;
}

export const CalendarShell = ({
  year,
  month,
  firstDayOfMonth,
  daysInMonth,
  prevMonth,
  nextMonth,
  renderDay,
  isLoading = false,
}: CalendarShellProps) => {
  return (
    <div
      className={`bg-gray-0 border-gray-10 mx-auto flex w-full flex-col items-center justify-center gap-2 rounded-[16px] border px-3 py-4 transition-opacity duration-200 ${isLoading ? "pointer-events-none opacity-50" : "opacity-100"}`}
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="typo-l-strong text-gray-80">
          {year}년 {month}월
        </h2>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2">
            <PrevIcon className="h-4 w-4 text-gray-50" />
          </button>
          <button onClick={nextMonth} className="p-2">
            <PrevIcon className="h-4 w-4 rotate-180 text-gray-50" />
          </button>
        </div>
      </div>

      <div className="grid w-full grid-cols-7">
        {daysOfWeek.map(day => (
          <div key={day} className="typo-m text-green text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid w-full grid-cols-7 gap-y-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => (
          <Fragment key={i + 1}>{renderDay(i + 1)}</Fragment>
        ))}
      </div>
    </div>
  );
};
