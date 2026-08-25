import { useEffect } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

<<<<<<< HEAD
=======
import RefreshIcon from "@/assets/cookeeps/main/refresh_cookeeps.svg?react";

>>>>>>> develop
import { PLANT_NAME_KR } from "@/constants/plantNames";
import { PLANT_NAME_TO_TYPE } from "@/constants/plantTypeMap";

import GrowthProgressBar from "./GrowthProgressBar";
import WaterButton from "./WaterButton";
import { preloadNextStage } from "./preloadPlantImages";

interface PlantGrowthCardProps {
  onWaterSuccess?: () => void;
  overridePlantStage?: 1 | 2 | 3 | 4;
  plant?: string;
  onRefresh?: () => void;
}

export default function PlantGrowthCard({
  onWaterSuccess,
  overridePlantStage,
}: PlantGrowthCardProps) {
  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const lastRefreshedAt = useCookeepsStore(s => s.lastRefreshedAt);
  const refreshGrowth = useCookeepsStore(s => s.refreshGrowth);

  useEffect(() => {
    refreshGrowth();
  }, [refreshGrowth]);

  useEffect(() => {
    if (!currentPlant) return;

    preloadNextStage(
      PLANT_NAME_TO_TYPE[currentPlant.plantName],
      currentPlant.level,
    );
  }, [currentPlant]);

  const plantName = currentPlant
    ? PLANT_NAME_KR[PLANT_NAME_TO_TYPE[currentPlant.plantName]]
    : "-";

  const date = lastRefreshedAt ?? new Date();

  const dateText = `${date.getMonth() + 1}월 ${date.getDate()}일 ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="flex w-full justify-center">
      {/* 식물카드*/}
      <div className="flex w-full flex-col items-center gap-4 self-stretch px-4 pb-6">
        {/* 진행바 + 이름/날짜 묶음*/}
        <div className="flex w-full flex-col items-start gap-1 self-stretch">
          {/* 이름 + 날짜 */}
          <div className="flex w-full flex-col items-start gap-0.5 self-stretch px-1">
            {/* 식물 이름 */}
            <span className="typo-h3 text-gray-80 line-clamp-1 self-stretch">
              {plantName}
            </span>

<<<<<<< HEAD
            {/* 날짜 시간 */}
            <span className="typo-caption self-stretch text-gray-50">
              {dateText} 기준
            </span>
          </div>
=======
        <div className="bg-gray-0 rounded-xl px-[15px] pt-[23px] pb-2 shadow">
          <div className="mx-auto flex max-w-[360px] flex-col items-center">
            <div className="flex h-9 w-full items-center justify-between">
              <div className="flex h-[26px] items-center justify-center gap-2">
                <span className="text-gray-80 text-[18px] font-semibold">
                  {plantName}
                </span>
                <span className="mt-1 text-xs text-gray-50">
                  {dateText} 기준
                </span>
              </div>

              {/* 여기를 handleRefreshClick으로 수정했습니다 */}
              <button onClick={handleRefreshClick}>
                <RefreshIcon aria-label="새로고침" role="img" className="h-4 w-4" />
              </button>
            </div>
>>>>>>> develop

          <div className="w-full self-stretch">
            <GrowthProgressBar overridePlantStage={overridePlantStage} />
          </div>
        </div>

        {/* 안내 글씨 */}
        <p className="typo-caption self-stretch text-center text-gray-50">
          다음 수확까지 더 건강하게 키워보아요!
        </p>

        {/* 물 주기 버튼 */}
        <WaterButton
          onSuccess={() => {
            onWaterSuccess?.();
            refreshGrowth();
          }}
        />
      </div>
    </div>
  );
}
