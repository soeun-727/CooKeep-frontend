// src/pages/settings/components/SettingsLinkItem.tsx
import { useNavigate } from "react-router-dom";

type SettingsLinkItemProps = {
  label: string;
  to: string;
};

export default function SettingsLinkItem({ label, to }: SettingsLinkItemProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="typo-body flex w-full items-center justify-center rounded-[10px] bg-[var(--color-green)] pt-[12px] pb-[12px] text-white"
    >
      {label}
    </button>
  );
}
