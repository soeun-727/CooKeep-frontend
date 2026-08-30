import { useState } from "react";

import DropdownIcon from "@/assets/onboarding/dropdown_icon.svg?react";

import { ONBOARDING_GOALS } from "@/constants/onboarding";

interface GoalProps {
  selectedGoal: { id: string; title: string };
  onSelect: (goal: { id: string; title: string }) => void;
}

export default function Goal({ selectedGoal, onSelect }: GoalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentGoal = selectedGoal.id ? selectedGoal : ONBOARDING_GOALS[0];
  const otherGoals = ONBOARDING_GOALS.filter(
    goal => goal.id !== currentGoal.id,
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="typo-h2">이번 주 목표부터 정해볼까요?</h1>
        <h3 className="typo-l text-gray-50">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>

      <div className="border-gray-10 bg-gray-0 overflow-hidden rounded-[12px] border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between gap-3 p-3 text-left"
        >
          <span className="typo-m text-gray-80 flex flex-1">
            {currentGoal.title}
          </span>
          <DropdownIcon
            className={`h-6 w-6 text-gray-50 transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        </button>

        {/* 현재골 제외 나머지 목표 드롭다운 */}
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? otherGoals.length * 48 : 0 }}
        >
          <div className="flex flex-col">
            {otherGoals.map(goal => (
              <button
                key={goal.id}
                onClick={() => {
                  onSelect({ id: goal.id, title: goal.title });
                  setIsOpen(false);
                }}
                className="typo-m bg-gray-0 hover:bg-gray-10 hover:text-green text-gray-80 w-full p-3 text-left transition-colors"
              >
                {goal.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
