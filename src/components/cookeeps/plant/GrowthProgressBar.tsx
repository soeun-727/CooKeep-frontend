import { useCookeepsStore } from "@/stores/useCookeepsStore";

import TreeIcon from "@/assets/cookeeps/main/tree_cookeeps.svg?react";

export default function GrowthProgressBar({
  overridePlantStage,
}: {
  overridePlantStage?: 1 | 2 | 3 | 4;
}) {
  //  선택 전이면 0%, 선택 후에만 단계 반영
  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const stageToShow = overridePlantStage ?? currentPlant?.level ?? 1;

  // 1단계 = 0%, 4단계 = 100%로 매핑 (1~4를 0~3으로 옮긴 뒤 3으로 나눔)
  const percent = currentPlant ? ((stageToShow - 1) / 3) * 100 : 0;

  return (
    <div className="flex h-8 w-full items-center">
      <div className="bg-gray-10 relative h-[10px] w-full rounded-full">
        {/* 진행 바 */}
        <div
          className="bg-green-gradient h-full rounded-full"
          style={{ width: `${percent}%` }}
        />

        {/* 핸들 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 duration-300"
          style={{ left: `calc(${percent}% - 2px)` }}
        >
          <div className="bg-gray-0/90 drop-shadow-container flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-[1px]">
            <TreeIcon
              aria-label="tree"
              role="img"
              className="h-[21px] w-[18px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
