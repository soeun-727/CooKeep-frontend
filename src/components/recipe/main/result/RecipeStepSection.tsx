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
      <span className="typo-body2 self-stretch text-[#7D7D7D]">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex w-full flex-col items-start gap-[8px]">
        {/* {steps.map((step) => (
          <div
            key={step.order}
            className="flex justify-start items-start w-full gap-3"
          >
            <div className="flex items-center justify-center w-[30px] h-[22px] px-3 rounded-full bg-[#202020] text-white text-[12px] font-semibold leading-[16px] flex-shrink-0 mt-[3px]">
              {step.order}
            </div>

            <p className="text-[#202020] typo-body2 max-w-[289px] leading-[22px]">
              {formatDescription(step.description)}
            </p>
          </div>
        ))} */}
        {steps.map(step => (
          <div key={step.order} className="flex w-full items-start gap-3">
            {/* 번호 버튼 */}
            <div className="flex h-[20px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#202020] text-xs leading-[16px] font-semibold text-white">
              {step.order}
            </div>

            {/* 설명 */}
            <p className="typo-body2 flex-1 leading-[22px] text-[#202020]">
              {formatDescription(step.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
