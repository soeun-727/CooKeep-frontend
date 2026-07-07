interface TargetNoticeProps {
  content: string;
}

export default function TargetNotice({ content }: TargetNoticeProps) {
  const lines = content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, idx) => (
        <div key={idx} className="flex gap-2 px-2">
          <span className="typo-m text-gray-80">•</span>

          <p className="typo-m text-gray-80 flex-1">
            {line.replace(/^-+\s*/, "")}
          </p>
        </div>
      ))}
    </div>
  );
}
