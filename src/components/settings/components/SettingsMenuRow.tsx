// components/settings/components/SettingsMenuRow.tsx
interface SettingsMenuRowProps {
  label: string;
  onClick: () => void;
  muted?: boolean; // 탈퇴하기처럼 톤 다운
}

export default function SettingsMenuRow({
  label,
  onClick,
  muted = false,
}: SettingsMenuRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center gap-1 py-2 text-left"
    >
      <span
        className={`typo-l-strong flex-1 ${muted ? "text-gray-50" : "text-gray-80"}`}
      >
        {label}
      </span>
    </button>
  );
}
