import { useNavigate } from "react-router-dom";

import mainLogo from "../../../assets/logos/mainLogo.svg";
import Button from "../../ui/Button";
import { checkIsAndroid } from "../../../utils/device";

import InstallGuideBanner from "./InstallGuideBanner";
import InstallGuideDescription from "./InstallGuideDescription";
import PlayStoreInstallButton from "./PlayStoreInstallButton";

interface InstallGuideProps {
  onFinish: () => void;
  isAndroid?: boolean;
}

export default function InstallGuide({
  onFinish,
  isAndroid = checkIsAndroid(),
}: InstallGuideProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center px-4 ${
        isAndroid ? "gap-39" : "gap-[178px]"
      }`}
    >
      <div className="flex w-full flex-col items-center gap-[90px]">
        <header className="flex w-full justify-end">
          <button
            onClick={() =>
              navigate("/settings/faq", {
                state: { openCategoryId: 4 },
              })
            }
            className="typo-m-strong text-green-deep py-[10px]"
          >
            자세한 설명 보기
          </button>
        </header>

        {/* ================= 상단 (로고 + 제목 + 소제목) ================= */}
        <div className="flex w-full flex-col items-center gap-12">
          <div className="gap-2">
            <div className="flex w-full flex-col items-center gap-[2px]">
              <img
                src={mainLogo}
                alt="CooKeep Logo"
                className="h-7 w-full object-contain"
              />
              <h1 className="typo-h2">홈 화면에서 편하게 만나보세요!</h1>
            </div>
            <p className="typo-l-strong text-green-deep w-full text-center">
              더 쉽고 빠르게 서비스를 이용할 수 있어요
            </p>
          </div>

          {/* 가이드 영역 */}
          <div
            className={`flex w-full flex-col items-center ${
              isAndroid ? "gap-[30px]" : ""
            }`}
          >
            <InstallGuideBanner />
            {isAndroid && <PlayStoreInstallButton />}
          </div>
        </div>
      </div>

      {/* ================= 설명 영역 ================= */}
      <InstallGuideDescription isAndroid={isAndroid} />

      {/* ================= 하단 버튼 ================= */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[450px] -translate-x-1/2 px-4">
        <Button size="L" variant="green" onClick={onFinish}>
          확인
        </Button>
      </div>
    </div>
  );
}
