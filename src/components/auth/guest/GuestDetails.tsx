import milk from "@/assets/guest/bagel.svg";

import DetailedItem from "@/components/fridge/addItems/DetailedItem";
import Button from "@/components/ui/Button";

interface GuestDetailsProps {
  onNext: () => void;
  isDimmed: boolean;
  setIsDimmed: (isDimmed: boolean) => void;
}

export default function GuestDetails({
  onNext,
  setIsDimmed,
}: GuestDetailsProps) {
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
    <div
      onClick={() => setIsDimmed(true)}
      className="bg-background relative flex h-[calc(100dvh-40px)] w-full flex-col items-center overflow-hidden"
    >
      <div className="flex w-full flex-col items-center">
        <div
          className="pointer-events-none mt-[30px] flex w-full justify-center px-5"
          onClick={e => e.stopPropagation()}
        >
          <DetailedItem {...(guestItem as any)} />
        </div>
        <div className="absolute bottom-0 z-40 flex w-full justify-center px-4 pb-1">
          <Button size="L" variant="black" onClick={onNext}>
            등록 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
