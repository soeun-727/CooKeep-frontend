// pages/settings/AgreementDetailPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import AgreementReadCard from "@/components/settings/components/AgreementReadCard";

import { AGREEMENTS } from "@/constants/agreements";
import type { AgreementItem } from "@/types/auth";
import { BackHeader } from "@/components/ui/BackHeader";

const PAGE_TITLE: Record<AgreementItem["key"], string> = {
  terms: "서비스 이용 약관",
  privacy: "개인정보 수집 및 이용 동의",
  marketing: "마케팅 활용 및 광고 수신 동의",
  policy: "개인정보 처리방침",
};

export default function AgreementDetailPage() {
  const navigate = useNavigate();
  const { agreementKey } = useParams<{ agreementKey: AgreementItem["key"] }>();
  const agreement = AGREEMENTS.find(a => a.key === agreementKey);

  if (!agreement || !agreementKey) return null;

  return (
    <div className="flex h-[100dvh] flex-col gap-3 px-4">
      <BackHeader
        title={PAGE_TITLE[agreementKey]}
        onBack={() => navigate(-1)}
      />
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[450px] flex-col gap-3 py-4 pb-[34px]">
          <AgreementReadCard agreement={agreement} />
          {agreement.notice && (
            <div className="flex flex-col items-start gap-2 self-stretch">
              {agreement.notice.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="typo-m text-gray-80 self-stretch text-center"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
