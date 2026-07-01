import { useNavigate } from "react-router-dom";

import mainLogo from "@/assets/logos/mainLogo.svg";
import androidIcon from "@/assets/onboarding/android.svg";
import appleIcon from "@/assets/onboarding/appleinc.svg";
import installGuideImage from "@/assets/onboarding/installGuideImage.png";

import Button from "@/components/ui/Button";

interface InstallGuideProps {
  onFinish: () => void;
}

export default function InstallGuide({ onFinish }: InstallGuideProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center">
      <div className="relative flex flex-col items-center">
        {/* ================= 이미지 + 그라데이션 ================= */}
        <div className="relative flex h-[312px] w-full max-w-[484px] justify-center">
          <img
            src={installGuideImage}
            alt="Install Guide"
            className="h-full max-h-[300px] w-full max-w-[449px]"
            style={{ aspectRatio: "223 / 149" }}
          />

          {/* 하단 그라데이션 오버레이 */}
          <div className="bg-fade-overlay absolute bottom-0 h-full max-h-[58px] w-full max-w-[449px]" />
        </div>

        {/* ================= 상단 (로고 + 제목 + 소제목) ================= */}
        <div className="mt-[31px] flex w-full flex-col items-center gap-[10px]">
          <div className="flex w-full flex-col items-center gap-[2px]">
            <img
              src={mainLogo}
              alt="CooKeep Logo"
              className="h-[28px] w-[148.81px]"
            />

            <h1 className="typo-result-title">
              홈 화면에서 편하게 만나보세요!
            </h1>
          </div>

          <p className="typo-button text-green-deep w-full text-center">
            더 쉽고 빠르게 서비스를 이용할 수 있어요
          </p>
        </div>

        {/* ================= 설명 영역 ================= */}
        <div className="mt-[27px] flex w-[362px] flex-col items-start gap-[7px]">
          {/* iOS */}
          <div className="bg-gray-0 flex flex-col items-center gap-[4px] self-stretch rounded-[6px] px-[14px] py-[10px]">
            {/* 내용 영역 */}
            <div className="flex flex-col items-center gap-[10px] self-stretch">
              {/* 아이콘 */}
              <img
                src={appleIcon}
                alt="apple"
                className="aspect-square h-[24px] w-[24px]"
              />

              {/* 텍스트 영역 */}
              <div className="flex flex-col items-start gap-[4px] self-stretch">
                <p className="typo-body text-gray-80 self-stretch text-center font-semibold">
                  iOS 사용자는 Safari에서 열어주세요
                </p>

                <p className="text-gray-80 self-stretch text-center text-[12px] leading-[20px] font-medium">
                  Safari 공유 버튼 → ‘홈 화면에 추가’
                </p>
              </div>
            </div>
          </div>

          {/* Android */}
          <div className="bg-gray-0 flex flex-col items-start gap-[4px] self-stretch rounded-[6px] px-[14px] py-[10px]">
            {/* 내용 영역 */}
            <div className="flex flex-col items-center gap-[10px] self-stretch">
              {/* 아이콘 */}
              <img
                src={androidIcon}
                alt="android"
                className="aspect-square h-[24px] w-[24px]"
              />

              {/* 텍스트 영역 */}
              <div className="flex flex-col items-start gap-[4px] self-stretch">
                <p className="text-gray-80 self-stretch text-center text-[16px] leading-[20px] font-semibold">
                  Android 사용자는 Chrome을 추천드려요
                </p>

                <p className="text-gray-80 self-stretch text-center text-[12px] leading-[20px] font-medium">
                  우측 상단 메뉴 → ‘홈 화면에 추가’
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 하단 버튼 ================= */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
          <div className="flex w-[361px] flex-col items-center gap-[8px]">
            <Button size="S" variant="green" onClick={onFinish}>
              확인
            </Button>

            <button
              onClick={() =>
                navigate("/settings/faq", {
                  state: { openCategoryId: 4 },
                })
              }
              className="typo-caption text-gray-50 underline"
            >
              자세한 설명 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
