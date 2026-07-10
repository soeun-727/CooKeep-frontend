interface SpeechBubbleProps {
  text: string;
}
export const SpeechBubble = ({ text }: SpeechBubbleProps) => {
  return (
    <section className="relative z-100 flex flex-col drop-shadow-[0_4px_16px_rgba(17,17,17,0.10)]">
      <div className="bg-gray-0 rounded-[8px] px-3 py-1">
        <p className="typo-caption-strong text-green-deep">{text}</p>
      </div>
      <div className="absoulute border-t-gray-0 mx-auto mt-[-4px] h-0 w-0 border-x-[8px] border-t-[16px] border-x-transparent" />
    </section>
  );
};
