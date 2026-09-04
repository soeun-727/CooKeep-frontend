import Button from "@/components/ui/Button";

interface ConfirmModalProps {
  title: string;
  subtitle?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  buttonTexts?: string[];
  buttonVariants?: ("black" | "green" | "gray")[];
}

export default function ConfirmModal({
  title,
  subtitle,
  onConfirm,
  onCancel,
  buttonTexts = ["네", "아니오"],
  buttonVariants = ["black", "gray"],
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80/50 absolute inset-0" onClick={onCancel} />
      <section className="z-100 flex w-[300px] flex-col gap-6 rounded-xl bg-white p-6">
        <div
          className={`flex flex-col items-center justify-center ${subtitle ? "gap-2" : ""}`}
        >
          <p className="typo-l-strong text-gray-80">{title}</p>
          {subtitle && <p className="typo-m text-gray-80">{subtitle}</p>}
        </div>

        <div className="flex gap-2">
          {buttonTexts.map((text, index) => (
            <Button
              key={text}
              variant={buttonVariants[index] ?? "black"}
              onClick={() => {
                if (buttonTexts.length === 1) {
                  onConfirm();
                } else {
                  index === 0 ? onConfirm() : onCancel?.();
                }
              }}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
