import { useState } from "react";

import { getMonthName } from "@/utils/formatDate";

export default function useCalendar(initialDate = new Date()) {
  const [viewDate, setViewDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const currentMonthIndex = viewDate.getMonth(); // 0 ~ 11 원본 인덱스 보존
  const month = currentMonthIndex + 1; // 화면 표시용 (1 ~ 12)

  // 자바스크립트 Date 객체 생성 시 월 인덱스는 0~11을 그대로 넣어줘야 합니다.
  const firstDayOfMonth = new Date(year, currentMonthIndex, 1).getDay();
  const daysInMonth = new Date(year, currentMonthIndex + 1, 0).getDate();

  // 원본 currentMonthIndex를 기준으로 빼고 더해줍니다.
  const prevMonth = () => setViewDate(new Date(year, currentMonthIndex - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, currentMonthIndex + 1, 1));

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
