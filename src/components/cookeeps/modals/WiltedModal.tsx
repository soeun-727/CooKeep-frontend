import characterIcon from "@/assets/character/crying_char.svg";

import Button from "@/components/ui/Button";

interface WiltedModalProps {
  plant: string;
  isOpen: boolean;
  onClose: () => void;
  onAbandon: () => void;
  onRecover: () => void;
}
export default function WiltedModal({
  plant,
  isOpen,
  onClose,
  onAbandon,
  onRecover,
}: WiltedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80 absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div
        className="bg-gray-0 relative flex w-[280px] flex-col items-center gap-7 rounded-[10px] px-[28px] pt-[35px] pb-[25px]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-center gap-7">
          <p className="typo-body text-gray-80 text-center whitespace-pre-line">
            <span className="text-green-deep">{plant} </span>
            이/가 시들었어요 T.T
            {"\n"}
            다시 살려서 이어 키워볼까요?
          </p>
          <img src={characterIcon} alt="알림 캐릭터" className="w-[86px]" />
        </div>

        <div className="flex w-full flex-col gap-2 font-semibold">
          <Button
            variant="green"
            className="!bg-green !w-[224px]"
            onClick={onRecover} // 회복
          >
            회복하기 (쿠키 5개 사용)
          </Button>

          <Button
            variant="black"
            className="!bg-gray-30 !w-[224px]"
            onClick={onAbandon} // 포기
          >
            포기하기
          </Button>
        </div>
      </div>
    </div>
  );
}
