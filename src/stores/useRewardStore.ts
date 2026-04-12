import { create } from "zustand";

export type RewardType =
  | "ONBOARDING_INGREDIENT"
  | "ONBOARDING_RECIPE"
  | "WEEKLY"
  | "EXPIRING";

interface RewardState {
  queue: RewardType[];
  current: RewardType | null;

  enqueue: (type: RewardType) => void;
  dequeue: () => void;
}

export const useRewardStore = create<RewardState>((set, get) => ({
  queue: [],
  current: null,

  enqueue: (type) => {
    const { queue, current } = get();

    // 중복 방지
    if (queue.includes(type) || current === type) return;

    let newQueue;

    // 핵심: 온보딩은 무조건 맨 앞
    if (type === "ONBOARDING_INGREDIENT" || type === "ONBOARDING_RECIPE") {
      newQueue = [type, ...queue];
    } else {
      newQueue = [...queue, type];
    }

    set({
      queue: newQueue,
      current: current ?? newQueue[0],
    });
  },

  dequeue: () => {
    const { queue } = get();

    const newQueue = queue.slice(1);

    set({
      queue: newQueue,
      current: newQueue[0] ?? null,
    });
  },
}));
