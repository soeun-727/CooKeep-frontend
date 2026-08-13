import { useNavigate } from "react-router-dom";

import { DailyRecipe } from "@/api/myRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

import PlusIcon from "@/assets/fridge/items/plus.svg?react";
import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";
import PotIcon from "@/assets/mycookeep/pot.svg?react";

import RecordCard from "./RecordCard";

interface RecordEntryProps {
  record?: DailyRecipe;
}
export default function RecordEntry({ record }: RecordEntryProps) {
  const navigate = useNavigate();
  const { resetRecord } = useCookeepRecordStore();

  const handleRecordClick = () => {
    resetRecord();
    navigate("/mycookeep/record/select");
  };
  return (
    <div className="relative">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between px-1">
          <h1 className="typo-l-strong text-gray-80">최근에 한 요리</h1>
          {record && (
            <button className="flex items-center text-gray-50">
              <p className="typo-label">전체보기</p>
              <figure className="px-[6px]">
                <ArrowRightIcon className="h-[13px] w-2" />
              </figure>
            </button>
          )}
        </div>

        {record ? (
          <RecordCard key={record.dailyRecipeId} record={record} />
        ) : (
          <div className="bg-gray-0 border-gray-10 rounded-L flex w-full gap-4 border px-3 py-4">
            <figure className="bg-gray-10 rounded-S flex py-[18px] pr-[25px] pl-[11px]">
              <PotIcon className="text-gray-30 h-16 w-16" />
            </figure>

            <div className="flex flex-1 flex-col items-start justify-center gap-[2px]">
              <p className="typo-l-strong text-gray-80">
                아직 기록된 요리가 없어요
              </p>
              <p className="typo-m text-gray-50">
                요리를 기록하고
                <br /> 쿠키를 받아보세요!
              </p>
            </div>
          </div>
        )}

        <button
          className="rounded-M hover:bg-gray-10 flex w-full gap-3 bg-white p-3"
          onClick={handleRecordClick}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <PlusIcon className="text-green h-[10px] w-[10px]" />
          </div>
          <p className="typo-m-strong text-gray-80">오늘 만든 요리 기록하기</p>
        </button>
      </div>
    </div>
  );
}
