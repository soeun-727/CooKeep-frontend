interface PlantShortcutTooltipProps {
  visible: boolean;
}

export default function PlantShortcutTooltip({
  visible,
}: PlantShortcutTooltipProps) {
  if (!visible) return null;

  return (
    <div className="absolute left-1/2 top-full mt-[5px] z-20 -translate-x-1/2">
      <div className="relative inline-flex flex-col items-center">
        {/* ▲ 화살표 */}
        <div
          className="
            absolute
            -top-[5px]
            left-1/2
            h-[10px] w-[10px]
            -translate-x-1/2
            rotate-45 z-5
            bg-white
          "
        />

        {/* 말풍선 */}
        <div
          className="
            inline-flex
            items-center
            px-[10px]
            pt-[2px]
            pb-[2px]
            rounded-[3px]
            z-10
            bg-white
          "
        >
          <span
            className="
    text-[8px]
    font-medium
    leading-[10px]
    text-[#7D7D7D]
    text-center
    font-pretendard
    whitespace-nowrap
  "
          >
            키운 재료 보기
          </span>
        </div>
      </div>
    </div>
  );
}
