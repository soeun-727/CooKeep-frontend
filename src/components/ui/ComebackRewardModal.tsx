import icon from "@/assets/character/surprised_char.svg";
import ImageModal from "@/components/ui/ImageModal";

interface ComebackRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComebackRewardModal({
  isOpen,
  onClose,
}: ComebackRewardModalProps) {
  if (!isOpen) return null;

  return (
    <ImageModal
      topText="🎁 돌아오신 걸 환영해요!"
      imageSrc={icon}
      imageWidth={60}
      imageHeight={56}
      title={"오랜만에 오신 기념으로\n쿠키를 준비했어요"}
      highlight="쿠키 +10 🍪"
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
  );
}
