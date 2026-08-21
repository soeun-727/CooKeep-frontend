import { useNavigate } from "react-router-dom";

import MainLogo from "@/assets/logos/mainLogo.svg?react";
import SettingsIcon from "@/assets/onboarding/settingsIcon.svg?react";
import AppstoreIcon from "@/assets/onboarding/appstoreIcon.svg?react";
import AppIcon from "@/assets/onboarding/appIcon.svg?react";
import MailIcon from "@/assets/onboarding/mailIcon.svg?react";
import PhoneIcon from "@/assets/onboarding/phoneIcon.svg?react";

import Button from "@/components/ui/Button";

const ICONS = [SettingsIcon, AppstoreIcon, AppIcon, MailIcon, PhoneIcon];
const INFINITE_ICONS = [...ICONS, ...ICONS];

interface InstallGuideProps {
  onFinish: () => void;
}

export default function InstallGuide({ onFinish }: InstallGuideProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center gap-[178px] px-4">
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
          <div className="relative -mx-4 flex w-screen max-w-[450px] items-center justify-center overflow-hidden py-1">
            {/* 화면 좌측 끝 흰 그라데이션 블러 */}
            <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-full w-14 bg-gradient-to-r to-transparent" />

            {/* 글래스모피즘 테두리 컨테이너 (iOS 디자인 스펙) */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: "15.556px",
                padding: "11.667px 13.611px",
                border: "0.972px solid transparent",
                // 배경 그라데이션 + 테두리 그라데이션 결합
                background: `
        linear-gradient(129deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.71) 100%) padding-box,
        linear-gradient(to bottom right, rgba(255, 255, 255, 0.40), rgba(244, 176, 255, 0.76)) border-box
      `,
                backdropFilter: "blur(39.1764px)",
                WebkitBackdropFilter: "blur(39.1764px)",
              }}
            >
              <div className="animate-roll-left flex gap-[13.61px] pr-[13.61px]">
                {INFINITE_ICONS.map((Icon, index) => (
                  <Icon key={index} className="h-19 w-19 shrink-0" />
                ))}
              </div>
            </div>

            {/* 화면 우측 끝 흰 그라데이션 블러 */}
            <div className="from-background pointer-events-none absolute top-0 right-0 z-20 h-full w-14 bg-gradient-to-l to-transparent" />
          </div>
        </div>
      </div>

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
      <div className="fixed bottom-0 left-1/2 w-full max-w-[450px] -translate-x-1/2 px-4">
        <Button size="L" variant="green" onClick={onFinish}>
          확인
        </Button>
      </div>
    </div>
  );
}
