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
    <div className="fixed inset-x-0 bottom-[34px] flex w-full justify-center px-4">
      <Button size="L" variant="green" disabled={disabled} onClick={onClick}>
        AI 레시피 추천받기
      </Button>
    </div>
  );
}
