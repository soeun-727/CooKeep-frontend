// src/utils/date.ts
export const getKoreaToday = () => {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  return new Date(now.getTime() + kstOffset).toISOString().slice(0, 10); // YYYY-MM-DD
};
