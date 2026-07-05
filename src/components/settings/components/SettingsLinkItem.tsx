import { useNavigate } from "react-router-dom";

interface SettingsLinkItemProps {
  label: string;
  to: string;
}

export default function SettingsLinkItem({ label, to }: SettingsLinkItemProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-green text-gray-0 typo-body flex w-full items-center justify-center rounded-[10px] pt-[12px] pb-[12px]"
    >
      {label}
    </button>
  );
}
