import { useRef, useState } from "react";

import FoodIcon from "@/assets/mycookeep/record/fork_knife_plate.svg?react";
import temp from "@/assets/mycookeep/record/temp_food_photo.svg";

interface RecordViewImageCardProps {
  title: string;
  imageSrc?: string;
  isEditing: boolean;
  isImageUploading?: boolean;
  onChangeTitle: (title: string) => void;
  onImageFileSelect?: (file: File) => void; // 추가
  onImageDelete?: () => void; // 추가
}

export default function RecordViewImageCard({
  title,
  imageSrc,
  isEditing,
  // isImageUploading,
  onChangeTitle,
  onImageFileSelect,
  onImageDelete,
}: RecordViewImageCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [showImageOptions, setShowImageOptions] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const showImageOptions = isEditing;

  return (
    <>
      <div className="mx-auto flex w-full max-w-[450px] flex-col">
        {/* 이미지 */}
        <div
          className="shadow-search relative h-[153px] w-full overflow-hidden rounded-t-[6px]"
          // onClick={() => {
          //   if (!isEditing) return;
          //   setShowImageOptions(true);
          // }}
        >
          <img
            src={imageSrc || temp}
            alt="요리 이미지"
            className="h-full w-full object-cover"
          />

          {/* 수정 모드 overlay */}
          {isEditing && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(0deg, rgba(32,32,32,0.5), rgba(32,32,32,0.5))",
              }}
              // onClick={() => setShowImageOptions(false)} // 추가
            >
              <div
                className="flex w-[208px] flex-col items-center gap-4"
                onClick={e => e.stopPropagation()} // 내부 클릭만 막기
              >
                <p className="text-gray-0 text-center text-[14px] leading-[20px] font-medium">
                  사진을{" "}
                  {imageSrc
                    ? "변경하거나 삭제할 수 있습니다"
                    : "추가할 수 있습니다"}
                </p>
                {/* 🔥 버튼 영역 */}
                <div
                  className={`flex w-full gap-[8px] ${!imageSrc ? "justify-center" : ""} `}
                >
                  {/* 변경 / 추가 버튼 */}
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      // setShowImageOptions(false);
                    }}
                    className={`text-gray-0 h-[44px] rounded-[10px] text-[14px] font-semibold ${imageSrc ? "bg-green flex-1" : "bg-green w-[160px]"} `}
                  >
                    {imageSrc ? "변경" : "추가"}
                  </button>

                  {/* 삭제 버튼 (이미지 있을 때만) */}
                  {imageSrc && (
                    <button
                      onClick={() => {
                        // setShowImageOptions(false);
                        setIsDeleteModalOpen(true); // 🔥 바로 삭제 X → 모달
                      }}
                      className="bg-gray-30 text-gray-0 h-[44px] flex-1 rounded-[10px] text-[14px] font-semibold"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 업로드 중 스피너 */}
          {/* {isImageUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          )} */}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onImageFileSelect?.(file);
              e.target.value = "";
            }}
          />
        </div>

        {/* 제목 영역 */}
        <div className="bg-gray-0 shadow-search flex w-full items-center rounded-b-[6px] px-3 py-[12px]">
          {/* 왼쪽 아이콘 + 제목 */}
          <div className="flex flex-1 items-center gap-[4px] px-2">
            {/* 기본 아이콘 */}
            <FoodIcon
              aria-label="요리 아이콘"
              role="img"
              className="h-[38px] w-[38px] flex-shrink-0"
            />

            {/* 제목 */}
            {isEditing ? (
              <input
                autoFocus
                value={title}
                onChange={e => onChangeTitle(e.target.value)}
                className="border-primary flex-1 border-b-2 text-[18px] leading-[26px] font-semibold outline-none"
                placeholder={title}
              />
            ) : (
              <h2 className="text-gray-80 flex-1 text-[18px] leading-[26px] font-semibold">
                {title}
              </h2>
            )}
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
              <button
                onClick={() => {
                  onImageDelete?.();
                  setIsDeleteModalOpen(false);
                }}
                className="bg-gray-80 text-gray-0 h-[44px] flex-1 rounded-[10px] font-semibold"
              >
                네
              </button>

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
