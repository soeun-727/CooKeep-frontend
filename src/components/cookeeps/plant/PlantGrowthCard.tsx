import { useEffect } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

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
      <div className="flex w-full flex-col items-center gap-4 px-4 pb-6">
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex w-full flex-col items-start gap-0.5 px-1">
            <span className="typo-h3 text-gray-80 line-clamp-1">
              {plantName}
            </span>

            <span className="typo-caption text-gray-50">{dateText} 기준</span>
          </div>

          <div className="w-full">
            <GrowthProgressBar overridePlantStage={overridePlantStage} />
          </div>
        </div>

        <p className="typo-caption text-center text-gray-50">
          다음 수확까지 더 건강하게 키워보아요!
        </p>

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
