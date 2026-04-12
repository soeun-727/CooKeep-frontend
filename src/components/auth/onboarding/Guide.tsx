import { useState, TouchEvent } from "react";
import image1 from "../../../assets/onboarding/guide_1.svg";
import image2 from "../../../assets/onboarding/guide_2.svg";
import image3 from "../../../assets/onboarding/guide_3.svg";
import image4 from "../../../assets/onboarding/guide_4.svg";
import Button from "../../ui/Button";

interface Props {
  onNext: () => void;
}

const ONBOARDING_DATA = [
  {
    id: 1,
    img: image1,
    title: (
      <div>
        <span className="text-(--color-green)">냉장고</span> 식재료를 한눈에
        관리해요
      </div>
    ),
    text: "등록만 하면 유통기한을 알아서 챙겨드려요!",
  },
  {
    id: 2,
    img: image2,
    title: (
      <div>
        나에게 딱 맞는 <span className="text-(--color-green)">AI 레시피</span>를
        만들어요
      </div>
    ),
    text: "가진 재료와 취향에 맞게 추천드릴게요!",
  },
  {
    id: 3,
    img: image3,
    title: (
      <div>
        완성한 요리를 <span className="text-(--color-green)">MY 쿠킵</span>에
        기록해요
      </div>
    ),
    text: "직접 만든 요리를 나만의 팁과 함께\n남기고, 관리할 수 있어요!",
  },
  {
    id: 4,
    img: image4,
    title: (
      <div>
        <span className="text-(--color-green)">쿠킵스</span>에서 식재료를
        키우고, 공유해요
      </div>
    ),
    text: "쿠키로 식재료를 키우고,\n다른 쿠킵이들의 레시피를 구경해보세요!",
  },
];

export default function Guide({ onNext }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 🚀 수정: 미사용 변수 img 삭제
  const { title, text } = ONBOARDING_DATA[currentIndex];

  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
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
      className="flex flex-col h-full items-center justify-end select-none mb-4 overflow-hidden"
      onClick={() => currentIndex < 3 && handleNext()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 인디케이터 */}
      <div className="flex justify-center items-center gap-2">
        {ONBOARDING_DATA.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              currentIndex === index ? "bg-(--color-green)" : "bg-stone-100"
            }`}
          />
        ))}
      </div>

      {/* 텍스트 영역 */}
      <div className="gap-[6px] h-[82px] mt-10 mb-15 text-center px-4">
        <div className="typo-h1 !text-[22px]">{title}</div>
        <p className="whitespace-pre-wrap typo-body text-zinc-500">{text}</p>
      </div>

      {/* 이미지 및 버튼 영역 */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ONBOARDING_DATA.map((data) => (
            <div
              key={data.id}
              className="min-w-full flex flex-col items-center"
            >
              <img
                className="h-131 pointer-events-none drop-shadow-[0px_3px_12px_rgba(156,156,156,0.2)]"
                src={data.img}
                alt="guide"
              />
            </div>
          ))}
        </div>

        {/* 그라데이션 오버레이 */}
        <div className="absolute bottom-0 w-full h-56 bg-gradient-to-b from-white/0 to-white pointer-events-none" />

        {/* 버튼 영역 */}
        <div
          className={`absolute bottom-10 w-full px-6 z-10 transition-opacity duration-300 ${
            currentIndex === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Button
            onClick={() => {
              onNext();
            }}
            variant="black"
            size="L"
            className="w-full"
          >
            쿠킵 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
