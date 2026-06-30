// src/components/cookeeps/WaterModal.tsx
import { createPortal } from "react-dom";
import waterCookieImg from "@/assets/cookeeps/main/water_cookie_cookeeps.svg";

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
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[254px] rounded-[10px] bg-white px-[28px] py-[25px]">
        {/* 내용 */}
        <div className="flex flex-col items-center justify-center gap-[16px] self-stretch">
          {/* 이미지 + 텍스트 */}
          <div className="flex flex-col items-center gap-[12px] self-stretch">
            <img
              src={waterCookieImg}
              alt="물 쿠키"
              className="aspect-square h-[48px] w-[48px]"
            />

            {/* 텍스트 */}
            <div className="flex flex-col items-start gap-[2px] self-stretch text-center">
              <span className="self-stretch text-[16px] leading-[24px] font-bold text-[#1FC16F]">
                쿠키 10개
              </span>
              <span className="typo-body2 self-stretch text-[#202020]">
                사용해서 물을 줄까요?
              </span>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex h-[44px] items-center gap-[8px] self-stretch">
            <button
              onClick={onConfirm}
              className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#32E389] px-[12px] py-[12px] text-[14px] leading-[24px] font-semibold text-white"
            >
              물을 줄게요
            </button>

            <button
              onClick={onClose}
              className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#C3C3C3] px-[12px] py-[12px] text-[14px] leading-[24px] font-semibold text-white"
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
