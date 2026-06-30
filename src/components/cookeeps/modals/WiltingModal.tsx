import { useCookeepsStore } from "@/stores/useCookeepsStore";

import characterImg from "@/assets/character/kijul_char.svg";

import Button from "@/components/ui/Button";

interface WiltingModalProps {
  plant: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function WiltingModal({
  plant,
  isOpen,
  onClose,
}: WiltingModalProps) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div
        className="relative flex h-[254px] w-70 flex-col items-center gap-7 rounded-[10px] bg-white px-7 pt-[35px] pb-[25px]"
        onClick={e => e.stopPropagation()}
      >
        {/* content */}
        <div className="flex w-full flex-col items-center gap-7">
          <p className="typo-body text-center whitespace-pre-line text-[#202020]">
            <span className="text-(--color-green-deep)">{plant} </span>
            이/가 시들고 있어요
            {"\n"}
            지금 쿠키를 사용해 물을 주세요
          </p>
          <img src={characterImg} alt="알림 캐릭터" className="w-[86px]" />
        </div>

        {/* buttons */}

        <Button
          variant="green"
          className="!w-[224px] !bg-(--color-green) !font-semibold"
          onClick={() => {
            // 물 주러 가기 클릭
            useCookeepsStore.setState({ wantsToWater: true });
            onClose(); // status 변경 X
          }}
        >
          물 주러 가기
        </Button>
      </div>
    </div>
  );
}
