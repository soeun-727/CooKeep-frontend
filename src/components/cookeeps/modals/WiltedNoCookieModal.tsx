import characterIcon from "@/assets/character/crying_char.svg";
import ImageModal from "@/components/ui/ImageModal";
import { getSubjectJosa } from "@/utils/josa";

interface WiltedNoCookieModalProps {
  plant: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onAbandon: () => void;
}

export default function WiltedNoCookieModal({
  plant,
  isOpen,
  isLoading = false,
  onClose,
  onAbandon,
}: WiltedNoCookieModalProps) {
  if (!isOpen) return null;

  const josa = getSubjectJosa(plant);
  return (
    <ImageModal
      imageSrc={characterIcon}
      imageWidth={96}
      imageHeight={80}
      title={`${plant}${josa} 시들었어요 T.T\n아쉽지만 다시 식재료를 심어볼까요?`}
      buttonTexts={["새로 시작하기"]}
      buttonVariants={["green"]}
      buttonActions={[onAbandon]}
      buttonDisabled={[isLoading]}
      onBackdropClick={isLoading ? undefined : onClose}
    />
  );
}
