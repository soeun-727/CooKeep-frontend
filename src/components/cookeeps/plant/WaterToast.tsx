interface WaterToastProps {
  message: string;
  isVisible: boolean;
}

export default function WaterToast({ message, isVisible }: WaterToastProps) {
  if (!isVisible) return null;

  return (
    <div className="/* ← 식물 이미지 시각 중심 보정값 */ pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 translate-x-[3px]">
      <div className="bg-gray-0/75 text-green-deep animate-fade-in-out inline-flex items-center gap-2 rounded-full px-5 py-1 text-[12px] font-bold shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]">
        {message}
      </div>
    </div>
  );
}
