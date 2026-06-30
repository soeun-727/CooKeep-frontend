interface RecipeDetailStepSectionProps {
  steps: string[];
}

export default function RecipeDetailStepSection({
  steps,
}: RecipeDetailStepSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[10px]">
      {/* 제목 */}
      <span className="typo-body2 text-gray-50 self-stretch">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-[8px]">
        {steps.map((description, index) => {
          const cleanDescription = description.replace(/^\d+\.\s*/, "");
          const stepOrder = index + 1;

          return (
            <div key={stepOrder} className="flex w-full items-start gap-3">
              {/* 번호 */}
              <div className="flex items-start justify-center w-[30px] flex-shrink-0">
                <div className="flex items-center justify-center w-[30px] h-[20px] leading-[16px] rounded-full bg-gray-80 text-gray-0 text-xs font-semibold">
                  {stepOrder}
                </div>
              </div>

              {/* 설명 */}
              <p className="flex-1 text-gray-80 typo-body2 leading-[24px]">
                {cleanDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
