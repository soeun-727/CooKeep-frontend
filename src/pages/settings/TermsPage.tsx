import AgreementReadCard from "@/components/settings/components/AgreementReadCard";
import { BackHeader } from "@/components/ui/BackHeader";

import { AGREEMENTS, AGREEMENT_NOTICE } from "@/constants/agreements";

export default function TermsPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <BackHeader title="이용약관" />

      {/* 전체 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pt-[75px] pb-6">
        <div className="mx-auto flex max-w-[361px] flex-col gap-[24px] pb-[34px]">
          {AGREEMENTS.map(agreement => (
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
