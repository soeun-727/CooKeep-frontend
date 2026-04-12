import { useState } from "react";
import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
import editIcon from "../../../assets/fridge/edit_memo.svg";

interface RecordWriteImageCardProps {
  title: string;
  imageSrc?: string;
  onClickAddImage: () => void;
  onChangeTitle: (title: string) => void;
  // ✅ 이거 추가
  onDeleteImage: () => void;
}

export default function RecordWriteImageCard({
  title,
  imageSrc,
  onClickAddImage,
  onChangeTitle,
  onDeleteImage,
}: RecordWriteImageCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  const handleBlur = () => {
    setIsEditing(false);
    onChangeTitle(localTitle.trim() || title);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start w-full max-w-[450px] mx-auto">
        {/* 이미지 영역 */}
        <div
          onClick={() => {
            if (!imageSrc) {
              onClickAddImage();
            }
          }}
          className="relative
          w-full
          h-[153px]
          rounded-t-[6px]
          overflow-hidden
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          cursor-pointer
        "
        >
          <img
            src={imageSrc || tempFoodPhoto}
            alt="레시피 이미지"
            className="w-full h-full object-cover"
          />
          {imageSrc && (
            <div
              className="absolute inset-0 flex justify-center items-center"
              style={{
                background:
                  "linear-gradient(0deg, rgba(32,32,32,0.5), rgba(32,32,32,0.5))",
              }}
            >
              <div
                className="flex flex-col items-center gap-4 w-[208px]"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white text-[14px] font-medium text-center">
                  사진을 변경하거나 삭제할 수 있습니다
                </p>

                <div className="flex gap-2 w-full">
                  {/* 변경 */}
                  <button
                    onClick={onClickAddImage}
                    className="flex-1 h-[44px] rounded-[10px] bg-[#32E389] text-white font-semibold"
                  >
                    변경
                  </button>

                  {/* 삭제 */}
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex-1 h-[44px] rounded-[10px] bg-[#C3C3C3] text-white font-semibold"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 제목 영역 */}
        <div
          className="
          flex justify-center items-center self-stretch
          w-full
          bg-white
          rounded-b-[6px]
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          px-3 py-[12px]
        "
        >
          <div className="flex w-full items-center gap-2 px-2">
            {/* 제목 */}
            {isEditing ? (
              <input
                autoFocus
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                className="
                flex-1
                text-[18px]
                font-semibold
                leading-[26px]
                outline-none
              "
              />
            ) : (
              <h2
                className="
                flex-1
                text-[#202020]
                text-[18px]
                font-semibold
                leading-[26px]
              "
              >
                {title}
              </h2>
            )}
            {/* 아이콘 */}
            <img
              src={editIcon}
              alt="제목 수정"
              className="w-[18px] h-[18px] flex-shrink-0 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="w-[254px] bg-white rounded-[10px] px-[28px] py-[25px] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[#202020] text-[14px] font-medium text-center">
              사진을 삭제할까요?
            </p>

            <div className="flex w-full gap-2">
              {/* 확인 */}
              <button
                onClick={() => {
                  onDeleteImage(); // 🔥 여기서 진짜 삭제
                  setIsDeleteModalOpen(false);
                }}
                className="flex-1 h-[44px] rounded-[10px] bg-[#202020] text-white font-semibold"
              >
                네
              </button>

              {/* 취소 */}
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 h-[44px] rounded-[10px] bg-[#C3C3C3] text-white font-semibold"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
