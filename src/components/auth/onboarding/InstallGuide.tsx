import { useNavigate } from "react-router-dom";

import mainLogo from "@/assets/logos/mainLogo.svg";
import installGuideImage from "@/assets/onboarding/installGuideImage.svg";

import Button from "@/components/ui/Button";

interface InstallGuideProps {
  onFinish: () => void;
}

export default function InstallGuide({ onFinish }: InstallGuideProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center px-4">
      <button
        onClick={() =>
          navigate("/settings/faq", {
            state: { openCategoryId: 4 },
          })
        }
        className="typo-m-strong text-green-deep absolute top-0 right-4 py-[10px]"
      >
        자세한 설명 보기
      </button>
      {/* ================= 상단 (로고 + 제목 + 소제목) ================= */}
      <div className="mt-25 flex w-full flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center gap-[2px]">
          <img src={mainLogo} alt="CooKeep Logo" className="h-7" />
          <h1 className="typo-h2">홈 화면에서 편하게 만나보세요!</h1>
        </div>
        <p className="typo-l-strong text-green-deep w-full text-center">
          더 쉽고 빠르게 서비스를 이용할 수 있어요
        </p>
      </div>

      <img
        src={installGuideImage}
        alt="Install Guide"
        className="mt-15 mb-15 h-[202px] w-full object-contain"
      />

      {/* ================= 설명 영역 ================= */}
      <div className="flex w-full flex-col items-center gap-3 self-stretch text-center text-gray-50">
        <div className="flex flex-col">
          <p className="typo-l-strong">iOS 사용자는 Safari에서 열어주세요</p>
          <p className="typo-l">Safari 공유 버튼 → ‘홈 화면에 추가’</p>
        </div>
        <div className="flex flex-col">
          <p className="typo-l-strong">Android 사용자는 Chrome을 추천드려요</p>
          <p className="typo-l">우측 상단 메뉴 → ‘홈 화면에 추가’</p>
        </div>
      </div>

      {/* ================= 하단 버튼 ================= */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[450px] -translate-x-1/2 px-4 pt-6">
        <div className="flex w-full flex-col items-center gap-[8px]">
          <Button size="L" variant="green" onClick={onFinish}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
