// src/pages/settings/components/NoticeItem.tsx

interface NoticeItemProps {
  title: string;
  content: string;
}

export default function NoticeItem({ title, content }: NoticeItemProps) {
  const lines = content.split(/\r?\n/);

  // 두 줄 합친 회색 문장
  const graySentence =
    "1인 가구에게 요리는 지갑과 건강, 환경까지 함께 고려하는 선택이에요. 쿠킵은 그 선택을 알아보고, 기록으로 남겨 작은 보상으로 응원해요!";

  // bullet 필요한 공지
  const bulletTitles = [
    "쿠킵에서는 이런 걸 할 수 있어요",
    "이런 분께 잘 맞아요",
  ];

  const isBulletNotice = bulletTitles.includes(title);

  return (
    <div className="flex flex-col">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-[6px]" />;
        }

        // 회색 문장 판별
        const isGray =
          graySentence.includes(trimmed) && title === "서비스 소개";

        const colorClass = isGray ? "text-[#7D7D7D]" : "text-[#202020]";

        return (
          <p
            key={idx}
            className={`typo-label whitespace-pre-line ${colorClass} mb-[6px]`}
          >
            {isBulletNotice ? `• ${trimmed}` : trimmed}
          </p>
        );
      })}
    </div>
  );
}
