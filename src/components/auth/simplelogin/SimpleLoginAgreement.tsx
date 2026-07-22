import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateAgreements } from "@/api/onboarding";
import { registerPushNotification } from "@/api/push";

import Shadow from "@/assets/character/char_shadow.svg?react";
import Character from "@/assets/character/default_char.svg?react";

import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import { AuthAgreements } from "@/types/auth";

import AgreementList from "./AgreementList";

export default function SimpleLoginAgreement() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState<AuthAgreements>({
    terms: false,
    privacy: false,
    marketing: false,
    policy: true,
  });

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await updateAgreements(agreements.marketing);
      if (agreements.marketing) {
        await registerPushNotification();
      }

      navigate("/onboarding");
    } catch (error) {
      console.error("약관 동의 저장 실패:", error);
      alert("설정 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 헤더 + 본문을 하나로 감싸고, px-4 / gap-10을 여기서 적용
    <div className="bg-background relative flex min-h-dvh flex-col gap-10 px-4 pt-10">
      <BackHeader title="간편로그인" onBack={() => navigate(-1)} />

      <main className="flex flex-1 flex-col">
        {/* 일러스트 + 타이틀: flex-1로 감싸서 아래 영역이 자동으로 하단에 붙게 함 */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2 pt-[120px]">
            <Character className="h-[60px] w-[75px]" />
            <Shadow className="h-[11px] w-[75px]" />
          </div>

          <h1 className="typo-h2 text-gray-80">
            서비스 이용을 위해
            <br />
            약관 동의가 필요해요
          </h1>
        </div>

        {/* 약관 + 버튼: gap-4로 간격 처리, 개별 padding 제거 */}
        <div className="flex flex-col gap-4">
          <AgreementList
            agreements={agreements}
            updateAgreements={next =>
              setAgreements(prev => ({ ...prev, ...next }))
            }
          />

          <div className="bg-blur-to-t pb-[34px]">
            <Button
              size="L"
              variant="green"
              disabled={!(agreements.terms && agreements.privacy) || isLoading}
              onClick={handleStart}
            >
              시작하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
