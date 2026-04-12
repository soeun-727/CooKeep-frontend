// src/pages/settings/TermsPage.tsx
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import { AGREEMENT_NOTICE, AGREEMENTS } from "../../constants/agreements";
import AgreementReadCard from "../../components/settings/components/AgreementReadCard";

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100dvh]">
      <BackHeader title="이용약관" onBack={() => navigate(-1)} />

      {/* 전체 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-[75px]">
        <div className="flex flex-col gap-[24px] max-w-[361px] mx-auto pb-[34px]">
          {AGREEMENTS.map((agreement) => (
            <AgreementReadCard
              key={agreement.key}
              agreement={agreement}
              notice={AGREEMENT_NOTICE[agreement.key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
