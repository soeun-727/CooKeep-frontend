// src/components/ui/FloatingNotice.tsx
interface FloatingNoticeProps {
  text: string;
}

export default function FloatingNotice({ text }: FloatingNoticeProps) {
  return <div className="floating-notice">{text}</div>;
}
