import { useNavigate } from "react-router-dom";

import MainLogo from "@/assets/logos/mainLogo.svg?react";
import SettingsIcon from "@/assets/onboarding/settingsIcon.svg?react";
import AppstoreIcon from "@/assets/onboarding/appstoreIcon.svg?react";
import AppIcon from "@/assets/onboarding/appIcon.svg?react";
import MailIcon from "@/assets/onboarding/mailIcon.svg?react";
import PhoneIcon from "@/assets/onboarding/phoneIcon.svg?react";
import PlaystoreButton from "@/assets/onboarding/playstoreButton.svg?react";

import Button from "@/components/ui/Button";

const ICONS = [SettingsIcon, AppstoreIcon, AppIcon, MailIcon, PhoneIcon];
const INFINITE_ICONS = [...ICONS, ...ICONS];
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=kr.cookeep.app";

interface InstallGuideProps {
  onFinish: () => void;
}

export default function InstallGuide({ onFinish }: InstallGuideProps) {
  const navigate = useNavigate();

  const handlePlayStoreClick = () => {
    window.open(PLAY_STORE_URL, "_blank");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center gap-39 px-4">
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
              <MainLogo
                aria-label="CooKeep Logo"
                role="img"
                className="h-7 w-full"
              />
              <h1 className="typo-h2">홈 화면에서 편하게 만나보세요!</h1>
            </div>
            <p className="typo-l-strong text-green-deep w-full text-center">
              더 쉽고 빠르게 서비스를 이용할 수 있어요
            </p>
          </div>
          {/* 가이드 영역 */}
          <div className="flex w-full flex-col items-center gap-[30px]">
            {/* 아이콘 롤링 영역 */}
            <div className="overflow- relative -mx-4 flex hidden w-screen max-w-[450px] items-center justify-center px-4 py-1">
              {/* 화면 좌측 끝 흰 그라데이션 블러 */}
              <div className="from-background bg- gradient-to-r pointer-events-none absolute top-0 left-0 z-20 h-full w-14 to-transparent" />

              {/* 글래스모피즘 테두리 컨테이너 */}
              <div
                className="w-full overflow-hidden py-3"
                style={{
                  borderRadius: "15.556px",
                  border: "0.972px solid rgba(255, 255, 255, 0.40)",
                  background:
                    "linear-gradient(129deg, rgba(255, 255, 255, 0.08) 1.91%, rgba(255, 255, 255, 0.43) 68.31%)",
                  backdropFilter: "blur(39.1764030456543px)",
                  WebkitBackdropFilter: "blur(39.1764030456543px)",
                }}
              >
                <div className="animate-roll-left flex gap-[13.5px] pr-[13.5px]">
                  {INFINITE_ICONS.map((Icon, index) => (
                    <Icon key={index} className="h-19 w-19 shrink-0" />
                  ))}
                </div>
              </div>

              {/* 화면 우측 끝 흰 그라데이션 블러 */}
              <div className="from-background bg- gradient-to-l pointer-events-none absolute top-0 right-0 z-20 h-full w-14 to-transparent" />
            </div>

            {/* 플레이스토어 버튼 영역 */}
            <div className="flex w-full flex-col items-center gap-3">
              <button
                type="button"
                onClick={handlePlayStoreClick}
                className="flex h-10 w-30 cursor-pointer items-center justify-center transition-transform active:scale-95"
                style={{
                  borderRadius: "6px",
                  background: "#FFF",
                  boxShadow: "0 4px 16px 0 rgba(17, 17, 17, 0.10)",
                  backdropFilter: "blur(1px)",
                  WebkitBackdropFilter: "blur(1px)",
                }}
                aria-label="Google Play에서 CooKeep 앱 설치하기"
              >
                <PlaystoreButton className="h-[72px] w-[152px] shrink-0" />
              </button>
              <p className="typo-m text-center text-gray-50">
                클릭 시 앱 설치 화면으로 이동해요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 설명 영역 ================= */}
      <div className="flex w-full flex-col items-center gap-3 self-stretch text-center text-gray-50">
        <p className="typo-m-strong">설치 없이 바로 시작하고 싶다면?</p>
        <p className="typo-m">Google Chrome 우측 상단 메뉴 [홈 화면에 추가]</p>
      </div>

      {/* ================= 하단 버튼 ================= */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[450px] -translate-x-1/2 px-4">
        <Button size="L" variant="green" onClick={onFinish}>
          확인
        </Button>
      </div>
    </div>
  );
}
