import { useEffect, useState } from "react";

import {
  abledLeft,
  abledRight,
  cookingChar,
  disabledLeft,
  disabledRight,
  earth,
  plant,
  seedling,
  seeds,
  tree,
} from "@/assets/index";

import Button from "@/components/ui/Button";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ONBOARDING_DATA = [
  {
    id: 1,
    img: earth,
    text: "요리는 나를 위한 선택이자,\n결국엔 지구를 위한 선택이기도 해요",
  },
  {
    id: 2,
    img: cookingChar,
    text: "집에 있는 재료로 요리하고\nCooKeep에 기록하면\n쿠키를 받고, 식물을 키울 수 있어요",
  },
  {
    id: 3,
    img: (
      <div className="flex items-end gap-[4px] pb-1">
        {[
          { src: seeds, label: "씨앗" },
          { src: seedling, label: "새싹" },
          { src: plant, label: "성장" },
          { src: tree, label: "완성" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-[3px]">
            <img src={item.src} className="w-[37px]" alt={item.label} />
            <span className="text-[8px] font-medium text-stone-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    ),
    text: "식물을 다 키우면 새로운 씨앗과\n쿠키 선물이 기다리고 있어요!",
  },
];

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
  const isLastStep = currentIndex === ONBOARDING_DATA.length - 1;

  const handlePrev = () => {
    if (!isFirstStep) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (!isLastStep) setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="relative box-border flex max-h-[267px] min-h-[246px] w-[258px] max-w-[258px] min-w-[258px] flex-col gap-3 overflow-hidden rounded-[10px] bg-white px-7 py-[25px] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* 1. Slider Content (상하 중앙 정렬을 위해 flex-1 사용) */}
        <div className="flex w-full flex-1 items-center overflow-hidden">
          <div
            className="flex w-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ONBOARDING_DATA.map(item => (
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
              <img
                src={isFirstStep ? disabledLeft : abledLeft}
                alt="이전"
                className="h-[10px] w-2 object-contain"
              />
            </button>

            {/* Dots 중앙 정렬 */}
            <div className="flex items-center justify-center gap-2">
              {ONBOARDING_DATA.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    currentIndex === index ? "bg-zinc-500" : "bg-stone-100"
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
              <img
                src={isLastStep ? disabledRight : abledRight}
                alt="다음"
                className="h-[10px] w-2 object-contain"
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
