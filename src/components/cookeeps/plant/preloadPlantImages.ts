import type { PlantType } from "@/stores/useCookeepsStore";

import { PLANT_IMAGES, type PlantStage } from "./PlantImages";

export function preloadNextStage(plant: PlantType, currentStage: number) {
  const nextStage = (currentStage + 1) as PlantStage;

  if (nextStage > 4) return;

  const src = PLANT_IMAGES[plant]?.[nextStage];
  if (!src) return;

  const img = new Image();
  img.src = src;
}
