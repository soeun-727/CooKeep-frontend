import { useEffect, useState } from "react";

import { useCookeepsStore } from "@/stores/useCookeepsStore";

import { currentIcon, groundImg } from "@/assets/index";

import Button from "@/components/ui/Button";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userPlantId: number) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  onSave,
}: ProfileEditModalProps) {
  const currentPlant = useCookeepsStore(s => s.currentPlant);
  const myPlants = useCookeepsStore(s => s.myPlants);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(
        currentPlant?.userPlantId ?? myPlants[0]?.userPlantId ?? null,
      );
    }
  }, [isOpen, currentPlant, myPlants]);

  if (!isOpen) return null;

  const selectedPlantImage =
    myPlants.find(p => p.userPlantId === selectedId)?.imageUrl ?? groundImg;
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체 */}
      <div
        key={selectedId ?? "modal"}
        className="bg-gray-0 animate-slide-up relative flex w-full max-w-[450px] flex-col rounded-t-[30px] px-4 py-[19px]"
      >
        <div className="flex h-10 items-center justify-center p-2">
          <h3 className="typo-body text-gray-80">
            프로필로 설정할 식물을 선택해주세요
          </h3>
        </div>

        <div className="mb-1 flex flex-col items-center px-4">
          {/* 1. 현재 프로필/식물 이미지 */}
          <div className="-mt-4">
            <div className="relative inline-block overflow-visible">
              <img
                src={selectedPlantImage}
                alt="profileBackground"
                className="w-[155px] rounded-full object-cover p-6"
              />
            </div>
          </div>

          {/* 2. 식물 도감 (그리드) */}
          <div className="-mt-2 mb-7 grid w-[331px] grid-cols-4 gap-x-3 gap-y-1 px-4">
            {myPlants.map(plant => (
              <div key={plant.userPlantId} className="relative">
                {/* 현재 키우는 식물 위에만 뜨는 말풍선 */}
                {plant.isProfile && (
                  <div className="absolute -top-[10px] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center">
                    <img
                      src={currentIcon}
                      alt="currently growing"
                      className="h-6 object-contain"
                    />
                  </div>
                )}

                <button
                  onClick={() => setSelectedId(plant.userPlantId)}
                  className={`relative flex aspect-square w-full items-center justify-center rounded-full transition-all ${
                    selectedId === plant.userPlantId
                      ? "border-green border-2"
                      : "border-2 border-transparent"
                  } `}
                >
                  <div className="h-full w-full rounded-full">
                    <img
                      src={plant.imageUrl ?? groundImg}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* 3. 버튼 */}
          <Button
            onClick={async () => {
              if (selectedId) {
                await onSave(selectedId); // store 호출
                setSelectedId(null); // 모달 내부 선택 초기화
                onClose();
              }
            }}
            className="w-full"
            size="S"
            variant="black"
            disabled={selectedId === null}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
