import characterImg from "@/assets/character/plant_char.svg";
import ImageModal from "@/components/ui/ImageModal";

interface FreeWaterModalProps {
  isOpen: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function FreeWaterModal({
  isOpen,
  onConfirm,
  onClose,
}: FreeWaterModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <ImageModal
      imageSrc={characterImg}
      imageWidth={76}
      imageHeight={80}
      title={"씨앗 등록 완료! 🌱 \n 무료 물주기 1회가 준비되어 있어요"}
      buttonTexts={["물 주러 가기"]}
      buttonVariants={["green"]}
      buttonActions={[handleConfirm]}
      onBackdropClick={onClose}
    />
  );
}
