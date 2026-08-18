import { createPortal } from "react-dom";

import WaterCookieImg from "@/assets/cookeeps/main/water_cookie_cookeeps.svg?react";

interface WaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function WaterModal({
  isOpen,
  onClose,
  onConfirm,
}: WaterModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80 absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="bg-gray-0 relative w-[254px] rounded-[10px] px-[28px] py-[25px]">
        {/* 내용 */}
        <div className="flex flex-col items-center justify-center gap-[16px] self-stretch">
          {/* 이미지 + 텍스트 */}
          <div className="flex flex-col items-center gap-[12px] self-stretch">
            <WaterCookieImg
              aria-label="물 쿠키"
              role="img"
              className="aspect-square h-[48px] w-[48px]"
            />

            {/* 텍스트 */}
            <div className="flex flex-col items-start gap-[2px] self-stretch text-center">
              <span className="text-green-deep self-stretch text-[16px] leading-[24px] font-bold">
                쿠키 10개
              </span>
              <span className="typo-body2 text-gray-80 self-stretch">
                사용해서 물을 줄까요?
              </span>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex h-[44px] items-center gap-[8px] self-stretch">
            <button
              onClick={onConfirm}
              className="bg-green text-gray-0 flex h-[44px] flex-1 items-center justify-center rounded-[10px] px-[12px] py-[12px] text-[14px] leading-[24px] font-semibold"
            >
              물을 줄게요
            </button>

            <button
              onClick={onClose}
              className="bg-gray-30 text-gray-0 flex h-[44px] flex-1 items-center justify-center rounded-[10px] px-[12px] py-[12px] text-[14px] leading-[24px] font-semibold"
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
