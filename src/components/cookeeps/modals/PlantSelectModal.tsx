import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";

import { PLANT_DATA } from "@/constants/plantData";

interface PlantSelectModalProps {
  isOpen: boolean;
  onConfirm: (categoryId: number) => void;
  harvestedPlantNames: string[];
}

export default function PlantSelectModal({
  isOpen,
  onConfirm,
  harvestedPlantNames,
}: PlantSelectModalProps) {
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
      <div className="bg-gray-80 absolute inset-0" />

      {/* 모달 영역 */}
      <div className="bg-gray-0 relative flex w-[258px] flex-col items-center gap-4 rounded-[10px] px-7 pt-[35px] pb-[25px]">
        <h2 className="typo-body text-center">
          키우고 싶은 식재료를
          <br />
          선택해주세요
        </h2>

        {/* 그리드 영역 */}
        <div className="grid w-full grid-cols-3 justify-items-center gap-2">
          {PLANT_DATA.map(plant => {
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
                className="group flex flex-col items-center"
              >
                {/* 아이콘 컨테이너 */}
                <div
                  className={`relative flex h-[60px] w-[60px] flex-col items-center justify-center gap-[2px] overflow-hidden rounded-[6px] ${
                    selectedId === plant.id
                      ? "bg-green-light"
                      : "bg-gray-0 group-hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={plant.img}
                    alt={plant.text}
                    className="h-[48px] w-[48px]"
                    loading="lazy"
                  />

                  <span className="h-4 text-[10px] font-semibold text-gray-50">
                    {plant.text}
                  </span>
                  {isHarvested && (
                    <div className="bg-black-overlay absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-light/90 border-green-deep flex h-5 w-[43px] items-center justify-center rounded-[3px] border-[0.5px]">
                        <span className="text-green-deep text-[10px] leading-none font-semibold">
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
          className="!h-11 !w-[224px]"
          onClick={handleConfirm}
          disabled={!selectedId}
        >
          선택하기
        </Button>
      </div>
    </div>
  );
}
