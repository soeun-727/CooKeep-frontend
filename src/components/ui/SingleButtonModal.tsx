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
<<<<<<< HEAD
    <div className="bg-gray-80 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-0 rounded-L flex w-[240px] flex-col items-center gap-2 px-[28px] py-[25px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <p className="text-gray-80 typo-body2 self-stretch text-center">
            {message}
          </p>
=======
    <div className="bg-black-overlay fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-0 shadow-container flex w-[300px] flex-col items-center gap-6 rounded-[16px] p-6">
        <p className="typo-l-strong text-gray-80 w-full text-center">
          {message}
        </p>
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b

        <Button size="S" variant="black" onClick={onClose}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
