interface SpeechBubbleProps {
  text: string;
  textStyle?: string;
  trianglePosition?: "top" | "bottom";
  bgClassName?: string;
  paddingClassName?: string;
  triangleClassName?: string;
  radiusClassName?: string;
}
export const SpeechBubble = ({
  text,
  textStyle = "typo-caption-strong text-green-deep",
  trianglePosition = "bottom",
  bgClassName = "bg-gray-0/90",
  paddingClassName = "px-3 py-1",
  triangleClassName,
  radiusClassName = "rounded-[8px]",
}: SpeechBubbleProps) => {
  const defaultTriangleClass =
    trianglePosition === "bottom"
      ? "border-t-gray-0 -mt-1 h-0 w-0 border-x-[8px] border-t-[16px] border-x-transparent"
      : "border-b-gray-0 -mb-1 h-0 w-0 border-x-[8px] border-b-[16px] border-x-transparent";

  const triangle = (
    <div className={triangleClassName ?? defaultTriangleClass} />
  );

  return (
    <section className="drop-shadow-container relative z-100 flex flex-col items-center">
      {trianglePosition === "top" && triangle}
      <div className={`${bgClassName} ${radiusClassName} ${paddingClassName}`}>
        <p className={`whitespace-nowrap ${textStyle}`}>{text}</p>
      </div>
      {trianglePosition === "bottom" && triangle}
    </section>
  );
};
