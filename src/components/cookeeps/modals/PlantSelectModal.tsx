import React, { useEffect, useState } from "react";
import { PLANT_DATA } from "../../../constants/plantData";
import Button from "../../ui/Button";

interface PlantSelectModalProps {
  isOpen: boolean;
  onConfirm: (categoryId: number) => void;
  harvestedPlantNames: string[];
}

const PlantSelectModal: React.FC<PlantSelectModalProps> = ({
  isOpen,
  onConfirm,
  harvestedPlantNames,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 모달이 열릴 때마다 선택 초기화
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setSelectedId(null), 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedId !== null) {
      console.log("선택한 식물 ID:", selectedId);
      onConfirm(selectedId);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      {/* 모달 영역 */}
      <div className="relative w-[258px] bg-white rounded-[10px] flex flex-col items-center pt-[35px] pb-[25px] px-7 gap-4">
        <h2 className="typo-body text-center">
          키우고 싶은 식재료를
          <br />
          선택해주세요
        </h2>

        {/* 그리드 영역 */}
        <div className="grid grid-cols-3 gap-2 justify-items-center w-full">
          {PLANT_DATA.map((plant) => {
            const isHarvested = harvestedPlantNames.includes(plant.text);

            return (
              <button
                key={plant.id}
                type="button"
                disabled={isHarvested}
                onClick={() => {
                  if (isHarvested) return;
                  setSelectedId(plant.id);
                }}
                className="flex flex-col items-center group transition-all"
              >
                {/* 아이콘 컨테이너 */}
                <div
                  className={`relative w-[60px] h-[60px] flex flex-col items-center justify-center rounded-[6px] transition-all gap-[2px] overflow-hidden
                ${
                  selectedId === plant.id
                    ? "bg-[var(--color-green-light)]"
                    : "bg-white group-hover:bg-gray-100"
                }`}
                >
                  <img
                    src={plant.img} // 이게 제일 깔끔
                    alt={plant.text}
                    className="w-[48px] h-[48px]"
                    loading="lazy"
                  />

                  <span className="h-4 text-[10px] font-semibold text-zinc-500">
                    {plant.text}
                  </span>
                  {isHarvested && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="flex items-center justify-center w-[43px] h-5 bg-[var(--color-green-light)]/90 border-[0.5px] border-[var(--color-green-deep)] rounded-[3px]">
                        <span className="text-[var(--color-green-deep)] text-[10px] font-semibold leading-none">
                          수확완료
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 확인 버튼 */}
        <Button
          variant="black"
          className="!w-[224px] !h-11"
          onClick={handleConfirm}
          disabled={!selectedId}
        >
          선택하기
        </Button>
      </div>
    </div>
  );
};

export default PlantSelectModal;
