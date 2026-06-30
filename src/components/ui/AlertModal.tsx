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
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black-overlay">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-60 bg-gray-0 rounded-[10px] flex flex-col items-center text-center px-7 pt-[35px] pb-[25px] gap-4">
        <img src={icon} className="w-20" />
        <div className="typo-body2 font-medium text-gray-80">
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
          className="w-46 h-11 typo-button text-gray-0 bg-green rounded-[10px]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
