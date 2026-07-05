import { useEffect, useState } from "react";

import { TriangleArrowIcon } from "@/assets/index";

import Button from "@/components/ui/Button";

import { COOKEEPS_ONBOARDING_DATA } from "@/constants/cookeeps";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 모달이 열릴 때마다 첫 페이지로 초기화
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === COOKEEPS_ONBOARDING_DATA.length - 1;

  const handlePrev = () => {
    if (!isFirstStep) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (!isLastStep) setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Backdrop */}
      <div className="bg-gray-80 absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="bg-gray-0 relative box-border flex max-h-[267px] min-h-[246px] w-[258px] max-w-[258px] min-w-[258px] flex-col gap-3 overflow-hidden rounded-[10px] px-7 py-[25px] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* 1. Slider Content (상하 중앙 정렬을 위해 flex-1 사용) */}
        <div className="flex w-full flex-1 items-center overflow-hidden">
          <div
            className="flex w-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {COOKEEPS_ONBOARDING_DATA.map(item => (
              <div
                key={item.id}
                className="flex min-w-full shrink-0 flex-col items-center justify-center gap-4"
              >
                <div className="flex h-15 items-center justify-center">
                  {typeof item.img === "string" ? (
                    <img
                      src={item.img}
                      className="max-h-full max-w-full object-contain"
                      alt="step"
                    />
                  ) : (
                    item.img
                  )}
                </div>
                <p className="typo-body2 text-center leading-5 whitespace-pre-wrap">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Footer Area (Dots & Navigation) */}
        <div className="mt-auto flex w-full flex-col items-center gap-4">
          {/* Arrows & Dots Row */}
          <div className="flex w-full items-center justify-between px-1">
            {/* 왼쪽 버튼 */}
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className="flex w-6 items-center justify-center p-1 outline-none"
            >
              <TriangleArrowIcon
                aria-label="이전"
                className={`h-[10px] w-2 ${isFirstStep ? "text-gray-30" : "text-gray-50"}`}
              />
            </button>

            {/* Dots 중앙 정렬 */}
            <div className="flex items-center justify-center gap-2">
              {COOKEEPS_ONBOARDING_DATA.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    currentIndex === index ? "bg-gray-50" : "bg-gray-30"
                  }`}
                />
              ))}
            </div>

            {/* 오른쪽 버튼 */}
            <button
              onClick={handleNext}
              disabled={isLastStep}
              className="flex w-6 items-center justify-center p-1 outline-none"
            >
              <TriangleArrowIcon
                aria-label="다음"
                className={`h-[10px] w-2 scale-x-[-1] ${isLastStep ? "text-gray-30" : "text-gray-50"}`}
              />
            </button>
          </div>

          {/* 3. 확인 버튼 영역 (높이 고정으로 레이아웃 흔들림 방지) */}
          <div className="flex w-full items-center justify-center">
            {isLastStep && (
              <Button variant="green" className="!w-full" onClick={onClose}>
                확인
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
