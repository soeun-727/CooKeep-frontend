// src/pages/settings/components/SettingsToggleItem.tsx

type SettingsToggleItemProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function SettingsToggleItem({
  label,
  checked,
  onChange,
}: SettingsToggleItemProps) {
  return (
    <div className="flex w-full items-center justify-between px-3">
      <span className="typo-body text-[#202020]">{label}</span>

      <button
        onClick={() => onChange(!checked)}
        className={`relative flex h-[26px] w-[50px] items-center rounded-full transition-colors ${checked ? "bg-gray-200" : "bg-gray-200"} `}
      >
        <div
          className={`absolute top-[2px] h-[22px] w-[22px] rounded-full transition-transform ${checked ? "translate-x-[26px] bg-(--color-green-deep)" : "translate-x-[2px] bg-stone-300"} `}
        />
      </button>
    </div>
  );
}
