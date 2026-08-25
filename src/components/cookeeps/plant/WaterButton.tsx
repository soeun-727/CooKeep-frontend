import { useState } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import WaterIcon from "@/assets/cookeeps/main/waterdrop.svg?react";
import WaterModal from "../modals/WaterModal";

interface WaterButtonProps {
  onSuccess?: () => void; // prop 추가
}

export default function WaterButton({ onSuccess }: WaterButtonProps) {
  const {
    waterPlant,
    freeWaterPlant,
    cookie,
    plantStage,
    selectedPlant,
    isFreeWaterMode,
    setFreeWaterMode,
  } = useCookeepsStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const disabled =
    !selectedPlant || plantStage >= 4 || (!isFreeWaterMode && cookie < 10);

  const { wantsToWater, setWantsToWater } = useCookeepsStore();

  const handleConfirm = async () => {
    try {
      await waterPlant();
      if (onSuccess) onSuccess(); // 성공 시에만 toast
    } catch {
      alert("물 주기에 실패했습니다. 다시 시도해 주세요.");
    }
    setWantsToWater(false);
    setModalOpen(false);
  };

  const isModalOpenControlled =
    !isFreeWaterMode && (wantsToWater || isModalOpen);

  return (
    <>
      <div className="relative flex w-full flex-col items-center">
        <button
          disabled={disabled}
          onClick={async () => {
            if (isFreeWaterMode) {
              try {
                await freeWaterPlant();
                setFreeWaterMode(false);
                onSuccess?.();
              } catch {
                alert("무료 물주기에 실패했습니다.");
              }
              return;
            }

            setModalOpen(true);
          }}
          className={`flex w-full max-w-[300px] items-center justify-center gap-1 rounded-full border px-4 py-2 backdrop-blur-[1px] ${
            disabled
              ? "bg-gray-0/60 border-gray-300"
              : "border-green bg-gray-0/90 shadow-container active:scale-95"
          }`}
        >
          <WaterIcon
            aria-label="water"
            role="img"
            className="h-[23px] w-[23px] object-contain"
          />
          <span
            className={`typo-l-strong ${
              disabled ? "text-gray-400" : "text-gray-80"
            }`}
          >
            물 주기
          </span>
          <span
            className={`typo-l-strong ${
              disabled ? "text-gray-400" : "text-green"
            }`}
          >
            · 쿠키 10개 사용
          </span>
        </button>

        <WaterModal
          isOpen={isModalOpenControlled}
          onClose={() => {
            setModalOpen(false);
            setWantsToWater(false);
          }}
          onConfirm={handleConfirm}
        />
      </div>
    </>
  );
}
