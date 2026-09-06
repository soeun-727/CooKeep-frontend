import ImageModal from "@/components/ui/ImageModal";
import congratsIcon from "@/assets/character/congrats_char.svg";
import cookieBiteIcon from "@/assets/cookie_bite.svg";

type OnboardingType = "INGREDIENT" | "RECIPE";

interface OnboardingRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: OnboardingType;
}

const rewardContent = {
  RECIPE: {
    imageSrc: congratsIcon,
    imageWidth: 80,
    imageHeight: 85,
    title: "첫 요리 기록 성공!\n축하 쿠키가 도착했어요",
  },
  INGREDIENT: {
    imageSrc: cookieBiteIcon,
    imageWidth: 48,
    imageHeight: 48,
    title: "첫 재료 등록 완료!\n쿠키 선물이 도착했어요",
  },
};

export default function OnboardingRewardModal({
  isOpen,
  onClose,
  type,
}: OnboardingRewardModalProps) {
  if (!isOpen) return null;

  const content = rewardContent[type];

  return (
    <ImageModal
      imageSrc={content.imageSrc}
      imageWidth={content.imageWidth}
      imageHeight={content.imageHeight}
      title={content.title}
      highlight="쿠키 +1 🍪"
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
  );
}
