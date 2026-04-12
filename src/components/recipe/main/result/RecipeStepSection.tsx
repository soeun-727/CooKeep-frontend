interface Step {
  order: number;
  description: string;
}

interface Props {
  steps: Step[];
  difficulty: string;
}

export default function RecipeStepSection({ steps }: Props) {
  // 숫자와 공백을 제거하는 함수
  const formatDescription = (text: string) => {
    // 1. 2. 혹은 1) 2) 형태의 시작 패턴을 제거합니다.
    return text.replace(/^\d+[.)\s:-]*/, "").trim();
  };

  return (
    <div className="flex flex-col items-start gap-[10px] w-full">
      {/* 제목 */}
      <span className="typo-body2 text-[#7D7D7D] self-stretch">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex flex-col items-start gap-[8px] w-full">
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
        {steps.map((step) => (
          <div key={step.order} className="flex items-start gap-3 w-full">
            {/* 번호 버튼 */}
            <div className="flex items-center justify-center w-[30px] h-[20px] leading-[16px] rounded-full bg-[#202020] text-white text-xs font-semibold flex-shrink-0 ">
              {step.order}
            </div>

            {/* 설명 */}
            <p className="flex-1 text-[#202020] typo-body2 leading-[22px]">
              {formatDescription(step.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
