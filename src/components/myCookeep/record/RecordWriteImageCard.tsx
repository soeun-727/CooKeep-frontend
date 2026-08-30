import { useRef, useState } from "react";

import EditIcon from "@/assets/fridge/edit_memo.svg?react";
import tempFoodPhoto from "@/assets/mycookeep/record/temp_food_photo.svg";

interface RecordWriteImageCardProps {
  title: string;
  imageSrc?: string;
  // onClickAddImage: () => void;
  onImageChange: (file: File) => void; // onClickAddImage 대신
  onChangeTitle: (title: string) => void;
  // 이거 추가
  onDeleteImage: () => void;
}

export default function RecordWriteImageCard({
  title,
  imageSrc,
  // onClickAddImage,
  onImageChange, // 변경
  onChangeTitle,
  onDeleteImage,
}: RecordWriteImageCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // 여기로 이동

  const handleBlur = () => {
    setIsEditing(false);
    onChangeTitle(localTitle.trim() || title);
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-[450px] flex-col items-start">
        {/* 이미지 영역 */}
        <div
          onClick={() => {
            if (!imageSrc) {
              fileInputRef.current?.click(); // 직접 호출
            }
          }}
          className="shadow-search relative h-[153px] w-full cursor-pointer overflow-hidden rounded-t-[6px]"
        >
          <img
            src={imageSrc || tempFoodPhoto}
            alt="레시피 이미지"
            className="h-full w-full object-cover"
          />
          {imageSrc && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(0deg, rgba(32,32,32,0.5), rgba(32,32,32,0.5))",
              }}
            >
              <div
                className="flex w-[208px] flex-col items-center gap-4"
                onClick={e => e.stopPropagation()}
              >
                <p className="text-gray-0 text-center text-[14px] font-medium">
                  사진을 변경하거나 삭제할 수 있습니다
                </p>

                <div className="flex w-full gap-2">
                  {/* 변경 */}
                  <button
                    onClick={() => fileInputRef.current?.click()} // 직접 호출
                    className="bg-green text-gray-0 h-[44px] flex-1 rounded-[10px] font-semibold"
                  >
                    변경
                  </button>

                  {/* 삭제 */}
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="bg-gray-30 text-gray-0 h-[44px] flex-1 rounded-[10px] font-semibold"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* input을 카드 내부로 이동 */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onImageChange(file); // File 객체를 부모로 전달
              e.target.value = "";
            }}
          />
        </div>

        {/* 제목 영역 */}
        <div className="bg-gray-0 shadow-search flex w-full items-center justify-center self-stretch rounded-b-[6px] px-3 py-[12px]">
          <div className="flex w-full min-w-0 items-center gap-2 px-2">
            {/* 제목 */}
            {isEditing ? (
              <input
                autoFocus
                value={localTitle}
                onChange={e => setLocalTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={e => e.key === "Enter" && handleBlur()}
                className="min-w-0 flex-1 text-[18px] leading-[26px] font-semibold outline-none"
              />
            ) : (
              <h2 className="text-gray-80 min-w-0 flex-1 text-[18px] leading-[26px] font-semibold">
                {title}
              </h2>
            )}
            {/* 아이콘 */}
            <EditIcon
              aria-label="제목 수정"
              role="img"
              className="h-[18px] w-[18px] flex-shrink-0 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <div
          className="bg-gray-80 fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-gray-0 flex w-[254px] flex-col items-center gap-4 rounded-[10px] px-[28px] py-[25px]"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-gray-80 text-center text-[14px] font-medium">
              사진을 삭제할까요?
            </p>

            <div className="flex w-full gap-2">
              {/* 확인 */}
              <button
                onClick={() => {
                  onDeleteImage(); // 🔥 여기서 진짜 삭제
                  setIsDeleteModalOpen(false);
                }}
                className="bg-gray-80 text-gray-0 h-[44px] flex-1 rounded-[10px] font-semibold"
              >
                네
              </button>

              {/* 취소 */}
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-30 text-gray-0 h-[44px] flex-1 rounded-[10px] font-semibold"
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
