import { create } from "zustand";

export type RewardType =
  | "ONBOARDING_INGREDIENT"
  | "ONBOARDING_RECIPE"
  | "WEEKLY"
  | "EXPIRING"
  | "COMEBACK";

export interface RewardQueueItem {
  type: RewardType;
  points?: number;
}

interface RewardState {
  queue: RewardQueueItem[];
  current: RewardQueueItem | null;

  enqueue: (type: RewardType, points?: number) => void;
  dequeue: () => void;
}

export const useRewardStore = create<RewardState>((set, get) => ({
  queue: [],
  current: null,

  enqueue: (type, points) => {
    const { queue, current } = get();

    // 중복 방지
    if (queue.some(q => q.type === type) || current?.type === type) return;

    const item: RewardQueueItem = { type, points };
    let newQueue: RewardQueueItem[];

    // 핵심: 온보딩은 무조건 맨 앞
    if (type === "COMEBACK") {
      newQueue = [item, ...queue];
    } else if (
      type === "ONBOARDING_INGREDIENT" ||
      type === "ONBOARDING_RECIPE"
    ) {
      newQueue = [item, ...queue];
    } else {
      newQueue = [...queue, item];
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
