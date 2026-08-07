interface SpeechBubbleProps {
  text: string;
  textStyle?: string;
  trianglePosition?: "top" | "bottom";
}
export const SpeechBubble = ({
  text,
  textStyle = "typo-caption-strong text-green-deep",
  trianglePosition = "bottom",
}: SpeechBubbleProps) => {
  const triangle =
    trianglePosition === "bottom" ? (
      <div className="border-t-gray-0 -mt-1 h-0 w-0 border-x-[8px] border-t-[16px] border-x-transparent" />
    ) : (
      <div className="border-b-gray-0 -mb-1 h-0 w-0 border-x-[8px] border-b-[16px] border-x-transparent" />
    );

  return (
    <section className="drop-shadow-container relative z-100 flex flex-col items-center">
      {trianglePosition === "top" && triangle}
      <div className="bg-gray-0 rounded-[8px] px-3 py-2">
        <p className={`whitespace-nowrap ${textStyle}`}>{text}</p>
      </div>
      {trianglePosition === "bottom" && triangle}
    </section>
  );
};
