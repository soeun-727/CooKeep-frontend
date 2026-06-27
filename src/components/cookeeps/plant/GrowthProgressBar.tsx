import treeIcon from "@/assets/cookeeps/main/tree_cookeeps.svg";
import { useCookeepsStore } from "@/stores/useCookeepsStore";

export default function GrowthProgressBar({
  overridePlantStage,
}: {
  overridePlantStage?: 1 | 2 | 3 | 4;
}) {
  //  선택 전이면 0%, 선택 후에만 단계 반영
  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const stageToShow = overridePlantStage ?? currentPlant?.level ?? 1;

  const percent = currentPlant ? (stageToShow / 4) * 100 : 0;

  return (
    <div className="flex h-[34px] w-full items-center">
      <div className="relative h-[12px] w-full rounded-full bg-[#EBEBEB]">
        {/* 진행 바 */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#32E389] to-[#1FBE6E]"
          style={{ width: `${percent}%` }}
        />

        {/* 핸들 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: `calc(${percent}% - 16px)` }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
            <img src={treeIcon} alt="tree" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
