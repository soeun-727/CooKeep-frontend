import { RecipeStep } from "@/api/cookeeps";

interface RecipeDetailStepSectionProps {
  steps: RecipeStep[];
}

export default function RecipeDetailStepSection({
  steps,
}: RecipeDetailStepSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[10px]">
      {/* 제목 */}
      <span className="typo-body2 self-stretch text-gray-50">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-[8px]">
        {steps.map((step, index) => {
          const cleanDescription = step.content.replace(/^\d+\.\s*/, "");
          const stepOrder = index + 1;

          return (
            <div key={stepOrder} className="flex w-full items-start gap-3">
              {/* 번호 */}
              <div className="flex w-[30px] flex-shrink-0 items-start justify-center">
                <div className="bg-gray-80 text-gray-0 flex h-[20px] w-[30px] items-center justify-center rounded-full text-xs leading-[16px] font-semibold">
                  {stepOrder}
                </div>
              </div>

              {/* 설명 */}
              <p className="text-gray-80 typo-body2 flex-1 leading-[24px]">
                {cleanDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
