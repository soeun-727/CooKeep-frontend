interface PlantShortcutTooltipProps {
  visible: boolean;
}

export default function PlantShortcutTooltip({
  visible,
}: PlantShortcutTooltipProps) {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-1/2 z-20 mt-[5px] -translate-x-1/2">
      <div className="relative inline-flex flex-col items-center">
        {/* ▲ 화살표 */}
        <div className="absolute -top-[5px] left-1/2 z-5 h-[10px] w-[10px] -translate-x-1/2 rotate-45 bg-white" />

        {/* 말풍선 */}
        <div className="z-10 inline-flex items-center rounded-[3px] bg-white px-[10px] pt-[2px] pb-[2px]">
          <span className="font-pretendard text-center text-[8px] leading-[10px] font-medium whitespace-nowrap text-[#7D7D7D]">
            키운 재료 보기
          </span>
        </div>
      </div>
    </div>
  );
}
