import { Notice } from "@/types/notice";
import ServiceNotice from "./ServiceNotice";
import FeatureNotice from "./FeatureNotice";
import TargetNotice from "./TargetNotice";

interface Props {
  notice: Notice;
}

export default function NoticeItem({ notice }: Props) {
  switch (notice.title) {
    case "서비스 소개":
      return <ServiceNotice content={notice.content} />;

    case "쿠킵에서는 이런 걸 할 수 있어요":
      return <FeatureNotice content={notice.content} />;

    case "이런 분께 잘 맞아요":
      return <TargetNotice content={notice.content} />;

    default:
      return (
        <p className="typo-m text-gray-80 whitespace-pre-line">
          {notice.content}
        </p>
      );
  }
}
