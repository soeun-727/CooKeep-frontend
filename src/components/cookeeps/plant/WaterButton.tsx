// WaterButton.tsx
import { useEffect, useState } from "react";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import WaterModal from "../modals/WaterModal";
import CookieIcon from "../../../assets/cookeeps/main/water_cookie_cookeeps.svg";

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

  // 5초만 보이게 하기
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!isFreeWaterMode) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowTooltip(true);

    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isFreeWaterMode]);

  return (
    <>
      <div className="relative flex flex-col items-center">
        {isFreeWaterMode && showTooltip && (
          <div className="absolute -top-10 flex flex-col items-center">
            {/* 말풍선 본문 */}
            <div
              className="
        inline-flex items-center justify-center
        px-[10px] py-[3px]
        bg-white rounded-[3px]
        text-[8px] font-medium text-[#7D7D7D]
        leading-[10px] text-center
        whitespace-nowrap
        shadow-sm
      "
              style={{ width: "164px", height: "23px" }}
            >
              아래 버튼을 클릭하여 식물에게 물을 줘보세요!
            </div>

            {/* ▼ 삼각형 */}
            <div
              className="
        w-0 h-0
        border-l-[5px] border-l-transparent
        border-r-[5px] border-r-transparent
        border-t-[10px] border-t-white
        -mt-[1px]
      "
            />
          </div>
        )}
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
          className={`w-full max-w-[280px] min-w-[211px] h-[40px]
        rounded-full font-bold text-[16px]
        flex items-center justify-center gap-1
        ${
          disabled
            ? "bg-gray-300 text-gray-400"
            : "bg-[#202020] text-[#32E389] shadow active:scale-95"
        }`}
        >
          물 주기( -{/* 2. 이모지 대신 img 태그 삽입 */}
          <img
            src={CookieIcon}
            alt="cookie"
            className="w-4 h-4 object-contain"
          />
          10)
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
