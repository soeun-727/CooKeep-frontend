import congratsImg from "@/assets/character/congrats_happy_char.svg";

import Button from "@/components/ui/Button";

interface HarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HarvestModal({ isOpen, onClose }: HarvestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* dim */}
      <div className="bg-gray-80 absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="bg-gray-0 rounded-L relative flex w-[258px] flex-col items-center gap-[18px] px-[28px] pt-[35px] pb-[25px]">
        {/* content */}
        <div className="flex w-full flex-col items-center gap-[28px]">
          {/* image + text */}
          <div className="flex flex-col items-center gap-[20px]">
            <img
              src={congratsImg}
              alt="수확 완료"
              className="h-[84.8px] w-[80px]"
            />

            {/* text */}
            <div className="flex w-full flex-col items-center gap-[20px]">
              <p className="typo-body2 text-gray-80 text-center">
                축하해요 🎉 <br />
                정성 들여 키운 식물이 <br />
                드디어 다 자랐어요
              </p>

              <p className="text-green-deep text-center text-[16px] leading-[24px] font-bold">
                쿠키 +20 🍪
              </p>
            </div>
          </div>

          {/* button */}
          <Button
            variant="green"
            className="!rounded-M !h-[44px] !w-full"
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
