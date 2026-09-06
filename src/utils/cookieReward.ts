import { useRewardStore, RewardType } from "@/stores/useRewardStore";
import type { CookieReward } from "@/api/cookies";

const TYPE_TO_REWARD: Partial<Record<string, RewardType>> = {
  ONBOARDING_INGREDIENT: "ONBOARDING_INGREDIENT",
  ONBOARDING_RECIPE: "ONBOARDING_RECIPE",
  BONUS_WEEKLY_GOAL_ACHIEVE: "WEEKLY",
  BONUS_URGENT_INGREDIENT_USE: "EXPIRING",
};

export function enqueueGlobalRewards(reward?: CookieReward | null) {
  const types = reward?.types ?? [];
  types.forEach(t => {
    const mapped = TYPE_TO_REWARD[t];
    if (mapped) useRewardStore.getState().enqueue(mapped, reward?.points);
  });
}
