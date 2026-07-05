import { ONBOARDING_GOALS } from "@/constants/onboarding";

interface SpecificGoalProps {
  selectedGoal: { id: string; title: string };
  count: string; // 부모로부터 받은 현재 숫자 값
  onCountChange: (value: string) => void; // 부모의 숫자 상태를 변경하는 함수
}

export default function SpecificGoal({
  selectedGoal,
  count,
  onCountChange,
}: SpecificGoalProps) {
  const DEFAULT_GOAL = ONBOARDING_GOALS[0].title;

  const displayTitle = selectedGoal.title || DEFAULT_GOAL;

  const titleParts = displayTitle.split("n");

  const numValue = parseInt(count, 10);
  const isError =
    count !== "" && (isNaN(numValue) || numValue < 1 || numValue > 10);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      onCountChange(value);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-[46px] w-[361px]">
        <h1 className="typo-h1 !text-[22px]">
          이번 주 달성하고 싶은 목표를 세워보세요!
        </h1>
        <h3 className="typo-h3 text-gray-500">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>

      <div className="mt-[46px] flex w-[361px] flex-col items-start">
        <div
          className={`bg-gray-0 flex h-12 w-full items-center rounded-md border px-3 transition-all ${
            isError ? "border-semantic-negative" : "border-gray-10"
          }`}
        >
          <span className="typo-body2 text-gray-80 whitespace-pre">
            {titleParts[0]}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={count}
            onChange={handleChange}
            placeholder="3"
            className={`typo-body2 w-5 bg-transparent text-center font-bold underline transition-colors outline-none ${
              isError ? "text-semantic-negative" : "text-semantic-positive"
            }`}
          />
          <span className="typo-body2 text-gray-80">{titleParts[1]}</span>
        </div>

        {/* 에러 메시지: 범위가 벗어났거나 비어있지 않을 때만 표시 */}
        {isError && (
          <p className="text-semantic-negative animate-fadeIn mt-[5px] ml-3 text-[10px]">
            1~10 사이의 숫자로 입력해주세요
          </p>
        )}
      </div>
    </div>
  );
}
