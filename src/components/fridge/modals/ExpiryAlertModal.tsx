import { useNavigate } from "react-router-dom";

import type { Ingredient } from "@/stores/useIngredientStore";

import characterImg from "@/assets/character/surprised_char_faded.svg";

import Button from "@/components/ui/Button";

interface ExpiryAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Ingredient[];
}

export default function ExpiryAlertModal({
  isOpen,
  onClose,
  items,
}: ExpiryAlertModalProps) {
  const navigate = useNavigate();

  if (!isOpen || items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      <div className="bg-gray-80/50 absolute inset-0" onClick={onClose} />

      <section className="bg-gray-0 relative flex w-[300px] flex-col items-center gap-6 rounded-[16px] p-6">
        <div className="flex w-full flex-col items-center gap-3">
          <img
            src={characterImg}
            alt="알림 캐릭터"
            className="h-[60px] w-[75px]"
          />

          <p className="typo-l-strong text-gray-80 text-center whitespace-pre-line">
            유통기한이 오늘까지인 재료가 있어요!
            <br />
            지금 확인하고 요리해볼까요?
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button
            variant="green"
            onClick={() => {
              onClose();
              navigate("/recipe/select");
            }}
          >
            확인
          </Button>

          <Button variant="gray" onClick={onClose}>
            취소
          </Button>
        </div>
      </section>
    </div>
  );
}
