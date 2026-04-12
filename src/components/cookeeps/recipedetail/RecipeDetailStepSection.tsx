interface Props {
  steps: string[];
}

export default function RecipeDetailStepSection({ steps }: Props) {
  return (
    <div className="flex flex-col items-start gap-[10px] w-full">
      {/* 제목 */}
      <span className="typo-body2 text-[#7D7D7D] self-stretch">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex flex-col items-start gap-[8px] w-full">
        {steps.map((description, index) => {
          const cleanDescription = description.replace(/^\d+\.\s*/, "");
          const stepOrder = index + 1;

          return (
            // <div
            //   key={stepOrder}
            //   className="flex justify-start items-start w-full gap-3"
            // >
            //   {/* 번호 배지 */}
            //   <div className="flex items-center justify-center min-w-[30px] h-[20px] px-[12px] rounded-full bg-[#202020] text-white text-[12px] font-semibold leading-[16px] flex-shrink-0">
            //     {stepOrder}
            //   </div>

            //   {/* 단계 설명 */}
            //   <p className="text-[#202020] typo-body2 flex-1 break-keep">
            //     {cleanDescription}
            //   </p>
            // </div>
            <div key={stepOrder} className="flex items-start gap-3 w-full">
              {/* 번호 */}
              <div className="flex items-start justify-center w-[30px] flex-shrink-0">
                <div className="flex items-center justify-center w-[30px] h-[20px] leading-[16px] rounded-full bg-[#202020] text-white text-xs font-semibold">
                  {stepOrder}
                </div>
              </div>

              {/* 설명 */}
              <p className="flex-1 text-[#202020] typo-body2 leading-[24px]">
                {cleanDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
