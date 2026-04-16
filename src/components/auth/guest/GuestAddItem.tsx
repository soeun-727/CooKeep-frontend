import { useState } from "react";
import header from "../../../assets/guest/add_header.svg";
import Button from "../../ui/Button";
import bagel from "../../../assets/guest/bagel_card.svg";
import bagelSelected from "../../../assets/guest/bagel_selected.svg";
import notice from "../../../assets/guest/item_notice.svg";
import categories from "../../../assets/guest/categories.svg";
interface GuestAddItemProps {
  onNext: () => void;
}

export default function GuestAddItem({ onNext }: GuestAddItemProps) {
  const [isDimmed, setIsDimmed] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => !isSelected && setIsDimmed(true)}
      className="relative w-full h-[100dvh] flex flex-col items-center bg-[#FAFAFA] overflow-hidden"
    >
      {/* 딤드: z-10 */}
      {isDimmed && (
        <div className="fixed inset-0 z-10 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full" />
      )}

      {/* 헤더 영역 */}
      <div className="shrink-0 flex flex-col items-center gap-4">
        <img src={header} alt="header" className="w-[361px]" />
        <img src={categories} />
      </div>

      {/* 그리드 영역 */}
      <div className="flex-1 w-full flex justify-center items-start mt-4 overflow-y-auto">
        <div className="flex w-[294px] pb-40 relative z-20">
          {/* 베이글 이미지 */}
          <img
            src={isSelected ? bagelSelected : bagel}
            alt="bagel"
            className={`cursor-pointer transition-all ${isDimmed && !isSelected ? "relative z-20" : ""}`}
            onClick={(e) => {
              if (!isDimmed) {
                setIsDimmed(true);
              } else {
                e.stopPropagation();
                setIsSelected(!isSelected);
              }
            }}
          />

          {/* 안내 메시지: z-20 부여 및 위치 조정 */}
          {isDimmed && (
            <img
              src={notice}
              alt="click notice"
              className="absolute z-20 w-[270px] top-25 -left-5"
            />
          )}
        </div>
      </div>

      {/* 하단 버튼 영역: z-20 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute pb-[62px] bottom-[calc(32px+env(safe-area-inset-bottom))] flex justify-center w-full z-20"
      >
        <div className="flex gap-[6px] w-[300px]">
          <div className="flex-1">
            <Button
              size="S"
              variant="black"
              className={`!w-full ${!isSelected ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => setIsSelected(false)}
            >
              선택 초기화
            </Button>
          </div>
          <div className="flex-1">
            <Button
              size="S"
              variant="green"
              onClick={onNext}
              disabled={!isSelected}
              className="!w-full shadow-lg"
            >
              재료 추가하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
