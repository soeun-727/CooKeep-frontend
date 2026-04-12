// src/pages/settings/components/FaqItem.tsx
type Props = {
  question: string;
  answer: string | React.ReactNode;
};

export default function FaqItem({ question, answer }: Props) {
  return (
    <div className="flex flex-col gap-[6px]">
      <p className="typo-label text-[#202020]">Q. {question}</p>
      <p className="typo-label whitespace-pre-line text-[#7D7D7D]">
        A. {answer}
      </p>
    </div>
  );
}
