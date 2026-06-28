interface StepMessageProps {
  message: string;
  icon: string;
}

export default function StepMessage({ message, icon }: StepMessageProps) {
  return (
    <div
      className="step-message flex items-center gap-3 rounded-md border border-[#32E389] bg-white p-3"
      style={{
        boxShadow: "0 4px 16px -10px rgba(0,0,0,0.25)",
      }}
    >
      <img src={icon} className="h-6 w-6" alt="check" />
      <span className="flex-1 text-left text-sm leading-5 font-medium text-[#202020]">
        {message}
      </span>
    </div>
  );
}
