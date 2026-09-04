import MyPlantButton from "./MyPlantButton";
import PlantImage from "./PlantImage";
import WaterToast from "./WaterToast";

interface PlantBackgroundProps {
  showToast: boolean;
  message: string;
  overridePlantStage?: 1 | 2 | 3 | 4; // 1단계로 임시 override
  plant?: string;
  isLoading?: boolean;
}

export default function PlantBackground({
  showToast,
  message,
  overridePlantStage,
  isLoading,
}: PlantBackgroundProps) {
  return (
    <section className="relative h-[300px] w-full overflow-hidden rounded-t-2xl bg-white">
      {/* 식물 이미지 상단에 '내 식물 + 툴팁' 배치 */}
      <div className="absolute top-0 right-0 left-0 z-20 flex w-full flex-col items-start gap-2 px-4 pt-3">
        <MyPlantButton />
      </div>
      {/* 기준 박스 (식물 + 토스트 공통) */}
      <div className="relative h-full w-full">
        {!isLoading && <PlantImage overridePlantStage={overridePlantStage} />}
        {/* 토스트는 반드시 여기 */}
        <WaterToast message={message} isVisible={showToast} />
      </div>
      <div className="bg-blur-to-b absolute bottom-0 h-10 w-full" />
    </section>
  );
}
