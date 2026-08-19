import { RecipeStep } from "@/api/cookeeps";

interface RecipeDetailStepSectionProps {
  steps: RecipeStep[];
}

export default function RecipeDetailStepSection({
  steps,
}: RecipeDetailStepSectionProps) {
  // 숫자와 공백을 제거하는 함수 (1. 1) 1: 1- 형태 모두 제거)
  const formatDescription = (text: string) => {
    return text.replace(/^\d+[.)\s:-]*/, "").trim();
  };

  return (
    <div className="bg-gray-0 border-gray-10 text-gray-80 rounded-L flex w-full flex-col items-start gap-4 border px-3 py-4">
      {/* 제목 */}
      <span className="typo-l-strong">조리 방법</span>

      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-3">
        {steps.map((step, index) => {
          const stepOrder = index + 1;

          return (
            <div key={stepOrder} className="flex w-full items-start">
              {/* 번호 */}
              <div className="typo-m-strong text-gray-30 flex h-5 w-5 items-center justify-start">
                <span className="h-full">{stepOrder}</span>
              </div>

              {/* 설명 */}
              <p className="typo-m flex-1">
                {formatDescription(step.content)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}