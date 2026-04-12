import { create } from "zustand";
import { RANK_DATA } from "../constants/totalData";

interface Rank {
  id: number;
  img: string;
  title: string;
  likes: number;
}

interface RankState {
  allRanks: Rank[];
  setAllRanks: (ranks: Rank[]) => void;
}

export const useRankStore = create<RankState>((set) => ({
  // 초기 데이터는 전체 리스트 데이터로 설정
  allRanks: RANK_DATA,

  setAllRanks: (ranks) => set({ allRanks: ranks }),
}));
