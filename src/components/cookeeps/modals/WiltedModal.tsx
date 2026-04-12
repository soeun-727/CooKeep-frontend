import Button from "../../ui/Button";
import characterIcon from "../../../assets/character/crying_char.svg";

interface Props {
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
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div
        className="relative w-[280px] px-[28px] pt-[35px] pb-[25px] rounded-[10px] bg-white flex flex-col items-center gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col items-center gap-7">
          <p className="typo-body text-[#202020] text-center whitespace-pre-line">
            <span className="text-(--color-green-deep)">{plant} </span>
            이/가 시들었어요 T.T
            {"\n"}
            다시 살려서 이어 키워볼까요?
          </p>
          <img src={characterIcon} alt="알림 캐릭터" className="w-[86px]" />
        </div>

        <div className="w-full flex flex-col gap-2 font-semibold">
          <Button
            variant="green"
            className="!w-[224px] !bg-(--color-green)"
            onClick={onRecover} // 회복
          >
            회복하기 (쿠키 5개 사용)
          </Button>

          <Button
            variant="black"
            className="!w-[224px] !bg-stone-300"
            onClick={onAbandon} // 포기
          >
            포기하기
          </Button>
        </div>
      </div>
    </div>
  );
}
