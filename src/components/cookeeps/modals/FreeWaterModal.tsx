import characterImg from "@/assets/character/plant_char.svg";

import Button from "@/components/ui/Button";

interface FreeWaterModalProps {
  isOpen: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function FreeWaterModal({
  isOpen,
  onConfirm,
  onClose,
}: FreeWaterModalProps) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80 absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="bg-gray-0 relative flex w-[258px] flex-col items-center gap-5 rounded-[10px] px-7 pt-[35px] pb-[25px]">
        {/* content */}
        <div className="flex w-full flex-col items-center gap-7">
          <p className="typo-body2 text-gray-80 text-center whitespace-pre-line">
            씨앗 등록 완료! 🌱{"\n"}
            무료 물주기 1회가 준비되어 있어요
          </p>
          <img src={characterImg} alt="알림 캐릭터" className="w-[85px]" />
        </div>

        {/* buttons */}

        <Button
          variant="green"
          className="!bg-green mt-2 !w-[202px] !font-bold"
          onClick={async () => {
            await onConfirm(); // 이것만
            onClose();
          }}
        >
          물 주러 가기
        </Button>
      </div>
    </div>
  );
}
