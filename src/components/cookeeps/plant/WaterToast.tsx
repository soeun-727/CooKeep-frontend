interface WaterToastProps {
  message: string;
  isVisible: boolean;
}

export default function WaterToast({ message, isVisible }: WaterToastProps) {
  if (!isVisible) return null;

  return (
    <div className="/* ← 식물 이미지 시각 중심 보정값 */ pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 translate-x-[3px]">
      <div className="animate-fade-in-out inline-flex items-center gap-2 rounded-full bg-white/75 px-5 py-1 text-[12px] font-bold text-[#1FC16F] shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]">
        {message}
      </div>
    </div>
  );
}
