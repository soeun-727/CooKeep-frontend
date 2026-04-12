interface WaterToastProps {
  message: string;
  isVisible: boolean;
}

export default function WaterToast({ message, isVisible }: WaterToastProps) {
  if (!isVisible) return null;

  return (
    <div
      className="
    absolute
    left-1/2
    top-[44%]
    -translate-x-1/2
    translate-x-[3px]  /* ← 식물 이미지 시각 중심 보정값 */
    pointer-events-none
  "
    >
      <div
        className="
          inline-flex items-center gap-2
          px-5 py-1 rounded-full
          bg-white/75
          shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
          text-[#1FC16F] font-bold text-[12px]
          animate-fade-in-out
        "
      >
        {message}
      </div>
    </div>
  );
}
