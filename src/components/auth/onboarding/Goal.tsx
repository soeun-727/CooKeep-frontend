import { useState } from "react";

const goals = [
  { id: "COOKING", title: "주 n회 요리하기" },
  { id: "PHOTO_RECORD", title: "요리 사진 n번 기록하기" },
  { id: "USE_EXPIRING_INGREDIENT", title: "유통기한 임박 재료 n개 사용하기" },
  { id: "RECIPE_LIKE", title: "레시피에 좋아요 n회 남기기" },
];

interface GoalProps {
  selectedGoal: { id: string; title: string };
  onSelect: (goal: { id: string; title: string }) => void;
}

export default function Goal({ selectedGoal, onSelect }: GoalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentGoal = selectedGoal.id ? selectedGoal : goals[0];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1 !text-[22px]">
          이번 주 달성하고 싶은 목표를 세워보세요!
        </h1>
        <h3 className="typo-h3 text-gray-500">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>

      <div className="w-[361px] mt-[46px]">
        <div className="border rounded-md overflow-hidden border-[#D1D1D1] bg-white transition-all">
          {/* 클릭 영역: 아코디언 헤더 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-[48px] px-5 flex items-center justify-between text-left"
          >
            <span className="typo-body2 text-black">{currentGoal.title}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
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
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-[300px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => {
                    onSelect({ id: goal.id, title: goal.title });
                    setIsOpen(false);
                  }}
                  className={`w-full h-[48px] px-5 text-left typo-body2 transition-colors 
                    ${goal.id === currentGoal.id ? "text-(--color-green) font-semibold bg-[#F9F9F9]" : "text-gray-500 bg-white hover:bg-gray-50"}
                  `}
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
