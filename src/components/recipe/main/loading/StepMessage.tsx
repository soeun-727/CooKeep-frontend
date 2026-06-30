interface StepMessageProps {
  message: string;
  icon: string;
}

export default function StepMessage({ message, icon }: StepMessageProps) {
  return (
    <div
      className="step-message flex items-center gap-3 p-3 border border-green rounded-md bg-gray-0"
      style={{
        boxShadow: "0 4px 16px -10px rgba(0,0,0,0.25)",
      }}
    >
      <img src={icon} className="w-6 h-6" alt="check" />
      <span className="flex-1 text-gray-80 font-medium text-sm leading-5 text-left">
        {message}
      </span>
    </div>
  );
}
