import type { MasterItem } from "@/stores/useAddIngredientStore";

import milk from "@/assets/guest/bagel.svg";

import DetailedItem from "@/components/fridge/addItems/DetailedItem";
import Button from "@/components/ui/Button";

interface GuestDetailsProps {
  onNext: () => void;
}

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
  type: "DEFAULT",
  storageType: "냉동",
  expiration: "2026-12-31",
  onIncrease: () => {},
  onDecrease: () => {},
  onDelete: () => {},
};

export default function GuestDetails({ onNext }: GuestDetailsProps) {
  return (
    <div className="bg-background relative flex h-[calc(100dvh-40px)] w-full flex-col items-center overflow-hidden">
      <div className="flex w-full flex-col items-center">
        <div className="mt-[30px] flex w-full justify-center px-5">
          <DetailedItem {...(guestItem as MasterItem)} />
        </div>

        <div className="absolute bottom-0 z-[110] flex w-full justify-center px-4">
          <Button size="L" variant="black" onClick={onNext}>
            등록 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
