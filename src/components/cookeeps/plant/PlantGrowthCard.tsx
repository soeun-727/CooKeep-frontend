import WaterButton from "./WaterButton";
import RefreshIcon from "../../../assets/cookeeps/main/refresh_cookeeps.svg";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import GrowthProgressBar from "./GrowthProgressBar";
import { PLANT_NAME_KR } from "../../../constants/plantNames";
import { useEffect } from "react";
import { preloadNextStage } from "./preloadPlantImages";
import { PLANT_NAME_TO_TYPE } from "../../../constants/plantTypeMap";

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
  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const lastRefreshedAt = useCookeepsStore((s) => s.lastRefreshedAt);
  const refreshGrowth = useCookeepsStore((s) => s.refreshGrowth);

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
      <div className="relative w-full max-w-[450px] shadow-[0px_1px_8px_-2px_rgba(17,17,17,0.25)] z-50">
        <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 z-50">
          <WaterButton
            onSuccess={() => {
              onWaterSuccess?.();
              refreshGrowth();
            }}
          />
        </div>

        <div className="bg-white rounded-xl shadow px-[15px] pt-[23px] pb-2">
          <div className="flex flex-col items-center max-w-[360px] mx-auto">
            <div className="flex justify-between items-center w-full h-9">
              <div className="flex items-center justify-center gap-2 h-[26px]">
                <span className="text-[18px] font-semibold text-[#202020]">
                  {plantName}
                </span>
                <span className="text-xs text-[#7D7D7D] mt-1">
                  {dateText} 기준
                </span>
              </div>

              {/* 여기를 handleRefreshClick으로 수정했습니다 */}
              <button onClick={handleRefreshClick}>
                <img src={RefreshIcon} alt="새로고침" className="w-4 h-4" />
              </button>
            </div>

            <GrowthProgressBar overridePlantStage={overridePlantStage} />
          </div>
        </div>
      </div>
    </div>
  );
}
