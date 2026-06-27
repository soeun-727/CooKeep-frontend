import { useRef, useState } from "react";
import tempFoodPhoto from "@assets/mycookeep/record/temp_food_photo.svg";
import editIcon from "@assets/fridge/edit_memo.svg";

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
          className="relative h-[153px] w-full cursor-pointer overflow-hidden rounded-t-[6px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]"
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
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-center text-[14px] font-medium text-white">
                  사진을 변경하거나 삭제할 수 있습니다
                </p>

                <div className="flex w-full gap-2">
                  {/* 변경 */}
                  <button
                    onClick={() => fileInputRef.current?.click()} // 직접 호출
                    className="h-[44px] flex-1 rounded-[10px] bg-[#32E389] font-semibold text-white"
                  >
                    변경
                  </button>

                  {/* 삭제 */}
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="h-[44px] flex-1 rounded-[10px] bg-[#C3C3C3] font-semibold text-white"
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageChange(file); // File 객체를 부모로 전달
              e.target.value = "";
            }}
          />
        </div>

        {/* 제목 영역 */}
        <div className="flex w-full items-center justify-center self-stretch rounded-b-[6px] bg-white px-3 py-[12px] shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
          <div className="flex w-full min-w-0 items-center gap-2 px-2">
            {/* 제목 */}
            {isEditing ? (
              <input
                autoFocus
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                className="min-w-0 flex-1 text-[18px] leading-[26px] font-semibold outline-none"
              />
            ) : (
              <h2 className="min-w-0 flex-1 text-[18px] leading-[26px] font-semibold text-[#202020]">
                {title}
              </h2>
            )}
            {/* 아이콘 */}
            <img
              src={editIcon}
              alt="제목 수정"
              className="h-[18px] w-[18px] flex-shrink-0 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
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
              {/* 확인 */}
              <button
                onClick={() => {
                  onDeleteImage(); // 🔥 여기서 진짜 삭제
                  setIsDeleteModalOpen(false);
                }}
                className="h-[44px] flex-1 rounded-[10px] bg-[#202020] font-semibold text-white"
              >
                네
              </button>

              {/* 취소 */}
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
