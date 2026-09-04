import congratsImg from "@/assets/character/congrats_happy_char.svg";

import ImageModal from "@/components/ui/ImageModal";

interface HarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardPoints?: number;
}

export default function HarvestModal({
  isOpen,
  onClose,
  rewardPoints,
}: HarvestModalProps) {
  if (!isOpen) return null;

  return (
<<<<<<< HEAD
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
=======
    <ImageModal
      imageSrc={congratsImg}
      imageWidth={80}
      imageHeight={84.803}
      title={"축하해요 🎉\n정성 들여 키운 식물이\n드디어 다 자랐어요"}
      highlight={`쿠키 +${rewardPoints ?? 30} 🍪`}
      buttonTexts={["확인"]}
      buttonVariants={["green"]}
      buttonActions={[onClose]}
      onBackdropClick={onClose}
    />
>>>>>>> 788c5fb79e00830f3f8837280b9a28758dd09c6b
  );
}
