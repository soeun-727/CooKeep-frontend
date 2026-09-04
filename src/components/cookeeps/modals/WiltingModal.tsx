import { useCookeepsStore } from "@/stores/useCookeepsStore";

import characterImg from "@/assets/character/kijul_char.svg";
import ImageModal from "@/components/ui/ImageModal";
import { getSubjectJosa } from "@/utils/josa";

interface WiltingModalProps {
  plant: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function WiltingModal({
  plant,
  isOpen,
  onClose,
}: WiltingModalProps) {
  if (!isOpen) return null;
  const handleWaterClick = () => {
    // 물 주러 가기 클릭 시에만 상태 변경
    useCookeepsStore.setState({ wantsToWater: true });
    onClose();
  };

  const josa = getSubjectJosa(plant);

  return (
    <ImageModal
      imageSrc={characterImg}
      imageWidth={86}
      imageHeight={46}
      title={`${plant}${josa} 시들고 있어요\n지금 쿠키를 사용하여 물을 주세요!`}
      buttonTexts={["물 주러 가기"]}
      buttonVariants={["green"]}
      buttonActions={[handleWaterClick]}
      onBackdropClick={onClose}
    />
  );
}
