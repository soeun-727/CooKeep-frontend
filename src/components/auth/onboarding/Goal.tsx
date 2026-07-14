import { useState } from "react";

import { ONBOARDING_GOALS } from "@/constants/onboarding";

interface GoalProps {
  selectedGoal: { id: string; title: string };
  onSelect: (goal: { id: string; title: string }) => void;
}

export default function Goal({ selectedGoal, onSelect }: GoalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentGoal = selectedGoal.id ? selectedGoal : ONBOARDING_GOALS[0];

  return (
    <div className="flex w-full flex-col items-center px-4">
      <div className="mt-[46px] w-full gap-2">
        <h1 className="typo-h2">이번 주 목표부터 정해볼까요?</h1>
        <h3 className="typo-l text-gray-50">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>

      <div className="mt-[46px] w-full">
        <div className="border-gray-10 bg-gray-0 overflow-hidden rounded-md border">
          {/* 클릭 영역: 아코디언 헤더 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-[48px] w-full items-center justify-between px-5 text-left"
          >
            <span className="typo-m text-gray-80">{currentGoal.title}</span>
            <svg
              className={`h-5 w-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 펼쳐지는 리스트 영역 */}
          <div
            className={`overflow-hidden duration-300 ease-in-out ${
              isOpen ? "max-h-[300px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col">
              {ONBOARDING_GOALS.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => {
                    onSelect({ id: goal.id, title: goal.title });
                    setIsOpen(false);
                  }}
                  className={`typo-m h-[48px] w-full px-5 text-left transition-colors ${goal.id === currentGoal.id ? "text-green bg-gray-10" : "text-gray-80 bg-gray-0 hover:bg-gray-50"} `}
                >
                  {goal.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
