import { parseNoticeLines, removeBullet } from "@/utils/notice";

interface ServiceNoticeProps {
  content: string;
}

export default function ServiceNotice({ content }: ServiceNoticeProps) {
  const lines = parseNoticeLines(content);
  const footer = lines.slice(4).join(" ");

  return (
    <div className="flex flex-col gap-3">
      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <p className="typo-m-strong text-gray-80">{lines[0]}</p>

        <p className="typo-m text-gray-80">{lines[1]}</p>
      </div>

      {/* Cook / Keep */}
      <div className="flex flex-col">
        <p className="typo-m-strong text-gray-80">{removeBullet(lines[2])}</p>

        <p className="typo-m-strong text-gray-80">{removeBullet(lines[3])}</p>
      </div>

      {/* 마지막 회색 문장 */}
      <p className="typo-m text-gray-50">{footer}</p>
    </div>
  );
}
