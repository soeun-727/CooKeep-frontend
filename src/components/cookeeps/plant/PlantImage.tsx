import { memo } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { PLANT_NAME_TO_TYPE } from "@/constants/plantTypeMap";

import { EMPTY_PLANT_IMAGE, PLANT_IMAGES } from "./PlantImages";

interface PlantImageProps {
  overridePlantStage?: 1 | 2 | 3 | 4;
}

function PlantImage({ overridePlantStage }: PlantImageProps) {
  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const justHarvestedPlant = useCookeepsStore(s => s.justHarvestedPlant);

  // 수확 직후 - 수확된 식물의 4단계 이미지 유지
  if (justHarvestedPlant && !currentPlant) {
    const imageSrc =
      PLANT_IMAGES[PLANT_NAME_TO_TYPE[justHarvestedPlant.plantName]][4];
    return (
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="harvested plant"
          // loading="lazy"
          loading="eager"
          decoding="async"
          className="absolute top-1/2 left-1/2 aspect-square w-[106.13%] max-w-none -translate-x-1/2 -translate-y-1/2"
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
    <div className="absolute inset-0">
      <img
        src={imageSrc}
        alt="plant"
        // loading="lazy"
        loading="eager"
        decoding="async"
        className="absolute top-1/2 left-1/2 h-auto w-[106.13%] max-w-none -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default memo(PlantImage);
