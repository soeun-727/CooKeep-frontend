import ImageModal from "@/components/ui/ImageModal";

import character from "@/assets/character/congrats_happy_char.svg";

interface UploadCompleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  closeOnOverlayClick?: boolean;
}

export default function UploadCompleteModal({
  isOpen,
  onConfirm,
  onCancel,
  closeOnOverlayClick = false,
}: UploadCompleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };

  return (
    <ImageModal
      imageSrc={character}
      imageWidth={80}
      imageHeight={85}
      title="오늘의 레시피 등록 완료!"
      highlight="쿠키 +1 🍪"
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[handleConfirm]}
      onBackdropClick={closeOnOverlayClick ? onCancel : undefined}
    />
  );
}
