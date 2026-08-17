// components/settings/components/SettingsSectionLabel.tsx
export default function SettingsSectionLabel({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center gap-2 py-1">
      <span className="typo-l-strong text-gray-30 flex-1">{label}</span>
    </div>
  );
}
