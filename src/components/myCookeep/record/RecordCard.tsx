import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DailyRecipe } from "@/api/myRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

import privateIcon from "@/assets/mycookeep/record/private_icon.svg";
import publicIcon from "@/assets/mycookeep/record/public_icon.svg";
import tempFoodPhoto from "@/assets/mycookeep/record/temp_food_photo.svg";

import SelectViewTypeModal from "./SelectViewTypeModal";

interface RecordCardProps {
  record: DailyRecipe;
}

function RecordCard({ record: initialRecord }: RecordCardProps) {
  const navigate = useNavigate();
  const { updateRecordVisibility } = useCookeepRecordStore();
  const record =
    useCookeepRecordStore(state =>
      state.records.find(
        r => String(r.dailyRecipeId) === String(initialRecord.dailyRecipeId),
      ),
    ) || initialRecord;
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const isPublic = record.isPublic;

  const formatDateDot = (dateStr: string) => {
    return dateStr.split("T")[0].replaceAll("-", ".");
  };

  const toggleOption = () => {
    setIsOptionOpen(prev => !prev);
  };

  // 모달
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [nextVisibility, setNextVisibility] = useState<boolean | null>(null);

  const handleTryChangeVisibility = (next: boolean) => {
    setNextVisibility(next);
    setIsConfirmOpen(true);
    setIsOptionOpen(false);
  };

  // RecordCard.tsx 수정본 일부

  const handleConfirmChange = async () => {
    if (nextVisibility !== null) {
      await updateRecordVisibility(
        String(record.dailyRecipeId),
        nextVisibility,
      );
    }
    setIsConfirmOpen(false);
    setNextVisibility(null);
    setIsOptionOpen(false);
  };

  const handleCancelChange = () => {
    setIsConfirmOpen(false);
    setNextVisibility(null);
  };

  const confirmMessage = isPublic ? "나만보기" : "쿠킵스에 공개";

  return (
    <>
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-[9px]">
        {/* 이미지 */}
        <div
          className="relative h-[160px] w-full cursor-pointer overflow-hidden rounded-[6px] shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25),0_4px_16px_-10px_rgba(0,0,0,0.25)]"
          onClick={() => navigate(`/mycookeep/record/${record.dailyRecipeId}`)}
        >
          <img
            loading="lazy"
            src={record.recipeImageUrl || tempFoodPhoto}
            alt="요리 이미지"
            className="h-full w-full object-cover transition-opacity duration-300"
          />

          {/* 상단 그라데이션 */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 h-[35%] bg-gradient-to-b from-black/25 to-transparent" />

          {/* 날짜 */}
          <span className="text-gray-0 absolute top-1 left-1 px-1 py-1 text-[12px] font-medium">
            만든 날짜: {formatDateDot(record.createdAt)}
          </span>

          {/* 공개 / 비공개 아이콘 컨트롤 */}
          <div className="absolute right-2 bottom-2 flex flex-col items-center">
            {/* 옵션 버튼 (위에서 쑥 내려옴) */}
            <button
              onClick={e => {
                e.stopPropagation();
                handleTryChangeVisibility(!isPublic);
              }}
              className={`bg-gray-0 mb-2 flex h-9 w-9 items-center justify-center rounded-full shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out ${
                isOptionOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-2 scale-95 opacity-0"
              } `}
            >
              <img
                src={isPublic ? privateIcon : publicIcon}
                alt="옵션 변경"
                className={isPublic ? "h-[24px] w-[24px]" : "h-[36px] w-[36px]"}
              />
            </button>

            {/* 현재 상태 버튼 */}
            <button
              onClick={e => {
                e.stopPropagation();
                toggleOption();
              }}
              className="bg-gray-0 flex h-9 w-9 items-center justify-center rounded-full shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]"
            >
              <img
                src={isPublic ? publicIcon : privateIcon}
                alt="공개 여부"
                className={isPublic ? "h-[36px] w-[36px]" : "h-[24px] w-[24px]"}
              />
            </button>
          </div>
        </div>

        {/* 제목 + 메뉴 변경 */}
        <div className="flex flex-col items-center self-stretch">
          <div
            className="bg-gray-10 flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[10px] px-4"
            onClick={() =>
              navigate(`/mycookeep/record/${record.dailyRecipeId}`)
            }
          >
            <span className="text-gray-80 line-clamp-2 text-center text-[16px] leading-[24px] font-bold">
              {record.title}
            </span>
          </div>

          {/* <button
            className="w-[77px] h-[30px] text-gray-50 text-[14px] font-medium"
            onClick={() =>
              navigate(`/mycookeep/record/${record.dailyRecipeId}`)
            }
          >
            메뉴 변경하기
          </button> */}
        </div>
      </div>
      {isConfirmOpen && (
        <SelectViewTypeModal
          message={confirmMessage}
          onConfirm={handleConfirmChange}
          onCancel={handleCancelChange}
        />
      )}
    </>
  );
}

export default memo(RecordCard);
