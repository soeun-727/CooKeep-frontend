// src/types/record.ts
import type { RecipeContent } from "./recipe";

export interface CookeepRecord {
  id: string;
  recipeId: number;
  recipeTitle: string;
  memo: string;
  images: ImageWithUrl[];
  createdAt: string; // "2026.02.02" ui에서 이렇게 나와야하는거고 아마도 "2026-02-02"일수도 있음
  isPublic: boolean;
  recipeContent: RecipeContent;
  tags?: string[];
  relatedVideos?: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
}

export interface ImageWithUrl {
  url: string;
}
