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
    <div className="bg-gray-0 border-gray-10 text-gray-80 rounded-L flex w-full flex-col items-start gap-4 border px-3 py-4">
      {/* 제목 */}
      <span className="typo-l-strong">조리 방법</span>
      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-3">
        {steps.map(step => (
          <div key={step.order} className="flex w-full items-start">
            {/* 번호 버튼 */}
            <div className="typo-m-strong text-gray-30 flex h-5 w-5 items-center justify-start">
              <span className="h-full">{step.order}</span>
            </div>
            {/* 설명 */}
            <p className="typo-m flex-1">
              {formatDescription(step.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
