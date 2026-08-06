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
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80/50 absolute inset-0" />

      {/* 모달 영역 */}
      <div className="bg-gray-0 shadow-container rounded-L relative flex w-[300px] flex-col items-center gap-6 p-6">
        {/* 내용 영역 */}
        <div className="flex w-full flex-col items-center gap-3">
          <h2 className="typo-l-strong text-gray-80 w-full text-center">
            키우고 싶은 식재료를 선택해 주세요
          </h2>

          {/* 그리드 영역 */}
          <div className="grid grid-cols-[repeat(3,4rem)] justify-center gap-x-1 gap-y-1">
            {PLANT_DATA.map(plant => {
              const isHarvested = harvestedPlantNames.includes(plant.text);
              const isSelected = selectedId === plant.id;

              return (
                <button
                  key={plant.id}
                  type="button"
                  disabled={isHarvested}
                  onClick={() => {
                    if (isHarvested) return;
                    setSelectedId(plant.id);
                  }}
                  className="group relative"
                >
                  {/* 아이콘 컨테이너 */}
                  <div
                    className={`rounded-S flex h-16 w-16 flex-col items-center justify-center gap-[2px] py-1 ${
                      isSelected
                        ? "bg-green-light"
                        : "bg-gray-0 group-hover:bg-gray-10"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-visible">
                      <img
                        src={plant.img}
                        alt={plant.text}
                        loading="lazy"
                        className={`shrink-0 object-cover ${
                          plant.text === "상추" ? "h-12 w-12" : "h-9 w-9"
                        }`}
                      />
                    </div>

                    <span
                      className={`typo-caption w-full text-center ${
                        isSelected ? "text-green-deep" : "text-gray-50"
                      }`}
                    >
                      {plant.text}
                    </span>
                  </div>

                  {isHarvested && (
                    <div className="bg-black-overlay rounded-S absolute inset-0 flex items-center justify-center">
                      <div className="border-green-deep bg-green-light/90 flex items-center justify-center gap-2 rounded-[3px] border-[0.5px] p-1">
                        <span className="typo-caption-strong text-green-deep">
                          수확완료
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 확인 버튼 */}
        <Button
          variant="green"
          size="S"
          className="w-full"
          onClick={handleConfirm}
          disabled={!selectedId}
        >
          선택하기
        </Button>
      </div>
    </div>
  );
}
