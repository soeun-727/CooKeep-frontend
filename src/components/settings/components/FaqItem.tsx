// src/pages/settings/components/FaqItem.tsx
type Props = {
  question: string;
  answer: string | React.ReactNode;
};

export default function FaqItem({ question, answer }: Props) {
  return (
    <div className="flex flex-col gap-[6px]">
      <p className="typo-label text-(--color-gray-80)">Q. {question}</p>
      <p className="typo-label whitespace-pre-line text-(--color-gray-50)">
        A. {answer}
      </p>
    </div>
  );
}
