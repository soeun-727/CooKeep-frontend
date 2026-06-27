import Button from "@/components/ui/Button";
import type { Ingredient } from "@/stores/useIngredientStore";
import characterImg from "@/assets/character/surprised_char_faded.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: Ingredient[];
}

export default function ExpiryAlertModal({ isOpen, onClose, items }: Props) {
  const navigate = useNavigate();

  if (!isOpen || items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative flex w-[280px] flex-col items-center gap-2 rounded-[10px] bg-white px-[28px] pt-[35px] pb-[25px]">
        {/* content */}
        <div className="flex w-full flex-col items-center gap-4">
          <img
            src={characterImg}
            alt="알림 캐릭터"
            className="h-[60px] w-[75px]"
          />

          <p className="typo-body2 text-center whitespace-pre-line text-[#202020]">
            유통기한이 오늘까지인 재료가 있어요!
            <br />
            지금 확인하고 요리해볼까요?
          </p>
        </div>

        {/* buttons */}
        <div className="mt-2 flex w-full flex-col gap-2">
          <Button
            variant="green"
            className="!w-[224px] bg-[#32E389]"
            onClick={() => {
              onClose();
              navigate("/recipe/select");
            }}
          >
            레시피 받고 요리하기
          </Button>

          <Button
            variant="black"
            className="!w-[224px] bg-[#C3C3C3]"
            onClick={onClose}
          >
            나중에 요리할게요
          </Button>
        </div>
      </div>
    </div>
  );
}
