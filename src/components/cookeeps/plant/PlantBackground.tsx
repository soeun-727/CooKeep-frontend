import PlantImage from "./PlantImage";
import WaterToast from "./WaterToast";
// 이거 크기 1대1로 반응형으로 했는데 별로면 수정....

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
    <section className="relative w-full flex justify-center">
      {/* 기준 박스 (식물 + 토스트 공통) */}
      <div className="relative w-full max-w-[450px] aspect-square">
        {!isLoading && <PlantImage overridePlantStage={overridePlantStage} />}
        {/* 토스트는 반드시 여기 */}
        <WaterToast message={message} isVisible={showToast} />
      </div>
    </section>
  );
}
