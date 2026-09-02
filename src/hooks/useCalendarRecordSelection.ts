import { useCallback, useState } from "react";

import { getDailyRecipesByDate } from "@/api/myRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

export const useCalendarRecordSelection = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const records = useCookeepRecordStore(s => s.records);
  const setRecords = useCookeepRecordStore(s => s.setRecords);

  const fetchDailyData = useCallback(
    async (dateStr: string) => {
      try {
        const response = await getDailyRecipesByDate(dateStr);
        if (response.status === "OK") {
          setRecords(response.data);
        }
      } catch (error) {
        console.error("레시피 조회 실패:", error);
        setRecords([]);
      }
    },
    [setRecords],
  );

  const handleCalendarDateClick = useCallback(
    (date: string) => {
      setSelectedDate(date);
      fetchDailyData(date.replaceAll(".", "-"));
    },
    [fetchDailyData],
  );

  const reset = useCallback(() => {
    setSelectedDate("");
    setRecords([]);
  }, [setRecords]);

  return {
    selectedDate,
    records,
    fetchDailyData,
    handleCalendarDateClick,
    handleCalendarMonthChange: reset,
    reset,
  };
};
