import ImageModal from "@/components/ui/ImageModal";

interface ExpiringRewardModalProps {
  onConfirm: () => void;
  rewardPoints?: number;
}

export default function ExpiringRewardModal({
  onConfirm,
  rewardPoints,
}: ExpiringRewardModalProps) {
  return (
    <ImageModal
      title={`유통기한 임박 재료를 살렸어요!\n선물로 쿠키 ${rewardPoints ?? 3}개를 드려요`}
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onConfirm]}
    />
  );
}
