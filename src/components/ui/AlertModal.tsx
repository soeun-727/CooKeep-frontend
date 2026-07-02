import icon from "@/assets/character/serve_char.svg";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  rewardPoints?: number | null;
}

export default function AlertModal({
  isOpen,
  onClose,
  buttonText = "확인",
  rewardPoints,
}: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-black-overlay fixed inset-0 z-[160] flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-gray-0 relative flex w-60 flex-col items-center gap-4 rounded-[10px] px-7 pt-[35px] pb-[25px] text-center">
        <img src={icon} className="w-20" />
        <div className="typo-body2 text-gray-80 font-medium">
          섭취완료!
          <br />
          냉장고가 가벼워졌어요!
          {rewardPoints !== undefined && rewardPoints !== null && (
            <div className="typo-body text-green-deep !font-bold">
              쿠키 +{rewardPoints} 🍪
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="typo-button text-gray-0 bg-green h-11 w-46 rounded-[10px]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
