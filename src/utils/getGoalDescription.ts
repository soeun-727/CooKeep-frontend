export const GOAL_TYPE_MAP = {
  cook: {
    value: "COOKING",
    label: "직접 요리하기",
    format: (count: number) => `주 ${count}회 요리하기`,
  },
  photo: {
    value: "PHOTO_RECORD",
    label: "요리 사진 기록하기",
    format: (count: number) => `요리 사진 ${count}번 기록하기`,
  },
  expired: {
    value: "USE_EXPIRING_INGREDIENT",
    label: "유통기한 임박 재료 사용",
    format: (count: number) => `유통기한 임박 재료 ${count}개 사용하기`,
  },
  like: {
    value: "RECIPE_LIKE",
    label: "레시피 좋아요 누르기",
    format: (count: number) => `레시피에 좋아요 ${count}회 남기기`,
  },
} as const;

export const getGoalDescription = (
  serverValue: string,
  count: number,
): string => {
  const goal = Object.values(GOAL_TYPE_MAP).find(g => g.value === serverValue);
  return goal ? goal.format(count) : "";
};

// 서버 전송용 타입 추출
export type GoalActionType =
  (typeof GOAL_TYPE_MAP)[keyof typeof GOAL_TYPE_MAP]["value"];
