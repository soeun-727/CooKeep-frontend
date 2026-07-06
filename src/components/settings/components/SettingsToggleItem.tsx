interface SettingsToggleItemProps {
  // label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingsToggleItem({
  // label,
  checked,
  onChange,
}: SettingsToggleItemProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="relative h-9 w-[52px] shrink-0"
    >
      {/* track: 40x20, 중앙 정렬 */}
      <span
        className={`absolute top-2 left-[6px] h-5 w-10 rounded-full transition-colors ${
          checked ? "bg-gray-10" : "bg-gray-10"
        }`}
      />
      {/* thumb: 28x28 */}
      <span
        className={`absolute top-1 left-[2px] h-7 w-7 rounded-full shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] transition-transform ${
          checked ? "bg-green translate-x-[20px]" : "bg-gray-30 translate-x-0"
        }`}
      />
    </button>
  );
}
