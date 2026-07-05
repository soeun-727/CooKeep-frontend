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
        <div className="bg-gray-0 absolute -top-[5px] left-1/2 z-5 h-[10px] w-[10px] -translate-x-1/2 rotate-45" />

        {/* 말풍선 */}
        <div className="bg-gray-0 z-10 inline-flex items-center rounded-[3px] px-[10px] pt-[2px] pb-[2px]">
          <span className="font-pretendard text-center text-[8px] leading-[10px] font-medium whitespace-nowrap text-gray-50">
            키운 재료 보기
          </span>
        </div>
      </div>
    </div>
  );
}
