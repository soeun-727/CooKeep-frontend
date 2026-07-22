import { useNavigate } from "react-router-dom";

import { useMyCookeepStore } from "@/stores/useMyCookeepStore";

import EditIcon from "@/assets/icons/rename.svg?react";
import GoalImage from "@/assets/mycookeep/goal.svg?react";

import { SpeechBubble } from "@/components/ui/SpeechBubble";

import { GOAL_TYPE_MAP } from "@/utils/getGoalDescription";
import { getGoalDescription } from "@/utils/getGoalDescription";

// TODO: 스피치 버블 7초 뒤에 가져오기

export const MyCookeepGoal = () => {
  const navigate = useNavigate();
  const profile = useMyCookeepStore(s => s.profile);

  const currentGoalEntry = Object.entries(GOAL_TYPE_MAP).find(
    ([, g]) => g.value === profile?.weeklyGoal?.goalActionType,
  );

  const goalId = currentGoalEntry ? currentGoalEntry[0] : "cook";
  const targetCount = profile?.weeklyGoal?.targetCount ?? 0;

  return (
    <section className="border-gray-10 bg-gray-0 flex items-center justify-between gap-3 rounded-[12px] border px-3 py-4">
      <GoalImage className="h-11 w-11" />
      <div className="flex flex-1 flex-col items-start">
        <p className="typo-m text-gray-50">이번 주 목표</p>
        <p
          className={`typo-l-strong ${profile?.weeklyGoal?.goalActionType ? "text-gray-80" : "text-gray-30"}`}
        >
          {profile?.weeklyGoal?.goalActionType ? (
            <>
              {getGoalDescription(
                profile.weeklyGoal.goalActionType,
                targetCount,
              )}
            </>
          ) : (
            <>아직 설정한 목표가 없어요</>
          )}
        </p>
      </div>

      <button
        onClick={() =>
          navigate("/mycookeep/goals", {
            state: {
              currentGoalId: goalId,
              currentCount: profile?.weeklyGoal?.targetCount ?? 0,
            },
          })
        }
      >
        <EditIcon className="text-gray-30 h-[18px] w-[18px]" />
      </button>

      {!profile?.weeklyGoal?.goalActionType && (
        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2">
          <SpeechBubble
            text="이번 주 달성하고 싶은 목표를 세워보세요!"
            textStyle="typo-caption text-gray-80"
            trianglePosition="top"
          />
        </div>
      )}
    </section>
  );
};
