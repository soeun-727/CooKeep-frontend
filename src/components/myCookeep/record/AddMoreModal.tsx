import Button from "../../ui/Button";
import character from "../../../assets/character/thinking_char.svg";

interface Props {
  onConfirm: () => void;
  onCancel: () => void; // 그냥 닫기
}

export default function AddMoreModal({ onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-60"
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center gap-2 w-[240px] px-[28px] pt-[35px] pb-[25px] bg-white rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-4 self-stretch">
          <img src={character} className="w-[85px] h-[90px]" alt="thinking" />

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
