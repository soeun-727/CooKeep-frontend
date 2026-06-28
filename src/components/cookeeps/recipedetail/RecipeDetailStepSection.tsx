interface RecipeDetailStepSectionProps {
  steps: string[];
}

export default function RecipeDetailStepSection({
  steps,
}: RecipeDetailStepSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[10px]">
      {/* 제목 */}
      <span className="typo-body2 self-stretch text-[#7D7D7D]">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-[8px]">
        {steps.map((description, index) => {
          const cleanDescription = description.replace(/^\d+\.\s*/, "");
          const stepOrder = index + 1;

          return (
            <div key={stepOrder} className="flex items-start gap-3 w-full">
              {/* 번호 */}
              <div className="flex w-[30px] flex-shrink-0 items-start justify-center">
                <div className="flex h-[20px] w-[30px] items-center justify-center rounded-full bg-[#202020] text-xs leading-[16px] font-semibold text-white">
                  {stepOrder}
                </div>
              </div>

              {/* 설명 */}
              <p className="typo-body2 flex-1 leading-[24px] text-[#202020]">
                {cleanDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
