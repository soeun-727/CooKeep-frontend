import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const isLastStep = currentIndex === COOKEEPS_ONBOARDING_DATA.length - 1;
  const current = COOKEEPS_ONBOARDING_DATA[currentIndex];

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80/50 absolute inset-0" onClick={onClose} />

      {/* Modal Container: 300px, padding 24, gap 24 */}
      <div
        className="shadow-container rounded-L bg-gray-0 relative z-60 flex w-[300px] flex-col items-center justify-center gap-6 p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* 내용부분: gap 12 */}
        <div className="flex w-full flex-col items-center gap-3">
          {current.topText && (
            <p className="typo-l-strong text-gray-80 w-full text-center whitespace-pre-wrap">
              {current.topText}
            </p>
          )}

          <div
            className="flex items-start justify-center"
            style={{ width: current.imgWidth, height: current.imgHeight }}
          >
            {current.img}
          </div>

          {/* 글부분: gap 8 */}
          <div className="flex w-full flex-col items-center gap-2">
            <p className="typo-l-strong text-gray-80 w-full text-center whitespace-pre-wrap">
              {current.text}
            </p>
          </div>
        </div>

        {/* 버튼: height 44, radius M, green */}
        <Button
          variant="green"
          size="S"
          onClick={handleNext}
          className="w-full"
        >
          {current.buttonText}
        </Button>
      </div>
    </div>
  );
}
