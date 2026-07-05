import { useState } from "react";

import { getMonthName } from "@/utils/formatDate";

export default function useCalendar(initialDate = new Date()) {
  const [viewDate, setViewDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));

  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return {
    viewDate,
    year,
    month,
    monthName: getMonthName(viewDate),
    firstDayOfMonth,
    daysInMonth,
    prevMonth,
    nextMonth,
  };
}
