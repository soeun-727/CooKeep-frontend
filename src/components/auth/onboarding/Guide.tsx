import { TouchEvent, useRef, useState } from "react";

import image1_2 from "@/assets/onboarding/guide_1_2.svg";

import Button from "@/components/ui/Button";

import { ONBOARDING_DATA } from "@/constants/onboarding";

interface GuideProps {
  onNext: () => void;
}

export default function Guide({ onNext }: GuideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  const { title, text } = ONBOARDING_DATA[currentIndex];
  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;

    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      className="mx-auto flex h-full min-h-0 w-full max-w-[450px] flex-col overflow-hidden select-none"
      onClick={() => currentIndex < 3 && handleNext()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 상단 영역 */}
      <div className="flex flex-col items-center gap-6 pt-[70px]">
        {/* 인디케이터 */}
        <div className="flex justify-center gap-2">
          {ONBOARDING_DATA.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
                currentIndex === index ? "bg-green" : "bg-gray-10"
              }`}
            />
          ))}
        </div>

        {/* 텍스트 */}
        <div className="text-center">
          <div className="typo-h2 tracking-[-0.6px]">{title}</div>
          <p className="typo-l-strong mt-2 whitespace-pre-wrap text-gray-50">
            {text}
          </p>
        </div>
      </div>

      {/* 중간 여백 */}
      <div className="flex-1" />

      {/* 하단 영역 */}
      <div className="relative mt-auto">
        {/* 이미지 */}
        <div className="overflow-hidden">
          <div
            className="flex items-end transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ONBOARDING_DATA.map((data, index) => (
              <div
                key={data.id}
                className="relative flex min-w-full items-end justify-center"
              >
                <img
                  src={data.img}
                  alt=""
                  decoding="async"
                  className="pointer-events-none h-[61.6vh] max-h-[520px] min-h-[320px] w-auto object-contain"
                />

                {index === 0 && (
                  <img
                    src={image1_2}
                    alt=""
                    decoding="async"
                    className="pointer-events-none absolute right-[8%] bottom-[17%] z-10 w-[38%]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blur-to-b pointer-events-none absolute bottom-0 z-10 h-56 w-full" />

        {/* 버튼 */}
        <div
          className={`absolute bottom-[env(safe-area-inset-bottom)] z-20 w-full transition-opacity duration-300 ${
            currentIndex === 3 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Button onClick={onNext} variant="black" size="L" className="w-full">
            쿠킵 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
