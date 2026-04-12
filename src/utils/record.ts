// src/utils/record.ts
import { getKoreaToday } from "./date";

export const getTodayKey = () => getKoreaToday();

export const hasTodayRecord = () => {
  return localStorage.getItem(`record-${getTodayKey()}`) === "true";
};

export const setTodayRecord = () => {
  localStorage.setItem(`record-${getTodayKey()}`, "true");
};
