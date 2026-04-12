import tempFoodPhoto from "../assets/mycookeep/record/temp_food_photo.svg";
import type { ImageWithUrl } from "../types/record";

export function getRecordImageSrc(image?: ImageWithUrl): string {
  return image?.url ?? tempFoodPhoto;
}
