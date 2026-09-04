import characterIcon from "@/assets/character/crying_char.svg";
import ImageModal from "@/components/ui/ImageModal";
import { getSubjectJosa } from "@/utils/josa";

interface WiltedNoCookieModalProps {
  plant: string;
  isOpen: boolean;
  onClose: () => void;
  onAbandon: () => void;
}

export default function WiltedNoCookieModal({
  plant,
  isOpen,
  onClose,
  onAbandon,
}: WiltedNoCookieModalProps) {
  if (!isOpen) return null;

  const josa = getSubjectJosa(plant);
  // TODO: 멘트 임시임 정해지면 변경해야함
  return (
    <ImageModal
      imageSrc={characterIcon}
      imageWidth={96}
      imageHeight={80}
      title={`${plant}${josa} 시들었어요 T.T\n쿠키가 부족해서 회복할 수 없어요`}
      highlight="쿠키 5개 필요해요"
      buttonTexts={["포기하기"]}
      buttonVariants={["black"]}
      buttonActions={[onAbandon]}
      onBackdropClick={onClose}
    />
  );
}
