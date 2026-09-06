import icon from "@/assets/character/surprised_char.svg";
import ImageModal from "@/components/ui/ImageModal";

interface ComebackRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardPoints?: number; // 실제로는 백엔드가 안 줘서 항상 fallback 사용되는데 v.3에서 바뀌어서 미리 넣어놓음
}

export default function ComebackRewardModal({
  isOpen,
  onClose,
  rewardPoints,
}: ComebackRewardModalProps) {
  if (!isOpen) return null;

  return (
    <ImageModal
      topText="🎁 돌아오신 걸 환영해요!"
      imageSrc={icon}
      imageWidth={60}
      imageHeight={56}
      title={"오랜만에 오신 기념으로\n쿠키를 준비했어요"}
      highlight={`쿠키 +${rewardPoints ?? 1} 🍪`}
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
  );
}
