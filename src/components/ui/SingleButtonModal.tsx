import Button from "./Button";

interface SingleButtonModalProps {
  message: string;
  buttonText?: string;
  onClose: () => void;
}

export default function SingleButtonModal({
  message,
  buttonText = "확인",
  onClose,
}: SingleButtonModalProps) {
  return (
    <div className="bg-gray-80 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-0 flex w-[240px] flex-col items-center gap-2 rounded-[10px] px-[28px] py-[25px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <p className="text-gray-80 typo-body2 self-stretch text-center">
            {message}
          </p>

          <Button
            size="S"
            variant="black"
            onClick={onClose}
            className="!w-[184px]"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
