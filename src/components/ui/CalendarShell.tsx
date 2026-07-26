import { Fragment, ReactNode } from "react";

import PrevIcon from "@/assets/fridge/addItem/backward.svg?react";

import { daysOfWeek } from "@/constants/dateOfWeek";

interface CalendarShellProps {
  containerClassName: string;
  headerClassName: string;
  title: ReactNode;
  titleClassName: string;
  navClassName?: string;
  navIconClassName: string;
  weekdayRowClassName: string;
  weekdayItemClassName: string;
  gridClassName: string;
  firstDayOfMonth: number;
  daysInMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
  renderDay: (day: number) => ReactNode;
}

export const CalendarShell = ({
  containerClassName,
  headerClassName,
  title,
  titleClassName,
  navClassName,
  navIconClassName,
  weekdayRowClassName,
  weekdayItemClassName,
  gridClassName,
  firstDayOfMonth,
  daysInMonth,
  prevMonth,
  nextMonth,
  renderDay,
}: CalendarShellProps) => {
  return (
    <div className={containerClassName}>
      <div className={headerClassName}>
        <h2 className={titleClassName}>{title}</h2>
        <div className={navClassName}>
          <button onClick={prevMonth} className="p-2">
            <PrevIcon className={navIconClassName} />
          </button>
          <button onClick={nextMonth} className="p-2">
            <PrevIcon className={`${navIconClassName} rotate-180`} />
          </button>
        </div>
      </div>

      <div className={weekdayRowClassName}>
        {daysOfWeek.map(day => (
          <div key={day} className={weekdayItemClassName}>
            {day}
          </div>
        ))}
      </div>

      <div className={gridClassName}>
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
