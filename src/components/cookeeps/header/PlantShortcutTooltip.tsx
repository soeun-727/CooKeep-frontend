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
        <div
          className="
            absolute
            -top-[5px]
            left-1/2
            h-[10px] w-[10px]
            -translate-x-1/2
            rotate-45 z-5
            bg-gray-0
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
            bg-gray-0
          "
        >
          <span
            className="
    text-[8px]
    font-medium
    leading-[10px]
    text-gray-50
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
