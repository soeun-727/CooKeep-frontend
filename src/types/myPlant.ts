// src/types/myPlant.ts

export interface MyPlant {
  userPlantId: number;
  plantName: string; // "감자"
  imageUrl: string;
  level: 1 | 2 | 3 | 4;
  isHarvested: boolean;
  isProfile: boolean;
  createdAt: string;
}
