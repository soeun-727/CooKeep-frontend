import character from "@/assets/character/confused_char.svg";

interface NoResultViewProps {
  className?: string;
  imageClassName?: string;
  messageClassName?: string;
}

export default function NoResultView({
  className = "animate-fadeIn flex w-full flex-col items-center py-20",
  imageClassName = "mt-[100px] mb-4 w-[90px]",
  messageClassName = "typo-caption font-semibold text-gray-50",
}: NoResultViewProps) {
  return (
    <div className={className}>
      <img
        src={character}
        alt="no result character"
        className={imageClassName}
      />
      <span className={messageClassName}>검색 결과가 없어요</span>
    </div>
  );
}
