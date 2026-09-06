import icon from "@/assets/character/serve_char.svg";

import ImageModal from "@/components/ui/ImageModal";

interface EatenModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  rewardPoints?: number | null;
}

export default function EatenModal({
  isOpen,
  onClose,
  buttonText = "확인",
  rewardPoints,
}: EatenModalProps) {
  if (!isOpen) return null;

  return (
    <ImageModal
      imageSrc={icon}
      imageWidth={64}
      imageHeight={48}
      title={"섭취완료!\n냉장고가 가벼워졌어요!"}
      highlight={
        rewardPoints !== undefined && rewardPoints !== null
          ? `쿠키 +${rewardPoints} 🍪`
          : undefined
      }
      buttonTexts={[buttonText]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
  );
}
