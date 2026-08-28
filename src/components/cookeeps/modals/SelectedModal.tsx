import Button from "@/components/ui/Button";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

interface SelectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: string;
  image: string;
  description: string;
  onConfirm: () => void;
}

// 강낭콩만 받침 있는 명사라 "을", 나머지는 "를"
function getParticle(plant: string) {
  return plant === "강낭콩" ? "을" : "를";
}

export default function SelectedModal({
  isOpen,
  onClose,
  plant,
  image,
  description,
  onConfirm,
}: SelectedModalProps) {
  if (!isOpen) return null;

  const isLettuce = plant === "상추";

  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80/50 absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="bg-gray-0 shadow-container rounded-L relative mx-6 flex w-full max-w-[300px] flex-col items-center gap-6 p-6">
        {/* 내용 영역 */}
        <div className="flex w-full flex-col items-center gap-3">
          <h2 className="typo-l-strong text-gray-80 w-full text-center">
            <span className="text-green-deep">{plant}</span>
            {getParticle(plant)} 키워볼까요?
          </h2>

          {/* 이미지 + 디스크립션 */}
          <div className="flex items-start justify-center">
            <div className="inline-flex flex-col items-center gap-1">
              {/* 이미지 wrapper: 항상 72x72로 고정, 내부에서만 크기 분기 */}
              <div className="flex h-[72px] w-[72px] items-center justify-center overflow-visible">
                <img
                  src={image}
                  alt={plant}
                  className={`shrink-0 object-cover ${
                    isLettuce ? "h-[96px] w-[96px]" : "h-[72px] w-[72px]"
                  }`}
                />
              </div>

              <div className="flex flex-col items-center">
                <SpeechBubble
                  text={description}
                  textStyle="typo-caption text-gray-50"
                  trianglePosition="top"
                  bgClassName="bg-gray-10"
                  paddingClassName="px-4 py-1"
                  radiusClassName="rounded-[4px]"
                  triangleClassName="border-b-gray-10 -mb-1 h-0 w-0 border-x-[8px] border-b-[16px] border-x-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex w-full items-center gap-2">
          <Button variant="green" className="flex-1" onClick={onConfirm}>
            네
          </Button>
          <Button variant="gray" className="flex-1" onClick={onClose}>
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
}
