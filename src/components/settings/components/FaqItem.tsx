// src/pages/settings/components/FaqItem.tsx
interface FaqItemProps {
  question: string;
  answer: string | React.ReactNode;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <p className="typo-label text-gray-80">Q. {question}</p>
      <p className="typo-label whitespace-pre-line text-gray-50">A. {answer}</p>
    </div>
  );
}
