import Button from "../../ui/Button";
import cookChar from "../../../assets/recipe/main/cook_char.svg";
interface Props {
  onNext: () => void;
}
export default function GuestRecipeIntro({ onNext }: Props) {
  return (
    <div className="flex justify-center">
      <div
        className="
          absolute
          top-[72px]
          left-1/2
          -translate-x-1/2
          w-[450px]
          h-[450px]
          rounded-full 
         bg-[#1FC16F]/15 blur-[100px]
          pointer-events-none
          z-0
        "
      />
      <div className="flex flex-col items-center w-[361px] gap-[28px] mt-[203.62px] z-10">
        <img
          src={cookChar}
          alt="요리 캐릭터"
          className="w-[162.5px] h-[116.646px]"
        />

        <div className="flex flex-col items-center h-[144px] gap-[28px] self-stretch">
          <h1 className="text-center text-[28px] font-semibold leading-[36px] text-[#202020]">
            지금 있는 재료로
            <br />
            요리해볼까요?
          </h1>

          <div className="w-[249px] h-[44px]">
            <Button
              size="S"
              variant="green"
              onClick={onNext}
              className="w-full h-full "
            >
              요리할 재료 선택하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
