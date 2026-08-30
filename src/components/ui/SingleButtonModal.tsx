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
    <div className="bg-black-overlay fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-0 shadow-container flex w-[300px] flex-col items-center gap-6 rounded-[16px] p-6">
        <p className="typo-l-strong text-gray-80 w-full text-center">
          {message}
        </p>

        <Button size="S" variant="black" onClick={onClose}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
