import { useRef, useState } from "react";
import foodIcon from "@assets/mycookeep/record/fork_knife_plate.svg";
import temp from "@assets/mycookeep/record/temp_food_photo.svg";

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
          className="relative h-[153px] w-full overflow-hidden rounded-t-[6px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]"
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
                onClick={(e) => e.stopPropagation()} // 내부 클릭만 막기
              >
                <p className="text-center text-[14px] leading-[20px] font-medium text-white">
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
                    className={`h-[44px] rounded-[10px] text-[14px] font-semibold text-white ${imageSrc ? "flex-1 bg-[#32E389]" : "w-[160px] bg-[#32E389]"} `}
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
                      className="h-[44px] flex-1 rounded-[10px] bg-[#C3C3C3] text-[14px] font-semibold text-white"
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageFileSelect?.(file);
              e.target.value = "";
            }}
          />
        </div>

        {/* 제목 영역 */}
        <div className="flex w-full items-center rounded-b-[6px] bg-white px-3 py-[12px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
          {/* 왼쪽 아이콘 + 제목 */}
          <div className="flex flex-1 items-center gap-[4px] px-2">
            {/* 기본 아이콘 */}
            <img
              src={foodIcon}
              alt="요리 아이콘"
              className="h-[38px] w-[38px] flex-shrink-0"
            />

            {/* 제목 */}
            {isEditing ? (
              <input
                autoFocus
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
                className="border-primary flex-1 border-b-2 text-[18px] leading-[26px] font-semibold outline-none"
                placeholder={title}
              />
            ) : (
              <h2 className="flex-1 text-[18px] leading-[26px] font-semibold text-[#202020]">
                {title}
              </h2>
            )}
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="flex w-[254px] flex-col items-center gap-4 rounded-[10px] bg-white px-[28px] py-[25px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[14px] font-medium text-[#202020]">
              사진을 삭제할까요?
            </p>

            <div className="flex w-full gap-2">
              <button
                onClick={() => {
                  onImageDelete?.();
                  setIsDeleteModalOpen(false);
                }}
                className="h-[44px] flex-1 rounded-[10px] bg-[#202020] font-semibold text-white"
              >
                네
              </button>

              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="h-[44px] flex-1 rounded-[10px] bg-[#C3C3C3] font-semibold text-white"
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
