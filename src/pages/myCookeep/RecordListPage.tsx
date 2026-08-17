import { useEffect, useState } from "react";

import { DailyRecipe, getDailyRecipesByDate } from "@/api/myRecipe";

import RecordCard from "@/components/myCookeep/record/RecordCard";
import { BackHeader } from "@/components/ui/BackHeader";

const getKstToday = () => {
  return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

export default function RecordListPage() {
  const [records, setRecords] = useState<DailyRecipe[]>([]);

  useEffect(() => {
    let isActive = true;

    const fetchRecords = async () => {
      try {
        const response = await getDailyRecipesByDate(getKstToday());
        if (isActive && response.status === "OK") {
          setRecords(response.data);
        }
      } catch (error) {
        console.error("전체 요리 기록 조회 실패:", error);
      }
    };

    fetchRecords();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="flex h-full flex-col gap-[30px] px-4">
      <BackHeader title="전체보기" />
      <div className="flex w-full flex-col gap-3">
        {records.map(record => (
          <RecordCard key={record.dailyRecipeId} record={record} />
        ))}
      </div>
    </section>
  );
}
