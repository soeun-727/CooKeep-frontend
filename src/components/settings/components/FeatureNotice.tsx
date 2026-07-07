interface FeatureNoticeProps {
  content: string;
}

export default function FeatureNotice({ content }: FeatureNoticeProps) {
  const items = content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const text = item.replace(/^-+\s*/, "");

        const [title, ...rest] = text.split(":");
        const description = rest.join(":").trim();

        return (
          <div key={idx} className="flex flex-col gap-2">
            <p className="typo-m-strong text-gray-80">{title}</p>

            <div className="flex gap-2 px-2">
              <span className="typo-m text-gray-80">•</span>

              <p className="typo-m text-gray-80 flex-1">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
