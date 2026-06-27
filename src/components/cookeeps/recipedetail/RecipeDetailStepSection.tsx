interface Props {
  steps: string[];
}

export default function RecipeDetailStepSection({ steps }: Props) {
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
            <div key={stepOrder} className="flex w-full items-start gap-3">
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
