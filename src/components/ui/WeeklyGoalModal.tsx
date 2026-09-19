import icon from "@/assets/character/congrats_char.svg";
import ImageModal from "./ImageModal";

interface WeeklyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WeeklyGoalModal({
  isOpen,
  onClose,
}: WeeklyGoalModalProps) {
  if (!isOpen) return null;

  return (
    <ImageModal
      imageSrc={icon}
      imageWidth={80}
      imageHeight={85}
      title={"이번 주 목표를 달성했어요!\n축하의 마음을 담아 쿠키를 드려요"}
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
  );
}
