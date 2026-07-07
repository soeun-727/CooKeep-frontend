import { useNavigate } from "react-router-dom";

import Image from "@/assets/settings/cs.svg?react";

import BackHeader from "@/components/ui/BackHeader";

export default function SupportPage() {
  const navigate = useNavigate();
  const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

  const handleOpenKakao = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* 헤더 */}
      <BackHeader title="고객센터" onBack={() => navigate(-1)} />

      <main className="flex min-h-screen flex-col px-4 pt-[100px] pb-8">
        <div className="flex flex-col gap-6">
          <section>
            <div className="flex flex-col gap-2 px-1">
              <h2 className="typo-h2 text-gray-80">무엇을 도와드릴까요?</h2>

              <p className="typo-m text-gray-80">
                아래 카카오톡 채널로 문의사항을 전송해 주시면
                <br />
                순차적으로 확인 후 안내드릴게요
              </p>
            </div>
          </section>
          <Image className="h-36 w-full" />
          {/* 이메일 버튼 */}
          <button
            onClick={handleOpenKakao}
            className="bg-gray-80 typo-l-strong text-gray-0 flex h-11 items-center justify-center self-stretch rounded-xl"
          >
            채널 문의 바로가기
          </button>
        </div>

        {/* 운영 시간 안내 */}
        <p className="typo-caption-strong mt-auto text-center text-gray-50">
          운영 시간: 평일 10:00–18:00 (주말·공휴일 제외)
          <br />
          영업일 기준 2–3일 이내에 답변드려요
        </p>
      </main>
    </>
  );
}
