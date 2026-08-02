import CheckIcon from "@/assets/recipe/check.svg?react";

interface StepMessageProps {
  message: string;
}

export default function StepMessage({ message }: StepMessageProps) {
  return (
    <div className="step-message bg-gray-0 border-gray-10 rounded-M flex items-center gap-3 border p-3">
      <CheckIcon className="text-green h-6 w-6" />
      <span className="text-gray-80 typo-m flex-1 text-left">{message}</span>
    </div>
  );
}
