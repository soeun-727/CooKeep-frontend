import congratsImg from "@/assets/character/congrats_happy_char.svg";

import ImageModal from "@/components/ui/ImageModal";

interface HarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardPoints?: number;
}

export default function HarvestModal({
  isOpen,
  onClose,
  rewardPoints,
}: HarvestModalProps) {
  if (!isOpen) return null;

  return (
    <ImageModal
      imageSrc={congratsImg}
      imageWidth={80}
      imageHeight={84.803}
      title={"축하해요 🎉\n정성 들여 키운 식물이\n드디어 다 자랐어요"}
      highlight={`쿠키 +${rewardPoints ?? 30} 🍪`}
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
  );
}
