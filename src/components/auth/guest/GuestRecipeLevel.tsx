import header from "../../../assets/guest/back_header.svg";
import contents from "../../../assets/guest/recipe_header.svg";
import DifficultySelector from "../../recipe/main/confirm/DifficultySelector";
import Button from "../../ui/Button";

interface Props {
  onNext: () => void;
}

export default function GuestRecipeLevel({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center">
      <img src={header} />
      <img src={contents} className="mt-[38px]" />
      <div className="w-full -mt-[50px]">
        <DifficultySelector />
      </div>
      <div className="fixed bottom-[34px] left-1/2 -translate-x-1/2 z-[130]">
        <Button size="L" variant="black" onClick={onNext}>
          AI 레시피 추천 받기
        </Button>
      </div>
    </div>
  );
}
