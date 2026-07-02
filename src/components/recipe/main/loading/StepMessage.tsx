interface StepMessageProps {
  message: string;
  icon: string;
}

export default function StepMessage({ message, icon }: StepMessageProps) {
  return (
    <div
      className="step-message border-green bg-gray-0 flex items-center gap-3 rounded-md border p-3"
      style={{
        boxShadow: "0 4px 16px -10px rgba(0,0,0,0.25)",
      }}
    >
      <img src={icon} className="h-6 w-6" alt="check" />
      <span className="text-gray-80 flex-1 text-left text-sm leading-5 font-medium">
        {message}
      </span>
    </div>
  );
}
