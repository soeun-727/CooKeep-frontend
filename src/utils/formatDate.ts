export const getKoreaToday = () => {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  return new Date(now.getTime() + kstOffset).toISOString().slice(0, 10); // YYYY-MM-DD
};

export const formatDate = (date: Date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const formatCalendarDate = (year: number, month: number, day: number) =>
  `${year}.${String(month + 1).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

export const parseDotDate = (value: string) =>
  new Date(value.replace(/\./g, "-"));

export const getMonthName = (date: Date) =>
  date.toLocaleString("en-US", { month: "long" });

export const getDateKey = (date: Date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")}`;
