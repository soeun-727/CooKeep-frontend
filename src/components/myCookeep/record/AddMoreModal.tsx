import character from "@/assets/character/thinking_char.svg";

import Button from "@/components/ui/Button";

interface AddMoreModalProps {
  onConfirm: () => void;
  onCancel: () => void; // 그냥 닫기
}

export default function AddMoreModal({
  onConfirm,
  onCancel,
}: AddMoreModalProps) {
  return (
    <div
      className="bg-gray-80 fixed inset-0 z-60 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-gray-0 rounded-L flex w-[240px] flex-col items-center gap-2 px-[28px] pt-[35px] pb-[25px]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-4 self-stretch">
          <img src={character} className="h-[90px] w-[85px]" alt="thinking" />

          <p className="typo-label">오늘, 다른 요리도 기록해볼까요?</p>

          <Button
            size="S"
            variant="green"
            className="!w-[184px]"
            onClick={onConfirm}
          >
            기록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
