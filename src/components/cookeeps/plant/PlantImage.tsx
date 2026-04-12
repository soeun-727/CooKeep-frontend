import { memo } from "react";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import { EMPTY_PLANT_IMAGE, PLANT_IMAGES } from "./PlantImages";
import { PLANT_NAME_TO_TYPE } from "../../../constants/plantTypeMap";

interface PlantImageProps {
  overridePlantStage?: 1 | 2 | 3 | 4;
}

export default memo(function PlantImage({
  overridePlantStage,
}: PlantImageProps) {
  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const justHarvestedPlant = useCookeepsStore((s) => s.justHarvestedPlant);

  // 수확 직후 - 수확된 식물의 4단계 이미지 유지
  if (justHarvestedPlant && !currentPlant) {
    const imageSrc =
      PLANT_IMAGES[PLANT_NAME_TO_TYPE[justHarvestedPlant.plantName]][4];
    return (
      <div className="relative w-full h-full">
        <img
          src={imageSrc}
          alt="harvested plant"
          // loading="lazy"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const stageToShow: 1 | 2 | 3 | 4 =
    overridePlantStage ?? currentPlant?.level ?? 1;

  const imageSrc = currentPlant
    ? PLANT_IMAGES[PLANT_NAME_TO_TYPE[currentPlant.plantName]][stageToShow]
    : EMPTY_PLANT_IMAGE;

  return (
    <div className="relative w-full h-full">
      <img
        src={imageSrc}
        alt="plant"
        // loading="lazy"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain"
      />
    </div>
  );
});
