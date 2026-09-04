interface WaterToastProps {
  message: string;
  isVisible: boolean;
}

export default function WaterToast({ message, isVisible }: WaterToastProps) {
  if (!isVisible) return null;

  return (
    <div className="pointer-events-none absolute top-[50%] left-1/2 -translate-x-1/2 translate-x-[3px]">
      {/* 식물 PNG의 실제 시각 중심에 맞추기 위한 위치 보정 */}
      <div className="bg-gray-0/80 text-green-deep animate-fade-in-out typo-caption shadow-toast inline-flex items-center justify-center gap-2 rounded-full px-4 py-1">
        {message}
      </div>
    </div>
  );
}
