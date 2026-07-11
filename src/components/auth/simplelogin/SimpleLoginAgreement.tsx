import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateAgreements } from "@/api/onboarding";
import { registerPushNotification } from "@/api/push";

import Shadow from "@/assets/character/char_shadow.svg?react";
import Character from "@/assets/character/default_char.svg?react";

import BackHeader from "@/components/ui/BackHeader";
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
    <>
      <BackHeader title="간편로그인" onBack={() => navigate(-1)} />

      {/* 회원가입과 동일한 컨테이너 */}
      <div className="bg-background relative flex min-h-dvh flex-col pt-10">
        {/* 본문 */}
        <main className="flex flex-1 flex-col px-4">
          {/* 일러스트 */}
          <div className="flex flex-col gap-2 pt-[120px]">
            <Character className="h-[60px] w-[75px]" />
            <Shadow className="h-[11px] w-[75px]" />
          </div>

          {/* 타이틀 */}
          <div className="flex w-full flex-col items-start gap-4 px-1 py-2">
            <h1 className="typo-h2 text-gray-80">
              서비스 이용을 위해
              <br />
              약관 동의가 필요해요
            </h1>
          </div>

          {/* 약관 영역 */}
          <div className="mt-auto flex flex-col">
            <AgreementList
              agreements={agreements}
              updateAgreements={next =>
                setAgreements(prev => ({ ...prev, ...next }))
              }
            />

            {/* 하단 버튼 */}
            <div className="bg-blur-to-t pt-8 pb-6">
              <Button
                size="L"
                variant="green"
                disabled={
                  !(agreements.terms && agreements.privacy) || isLoading
                }
                onClick={handleStart}
              >
                시작하기
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
