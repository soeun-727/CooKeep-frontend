import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateAgreements } from "@/api/onboarding";
import { registerPushNotification } from "@/api/push";

import shadow from "@/assets/character/char_shadow.svg";
import illustration from "@/assets/character/default_char.svg";

import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import AgreementList from "./AgreementList";

export default function SimpleLoginAgreement() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState<Record<string, boolean>>({
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
      <BackHeader title="약관 동의" onBack={() => navigate(-1)} />

      {/* 회원가입과 동일한 컨테이너 */}
      <div className="flex min-h-screen flex-col">
        <div className="mx-auto flex w-[361px] flex-1 flex-col justify-end pb-14">
          {/* 일러스트 */}
          <div className="flex flex-col gap-2">
            <img
              src={illustration}
              className="w-[75px]"
              alt="약관 동의 일러스트"
            />
            <img src={shadow} className="w-[75px]" />
          </div>

          {/* 타이틀 */}
          <h1 className="typo-h2 mt-[29.5px]">
            서비스 이용을 위해 <br />
            약관 동의가 필요해요
          </h1>

          {/* 약관 영역 */}
          <div className="flex items-center justify-center">
            <AgreementList
              agreements={agreements}
              updateAgreements={next =>
                setAgreements(prev => ({ ...prev, ...next }))
              }
            />
          </div>

          {/* 버튼 */}
          <div className="mt-[10px]">
            <Button
              size="L"
              variant="green"
              disabled={!(agreements.terms && agreements.privacy) || isLoading}
              onClick={handleStart}
              className="mt-[8px]"
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
