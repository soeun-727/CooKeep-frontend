import Button from "./Button";

type Props = {
  message: string;
  buttonText?: string;
  onClose: () => void;
};

export default function SingleButtonModal({
  message,
  buttonText = "확인",
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="
          flex flex-col items-center gap-2
          w-[240px]
          px-[28px]
          py-[25px]
          rounded-[10px]
          bg-white
        "
      >
        <div
          className="
            flex flex-col items-start gap-4
            self-stretch
          "
        >
          <p
            className="
              self-stretch
              text-center
              text-[#202020]
              typo-body2
            "
          >
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
