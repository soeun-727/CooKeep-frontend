// src/pages/settings/components/SettingsToggleItem.tsx

interface SettingsToggleItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingsToggleItem({
  label,
  checked,
  onChange,
}: SettingsToggleItemProps) {
  return (
    <div className="flex items-center justify-between w-full px-3">
      <span className="typo-body text-gray-80">{label}</span>

      <button
        onClick={() => onChange(!checked)}
        className={`relative flex h-[26px] w-[50px] items-center rounded-full transition-colors ${checked ? "bg-gray-200" : "bg-gray-200"} `}
      >
        <div
          className={`
            absolute top-[2px]
            w-[22px] h-[22px] rounded-full  transition-transform
            ${checked ? "translate-x-[26px] bg-green-deep" : "translate-x-[2px] bg-gray-30"}
          `}
        />
      </button>
    </div>
  );
}
