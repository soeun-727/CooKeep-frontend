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
    <section className="relative flex w-full justify-center">
      {/* 기준 박스 (식물 + 토스트 공통) */}
      <div className="relative aspect-square w-full max-w-[450px]">
        {!isLoading && <PlantImage overridePlantStage={overridePlantStage} />}
        {/* 토스트는 반드시 여기 */}
        <WaterToast message={message} isVisible={showToast} />
      </div>
    </section>
  );
}
