// components/ui/ImageModal.tsx
import Button from "@/components/ui/Button";

interface ImageModalProps {
  topText?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  subtitle?: string;
  highlight?: string; // 쿠키 모달 전용 초록 강조 텍스트
  buttonTexts?: string[];
  buttonVariants?: ("black" | "green" | "gray")[];
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ImageModal({
  topText,
  imageSrc,
  imageWidth = 60,
  imageHeight = 56,
  title,
  subtitle,
  highlight,
  buttonTexts = ["확인"],
  buttonVariants = ["green"],
  onConfirm,
  onCancel,
}: ImageModalProps) {
  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      <div
        className="bg-gray-80/50 absolute inset-0"
        onClick={onCancel ?? onConfirm}
      />

      <section className="shadow-container rounded-L bg-gray-0 z-100 flex w-[300px] flex-col items-center justify-center gap-6 p-6">
        {/* 내용 부분 */}
        <div className="flex w-full flex-col items-center gap-3">
          {topText && (
            <p className="typo-l-strong text-gray-80 w-full text-center">
              {topText}
            </p>
          )}

          {imageSrc && (
            <div className="flex items-start justify-center gap-2">
              <img
                src={imageSrc}
                alt=""
                style={{ width: imageWidth, height: imageHeight }}
              />
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-2">
            <p className="typo-l-strong text-gray-80 w-full text-center whitespace-pre-line">
              {title}
            </p>
            {subtitle && (
              <p className="typo-m text-gray-80 w-full text-center">
                {subtitle}
              </p>
            )}
            {highlight && (
              <p className="typo-h3 text-green-deep w-full text-center">
                {highlight}
              </p>
            )}
          </div>
        </div>

        {/* 버튼 부분 */}
        <div className="flex w-full items-center justify-center gap-2">
          {buttonTexts.map((text, index) => (
            <Button
              key={text}
              variant={buttonVariants[index] ?? "black"}
              onClick={() => {
                const isConfirmButton = buttonTexts.length === 1 || index === 0;
                if (isConfirmButton) {
                  onConfirm();
                } else {
                  onCancel?.();
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
