import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

import installGuideImage from "../../../assets/onboarding/installGuideImage.png";
import mainLogo from "../../../assets/logos/mainLogo.svg";
import appleIcon from "../../../assets/onboarding/appleinc.svg";
import androidIcon from "../../../assets/onboarding/android.svg";

interface InstallGuideProps {
  onFinish: () => void;
}

export default function InstallGuide({ onFinish }: InstallGuideProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center">
      <div className=" flex flex-col items-center relative">
        {/* ================= 이미지 + 그라데이션 ================= */}
        <div className="relative max-w-[484px] h-[312px] w-full flex justify-center">
          <img
            src={installGuideImage}
            alt="Install Guide"
            className="max-w-[449px] w-full max-h-[300px] h-full"
            style={{ aspectRatio: "223 / 149" }}
          />

          {/* 하단 그라데이션 오버레이 */}
          <div
            className="absolute bottom-0 max-w-[449px] w-full max-h-[58px] h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 6.45%, #FAFAFA 76.21%)",
            }}
          />
        </div>

        {/* ================= 상단 (로고 + 제목 + 소제목) ================= */}
        <div className="mt-[31px] flex flex-col items-center gap-[10px] w-full">
          <div className="flex flex-col items-center gap-[2px] w-full">
            <img
              src={mainLogo}
              alt="CooKeep Logo"
              className="w-[148.81px] h-[28px]"
            />

            <h1 className="typo-result-title">
              홈 화면에서 편하게 만나보세요!
            </h1>
          </div>

          <p className="w-full text-center typo-button text-[var(--color-green-deep)]">
            더 쉽고 빠르게 서비스를 이용할 수 있어요
          </p>
        </div>

        {/* ================= 설명 영역 ================= */}
        <div className="mt-[27px] w-[362px] flex flex-col items-start gap-[7px]">
          {/* iOS */}
          <div className="flex flex-col items-center gap-[4px] self-stretch px-[14px] py-[10px] bg-white rounded-[6px]">
            {/* 내용 영역 */}
            <div className="flex flex-col items-center gap-[10px] self-stretch">
              {/* 아이콘 */}
              <img
                src={appleIcon}
                alt="apple"
                className="w-[24px] h-[24px] aspect-square"
              />

              {/* 텍스트 영역 */}
              <div className="flex flex-col items-start gap-[4px] self-stretch">
                <p className="typo-body text-[#202020] text-center self-stretch font-semibold">
                  iOS 사용자는 Safari에서 열어주세요
                </p>

                <p className="text-[12px] font-medium leading-[20px] text-[#202020] text-center self-stretch">
                  Safari 공유 버튼 → ‘홈 화면에 추가’
                </p>
              </div>
            </div>
          </div>

          {/* Android */}
          <div className="flex flex-col items-start gap-[4px] self-stretch px-[14px] py-[10px] bg-white rounded-[6px]">
            {/* 내용 영역 */}
            <div className="flex flex-col items-center gap-[10px] self-stretch">
              {/* 아이콘 */}
              <img
                src={androidIcon}
                alt="android"
                className="w-[24px] h-[24px] aspect-square"
              />

              {/* 텍스트 영역 */}
              <div className="flex flex-col items-start gap-[4px] self-stretch">
                <p className="text-[16px] font-semibold leading-[20px] text-[#202020] text-center self-stretch">
                  Android 사용자는 Chrome을 추천드려요
                </p>

                <p className="text-[12px] font-medium leading-[20px] text-[#202020] text-center self-stretch">
                  우측 상단 메뉴 → ‘홈 화면에 추가’
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 하단 버튼 ================= */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
          <div className="w-[361px] flex flex-col items-center gap-[8px]">
            <Button size="S" variant="green" onClick={onFinish}>
              확인
            </Button>

            <button
              onClick={() =>
                navigate("/settings/faq", {
                  state: { openCategoryId: 4 },
                })
              }
              className="typo-caption text-[#7D7D7D] underline"
            >
              자세한 설명 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
