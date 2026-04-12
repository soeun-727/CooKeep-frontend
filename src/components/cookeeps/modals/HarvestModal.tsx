import Button from "../../ui/Button";
import congratsImg from "../../../assets/character/congrats_happy_char.svg";

interface HarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HarvestModal({ isOpen, onClose }: HarvestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* dim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[258px] px-[28px] pt-[35px] pb-[25px] bg-white rounded-[10px] flex flex-col items-center gap-[18px]">
        {/* content */}
        <div className="flex flex-col items-center gap-[28px] w-full">
          {/* image + text */}
          <div className="flex flex-col items-center gap-[20px]">
            <img
              src={congratsImg}
              alt="수확 완료"
              className="w-[80px] h-[84.8px]"
            />

            {/* text */}
            <div className="flex flex-col items-center gap-[20px] w-full">
              <p className="typo-body2 text-[#202020] text-center">
                축하해요 🎉 <br />
                정성 들여 키운 식물이 <br />
                드디어 다 자랐어요
              </p>

              <p className="font-bold text-[16px] leading-[24px] text-[#1FC16F] text-center">
                쿠키 +15 🍪
              </p>
            </div>
          </div>

          {/* button */}
          <Button
            variant="green"
            className="!w-full !h-[44px] !rounded-[10px]"
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
