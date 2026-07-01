import Button from "@/components/ui/Button";

interface RecommendButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export default function RecommendButton({
  disabled,
  onClick,
}: RecommendButtonProps) {
  return (
    <div className="fixed inset-x-0 bottom-[34px] flex justify-center">
      <Button size="L" variant="black" disabled={disabled} onClick={onClick}>
        AI 레시피 추천 받기
      </Button>
    </div>
  );
}
