import characterIcon from "@/assets/character/crying_char.svg";
import ImageModal from "@/components/ui/ImageModal";
import { getSubjectJosa } from "@/utils/josa";

interface WiltedModalProps {
  plant: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onRestart: () => void;
  onRecover: () => void;
}
export default function WiltedModal({
  plant,
  isOpen,
  isLoading = false,
  onClose,
  onRestart,
  onRecover,
}: WiltedModalProps) {
  if (!isOpen) return null;

  const josa = getSubjectJosa(plant);

  return (
    <ImageModal
      imageSrc={characterIcon}
      imageWidth={96}
      imageHeight={80}
      title={`${plant}${josa} 시들었어요 T.T\n쿠키를 사용해서 이어 키워볼까요?`}
      highlight="쿠키 -5 🍪"
      buttonTexts={["회복하기", "포기하기"]}
      buttonVariants={["green", "gray"]}
      buttonActions={[onRecover, onRestart]}
      buttonDisabled={[isLoading, isLoading]}
      onBackdropClick={isLoading ? undefined : onClose}
    />
  );
}
