import { type ProfileData, getProfileInfo } from "@/api/user";
import { create } from "zustand";

interface MyCookeepState {
  profile: ProfileData | null;
  fetchProfile: () => Promise<void>;
}

export const useMyCookeepStore = create<MyCookeepState>(set => ({
  profile: null,
  fetchProfile: async () => {
    try {
      const response = await getProfileInfo();

      if (response.status === "OK") {
        set({ profile: response.data });
      }
    } catch (e) {
      console.error("프로필 로딩 실패:", e);
    }
  },
}));
