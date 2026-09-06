import ImageModal from "@/components/ui/ImageModal";

interface PhotoRewardModalProps {
  onConfirm: () => void;
}

export default function PhotoRewardModal({ onConfirm }: PhotoRewardModalProps) {
  return (
    <ImageModal
      title={"요리 사진 등록!\n추가 쿠키가 도착했어요"}
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onConfirm]}
    />
  );
}
