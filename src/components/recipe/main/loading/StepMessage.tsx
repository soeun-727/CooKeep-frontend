interface StepMessageProps {
  message: string;
  icon: string;
}

export default function StepMessage({ message, icon }: StepMessageProps) {
  return (
    <div className="step-message border-gray-10 rounded-M flex items-center gap-3 border p-3">
      <img src={icon} className="h-6 w-6" alt="check" />
      <span className="text-gray-80 typo-m flex-1 text-left">{message}</span>
    </div>
  );
}
