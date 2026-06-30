import { useEffect } from "react";
import { createPortal } from "react-dom";

import character from "@/assets/character/congrats_happy_char.svg";

import Button from "@/components/ui/Button";

interface UploadCompleteModalProps {
  isOpen: boolean; // 열림 상태 추가
  onConfirm: () => void; // 쿠키받기
  onCancel: () => void; // 그냥 닫기
  closeOnOverlayClick?: boolean;
}

export default function UploadCompleteModal({
  isOpen,
  onConfirm,
  onCancel,
  closeOnOverlayClick = false,
}: UploadCompleteModalProps) {
  // DoublecheckModal과 동일한 스크롤 방지 로직
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#11111180]">
      {/* 배경 레이어 */}
      <div
        className="absolute inset-0 cursor-default"
        onClick={closeOnOverlayClick ? onCancel : undefined}
      />

      {/* 모달 박스: DoublecheckModal과 동일한 규격 적용 */}
      <div className="animate-popIn relative flex w-[254px] flex-col items-center rounded-[10px] bg-white px-7 py-[25px] shadow-xl">
        <div className="flex flex-col items-center justify-center self-stretch">
          <img
            src={character}
            className="mb-4 h-[90px] w-[84.922px]"
            alt="congrats"
          />

          <p className="typo-body text-center font-bold text-neutral-900">
            오늘의 레시피 등록 완료!
          </p>
          <span className="typo-body mb-4 !font-bold text-(--color-green-deep)">
            쿠키 +1 🍪
          </span>

          <Button
            size="S"
            variant="green"
            className="h-11 !w-[184px]" // DoublecheckModal의 버튼 높이와 통일
            onClick={() => {
              onConfirm();
              onCancel(); // 확인 후 모달 닫기
            }}
          >
            쿠키받기
          </Button>
        </div>
      </div>
    </div>,
    document.body, // createPortal 적용
  );
}
