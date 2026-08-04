import { useEffect } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import RefreshIcon from "@/assets/cookeeps/main/refresh_cookeeps.svg";

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
  onRefresh,
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

  const handleRefreshClick = () => {
    refreshGrowth();
    onRefresh?.();
  };

  return (
    <div className="-mt-[46px] flex justify-center">
      <div className="plant relative z-50 w-full max-w-[450px]">
        <div className="absolute -top-[20px] left-1/2 z-50 -translate-x-1/2">
          <WaterButton
            onSuccess={() => {
              onWaterSuccess?.();
              refreshGrowth();
            }}
          />
        </div>

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
                <img src={RefreshIcon} alt="새로고침" className="h-4 w-4" />
              </button>
            </div>

            <GrowthProgressBar overridePlantStage={overridePlantStage} />
          </div>
        </div>
      </div>
    </div>
  );
}
