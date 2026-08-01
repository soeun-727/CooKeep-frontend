import ProfileExample from "@/assets/profile/profile_example.svg";

export interface ProfileImageData {
  id: number;
  imageUrl: string;
}

// 총 12개 예정, 현재는 profile_example.svg만 존재
export const PROFILE_IMAGES: ProfileImageData[] = [
  { id: 1, imageUrl: ProfileExample },
  { id: 2, imageUrl: ProfileExample },
  { id: 3, imageUrl: ProfileExample },
  { id: 4, imageUrl: ProfileExample },
  { id: 5, imageUrl: ProfileExample },
  { id: 6, imageUrl: ProfileExample },
  { id: 7, imageUrl: ProfileExample },
  { id: 8, imageUrl: ProfileExample },
  { id: 9, imageUrl: ProfileExample },
  { id: 10, imageUrl: ProfileExample },
  { id: 11, imageUrl: ProfileExample },
  { id: 12, imageUrl: ProfileExample },
];
