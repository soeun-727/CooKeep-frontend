import waterCookieImg from "@/assets/cookeeps/main/water_cookie_cookeeps.svg";
import ImageModal from "@/components/ui/ImageModal";

interface WaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function WaterModal({
  isOpen,
  onClose,
  onConfirm,
}: WaterModalProps) {
  if (!isOpen) return null;

  return (
    <ImageModal
      imageSrc={waterCookieImg}
      imageWidth={48}
      imageHeight={48}
      title="식물에게 물을 줄까요?"
      highlight="쿠키 -10 🍪"
      buttonTexts={["네", "아니오"]}
      buttonVariants={["green", "gray"]}
      buttonActions={[onConfirm, onClose]}
      onBackdropClick={onClose}
    />
  );
}
