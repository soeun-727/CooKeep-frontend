interface Step {
  order: number;
  description: string;
}

interface RecipeStepSectionProps {
  steps: Step[];
  difficulty: string;
}

export default function RecipeStepSection({ steps }: RecipeStepSectionProps) {
  // 숫자와 공백을 제거하는 함수
  const formatDescription = (text: string) => {
    // 1. 2. 혹은 1) 2) 형태의 시작 패턴을 제거합니다.
    return text.replace(/^\d+[.)\s:-]*/, "").trim();
  };

  return (
    <div className="flex w-full flex-col items-start gap-[10px]">
      {/* 제목 */}
      <span className="typo-body2 self-stretch text-gray-50">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-[8px]">
        {steps.map(step => (
          <div key={step.order} className="flex w-full items-start gap-3">
            {/* 번호 버튼 */}
            <div className="bg-gray-80 text-gray-0 flex h-[20px] w-[30px] flex-shrink-0 items-center justify-center rounded-full text-xs leading-[16px] font-semibold">
              {step.order}
            </div>

            {/* 설명 */}
            <p className="text-gray-80 typo-body2 flex-1 leading-[22px]">
              {formatDescription(step.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
