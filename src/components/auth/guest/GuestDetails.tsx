import header from "@/assets/guest/back_header.svg";
import DetailedItem from "@/components/fridge/addItems/DetailedItem";
import milk from "@/assets/guest/bagel.svg";
import Button from "@/components/ui/Button";

interface GuestDetailsProps {
  onNext: () => void;
}

export default function GuestDetails({ onNext }: GuestDetailsProps) {
  const guestItem = {
    id: 1,
    name: "베이글",
    image: milk,
    category: "냉동",
    quantity: 1,
    unit: "개",
    expiryDate: "2026-12-31",
    dDay: 1,
    createdAt: Date.now(),
    categoryId: 1,
    type: "냉동" as any,
    storageType: "냉동",
    expiration: "2026-12-31",
    onIncrease: () => {},
    onDecrease: () => {},
    onDelete: () => {},
  };

  return (
    <div className="relative flex h-[calc(100dvh-62px)] w-full flex-col items-center overflow-hidden bg-[#FAFAFA]">
      <div className="flex w-full flex-col items-center">
        <div className="flex shrink-0 justify-center">
          <img src={header} alt="header" className="w-[361px]" />
        </div>

        <div
          className="pointer-events-none mt-[43px] flex w-full justify-center px-5"
          onClick={(e) => e.stopPropagation()}
        >
          <DetailedItem {...(guestItem as any)} />
        </div>
        <div className="absolute bottom-[calc(32px+env(safe-area-inset-bottom))] z-20 flex w-full justify-center">
          <Button size="L" variant="black" onClick={onNext}>
            등록 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
