import CautionIcon from "@/assets/signup/icon_caution.svg?react";
import Button from "@/components/ui/Button";

export interface CautionModalConfig {
  title: string;
  buttonText: string;
  variant: "green" | "black";
  showIcon?: boolean;
  subText?: string;
}

interface CautionModalProps {
  config: CautionModalConfig;
  onClose: () => void;
  onButtonClick: () => void;
}

export default function CautionModal({
  config,
  onClose,
  onButtonClick,
}: CautionModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-[100] mx-auto max-w-[450px]">
        <div className="bg-black-overlay h-full w-full" onClick={onClose} />
      </div>
      <div className="bg-gray-0 shadow-container fixed top-1/2 left-1/2 z-[110] flex w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl p-6">
        <div className="flex w-full flex-col items-center gap-3">
          {config.showIcon && <CautionIcon className="text-gray-80 h-5 w-5" />}

          <div className="flex w-full flex-col items-center gap-2">
            <p className="typo-l-strong text-gray-80 text-center whitespace-pre-wrap">
              {config.title}
            </p>

            {config.subText && (
              <p className="typo-m text-gray-80 text-center">
                {config.subText}
              </p>
            )}
          </div>
        </div>

        <Button
          size="S"
          variant={config.variant}
          className="w-full"
          onClick={onButtonClick}
        >
          {config.buttonText}
        </Button>
      </div>
    </>
  );
}
