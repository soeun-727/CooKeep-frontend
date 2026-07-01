import { useCookeepsStore } from "@/stores/useCookeepsStore";

import treeIcon from "@/assets/cookeeps/main/tree_cookeeps.svg";

export default function GrowthProgressBar({
  overridePlantStage,
}: {
  overridePlantStage?: 1 | 2 | 3 | 4;
}) {
  //  선택 전이면 0%, 선택 후에만 단계 반영
  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const stageToShow = overridePlantStage ?? currentPlant?.level ?? 1;

  const percent = currentPlant ? (stageToShow / 4) * 100 : 0;

  return (
    <div className="flex h-[34px] w-full items-center">
      <div className="bg-gray-10 relative h-[12px] w-full rounded-full">
        {/* 진행 바 */}
        <div
          className="bg-green-gradient h-full rounded-full"
          style={{ width: `${percent}%` }}
        />

        {/* 핸들 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: `calc(${percent}% - 16px)` }}
        >
          <div className="bg-gray-0 flex h-8 w-8 items-center justify-center rounded-full shadow">
            <img src={treeIcon} alt="tree" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
