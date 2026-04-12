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
    <div className="flex items-center justify-between w-full px-3">
      <span className="typo-body text-[#202020]">{label}</span>

      <button
        onClick={() => onChange(!checked)}
        className={`
          relative flex items-center
          w-[50px] h-[26px] rounded-full transition-colors
          ${checked ? "bg-gray-200" : "bg-gray-200"}
        `}
      >
        <div
          className={`
            absolute top-[2px]
            w-[22px] h-[22px] rounded-full  transition-transform
            ${checked ? "translate-x-[26px] bg-(--color-green-deep)" : "translate-x-[2px] bg-stone-300"}
          `}
        />
      </button>
    </div>
  );
}
