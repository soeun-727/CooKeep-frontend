import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import privateIcon from "../../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../../assets/mycookeep/record/public_icon.svg";
import { useCookeepRecordStore } from "../../../stores/useCookeepRecordStore";
import SelectViewTypeModal from "./SelectViewTypeModal";
import { DailyRecipe } from "../../../api/myRecipe";
import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
interface Props {
  record: DailyRecipe;
}

function RecordCard({ record: initialRecord }: Props) {
  const navigate = useNavigate();
  const { updateRecordVisibility } = useCookeepRecordStore();
  const record =
    useCookeepRecordStore((state) =>
      state.records.find(
        (r) => String(r.dailyRecipeId) === String(initialRecord.dailyRecipeId),
      ),
    ) || initialRecord;
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const isPublic = record.isPublic;

  const formatDateDot = (dateStr: string) => {
    return dateStr.split("T")[0].replaceAll("-", ".");
  };

  const toggleOption = () => {
    setIsOptionOpen((prev) => !prev);
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
      <div className="flex flex-col gap-[9px] w-full max-w-[360px] mx-auto">
        {/* 이미지 */}
        <div
          className="
          relative w-full h-[160px] cursor-pointer
          rounded-[6px] overflow-hidden
          shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25),0_4px_16px_-10px_rgba(0,0,0,0.25)]
        "
          onClick={() => navigate(`/mycookeep/record/${record.dailyRecipeId}`)}
        >
          <img
            loading="lazy"
            src={record.recipeImageUrl || tempFoodPhoto}
            alt="요리 이미지"
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* 상단 그라데이션 */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-black/25 to-transparent" />

          {/* 날짜 */}
          <span className="absolute top-1 left-1 px-1 py-1 text-white text-[12px] font-medium">
            만든 날짜: {formatDateDot(record.createdAt)}
          </span>

          {/* 공개 / 비공개 아이콘 컨트롤 */}
          <div className="absolute bottom-2 right-2 flex flex-col items-center">
            {/* 옵션 버튼 (위에서 쑥 내려옴) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTryChangeVisibility(!isPublic);
              }}
              className={`
              mb-2
              w-9 h-9
              rounded-full bg-white
              shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
              flex items-center justify-center
              transition-all duration-200 ease-out
              ${
                isOptionOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-95 pointer-events-none"
              }
            `}
            >
              <img
                src={isPublic ? privateIcon : publicIcon}
                alt="옵션 변경"
                className={isPublic ? "w-[24px] h-[24px]" : "w-[36px] h-[36px]"}
              />
            </button>

            {/* 현재 상태 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOption();
              }}
              className="
              w-9 h-9
              rounded-full bg-white
              shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
              flex items-center justify-center
            "
            >
              <img
                src={isPublic ? publicIcon : privateIcon}
                alt="공개 여부"
                className={isPublic ? "w-[36px] h-[36px]" : "w-[24px] h-[24px]"}
              />
            </button>
          </div>
        </div>

        {/* 제목 + 메뉴 변경 */}
        <div className="flex flex-col items-center self-stretch">
          <div
            className="
            flex justify-center items-center
            h-[56px]
            w-full
            px-4
            rounded-[10px]
            bg-[#EBEBEB]
            cursor-pointer
          "
            onClick={() =>
              navigate(`/mycookeep/record/${record.dailyRecipeId}`)
            }
          >
            <span className="text-[#202020] text-[16px] font-bold leading-[24px] text-center line-clamp-2">
              {record.title}
            </span>
          </div>

          {/* <button
            className="w-[77px] h-[30px] text-[#7D7D7D] text-[14px] font-medium"
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
