import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DailyRecipe } from "@/api/myRecipe";
import { shadow } from "@/assets";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";

import PrivateIcon from "@/assets/mycookeep/record/one_person.svg?react";
import tempFoodPhoto from "@/assets/mycookeep/record/temp_food_photo.svg";
import PublicIcon from "@/assets/mycookeep/record/two_people.svg?react";

import { formatDate } from "@/utils/formatDate";

import { ChangeVisibility } from "../bottomTabBarContent/ChangeVisibility";

interface RecordCardProps {
  record: DailyRecipe;
  haveShadow?: boolean;
}

function RecordCard({
  record: initialRecord,
  haveShadow = false,
}: RecordCardProps) {
  const navigate = useNavigate();
  const updateRecordVisibility = useCookeepRecordStore(
    state => state.updateRecordVisibility,
  );

  const record =
    useCookeepRecordStore(state =>
      state.records.find(
        r => String(r.dailyRecipeId) === String(initialRecord.dailyRecipeId),
      ),
    ) || initialRecord;
  const isPublic = record.isPublic;

  // 공개 여부 변경 바텀시트
  const [isVisibilitySheetOpen, setVisibilitySheetOpen] = useState(false);

  const handleSelectVisibility = async (nextIsPublic: boolean) => {
    setVisibilitySheetOpen(false);
    if (nextIsPublic === isPublic) return;
    await updateRecordVisibility(String(record.dailyRecipeId), nextIsPublic);
  };

  return (
    <div
      className={`border-gray-10 bg-gray-0 flex w-full gap-4 rounded-[16px] border px-3 py-4 ${haveShadow && "shadow-container"}`}
      onClick={() => navigate(`/mycookeep/record/${record.dailyRecipeId}`)}
    >
      {/* 요리 이미지 */}
      <img
        loading="lazy"
        src={record.recipeImageUrl || tempFoodPhoto}
        alt="요리 이미지"
        className="h-25 w-25 flex-shrink-0 rounded-[8px] object-cover"
      />
      {/* 요리 정보 */}
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-[2px]">
          <p className="typo-l-strong text-gray-80"> {record.title}</p>
          <p className="typo-m text-gray-50">
            {formatDate(new Date(record.createdAt))}
          </p>
        </div>
        <div className="flex gap-3">
          {isPublic ? (
            <div className="flex gap-2">
              <PublicIcon className="h-5 w-5 text-gray-50" />
              <p className="typo-m text-gray-80">쿠킵스에 공개</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <PrivateIcon className="h-5 w-5 text-gray-50" />
              <p className="typo-m text-gray-80">나만보기</p>
            </div>
          )}
          <button
            className="typo-m cursor-pointer text-gray-50"
            onClick={e => {
              e.stopPropagation();
              setVisibilitySheetOpen(true);
            }}
          >
            변경
          </button>
        </div>
      </div>

      {isVisibilitySheetOpen && (
        <ChangeVisibility
          isPublic={isPublic}
          onSelect={handleSelectVisibility}
          onClose={() => setVisibilitySheetOpen(false)}
        />
      )}
    </div>
  );
}

export default memo(RecordCard);
