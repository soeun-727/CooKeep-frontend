import header from "@assets/guest/back_header.svg";
import contents from "@assets/guest/recipe_header.svg";
import DifficultySelector from "@/components/recipe/main/confirm/DifficultySelector";
import Button from "@/components/ui/Button";

interface Props {
  onNext: () => void;
}

export default function GuestRecipeLevel({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center">
      <object data={header} />
      <object data={contents} className="mt-[38px]" />
      <div className="-mt-[50px] w-full pb-20">
        <DifficultySelector />
      </div>
      <div className="fixed bottom-[34px] left-1/2 z-[130] -translate-x-1/2">
        <Button size="L" variant="black" onClick={onNext}>
          AI 레시피 추천 받기
        </Button>
      </div>
    </div>
  );
}
