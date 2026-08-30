import icon from "@/assets/character/serve_char.svg";

import Button from "../../ui/Button";

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
      <section className="bg-gray-0 rounded-L relative flex w-[300px] flex-col items-center gap-6 p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src={icon} className="w-20" />

          <div className="flex flex-col gap-2">
            <p className="typo-l-strong text-gray-80">
              섭취완료!
              <br />
              냉장고가 가벼워졌어요!
            </p>

            {rewardPoints !== undefined && rewardPoints !== null && (
              <div className="typo-h3 text-green-deep">
                쿠키 +{rewardPoints} 🍪
              </div>
            )}
          </div>
        </div>

        <Button onClick={onClose} variant="green">
          {buttonText}
        </Button>
      </section>
    </div>
  );
}
