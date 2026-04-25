import header from "../../../assets/guest/back_header.svg";
import DetailedItem from "../../fridge/addItems/DetailedItem";
import milk from "../../../assets/guest/bagel.svg";
import Button from "../../ui/Button";

interface Props {
  onNext: () => void;
}

export default function GuestDetails({ onNext }: Props) {
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
    <div className="relative flex flex-col items-center w-full h-[calc(100dvh-62px)] bg-[#FAFAFA] overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-center shrink-0">
          <img src={header} alt="header" className="w-[361px]" />
        </div>

        <div
          className="mt-[43px] w-full flex justify-center px-5 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <DetailedItem {...(guestItem as any)} />
        </div>
        <div className="absolute bottom-[calc(32px+env(safe-area-inset-bottom))] flex justify-center w-full z-20">
          <Button size="L" variant="black" onClick={onNext}>
            등록 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
