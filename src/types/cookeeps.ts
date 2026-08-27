export type ActiveModal =
  | "onboarding"
  | "select"
  | "selected"
  | "wilting"
  | "wilted"
  | "free"
  | "harvest"
  | null;

export interface SelectedPlant {
  id: number;
  text: string;
  img: string;
  description: string;
  isHarvested?: boolean;
}
