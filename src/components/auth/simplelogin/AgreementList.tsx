import { useState } from "react";
import { AGREEMENTS, AGREEMENT_NOTICE } from "@/constants/agreements";
import arrowIcon from "@/assets/signup/arrowright.svg";
import type { AgreementItem } from "@/constants/agreements";
import AgreementPage from "../signup/AgreementPage";

interface AgreementListProps {
  agreements: Record<AgreementItem["key"], boolean>;
  updateAgreements: (
    next: Partial<Record<AgreementItem["key"], boolean>>,
  ) => void;
}

export default function AgreementList({
  agreements,
  updateAgreements,
}: AgreementListProps) {
  const [agreementPage, setAgreementPage] = useState<AgreementItem | null>(
    null,
  );

  const isAllChecked =
    agreements.terms && agreements.privacy && agreements.marketing;

  if (agreementPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
        <div className="min-h-[100dvh] w-full max-w-[450px] bg-[#FAFAFA]">
          {" "}
          {/*overflow-y-auto*/}
          <AgreementPage
            agreement={agreementPage}
            isChecked={agreements[agreementPage.key]}
            onBack={() => setAgreementPage(null)}
            updateAgreements={updateAgreements}
            onConfirm={(key) => {
              updateAgreements({ [key]: true });
              setAgreementPage(null);
            }}
          >
            <p className="typo-label text-center whitespace-pre-line">
              {AGREEMENT_NOTICE[agreementPage.key]}
            </p>
          </AgreementPage>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[26px]">
      {/* 전체 동의 */}
      <label className="relative flex h-[48px] w-full max-w-[361px] cursor-pointer items-center rounded-[6px] border border-[#D1D1D1] px-4">
        <input
          type="checkbox"
          className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-[#7D7D7D] checked:bg-(--color-green)"
          checked={isAllChecked}
          onChange={(e) =>
            updateAgreements({
              terms: e.target.checked,
              privacy: e.target.checked,
              marketing: e.target.checked,
            })
          }
        />
        <span className="typo-label ml-[16px] text-[#202020]">
          약관 전체동의
        </span>
        <span className="pointer-events-none invisible absolute left-4 flex h-4 w-4 items-center justify-center text-lg font-bold text-white peer-checked:visible">
          ✓
        </span>
      </label>

      {/* 개별 약관 */}
      <div className="flex h-[138px] w-[361px] flex-col gap-[6px] px-4 py-3">
        {AGREEMENTS.map((item) => (
          <div
            key={item.key}
            className="mx-auto flex h-[24px] w-[337px] items-center justify-between"
          >
            <label className="flex cursor-pointer items-center gap-4">
              {item.key !== "policy" ? (
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#7D7D7D]"
                  checked={agreements[item.key]}
                  onChange={(e) =>
                    updateAgreements({ [item.key]: e.target.checked })
                  }
                />
              ) : (
                <span className="inline-block h-4 w-4" />
              )}

              <span className="typo-label text-[#7D7D7D]">{item.label}</span>
            </label>

            <button type="button" onClick={() => setAgreementPage(item)}>
              <img src={arrowIcon} alt="약관 보기 화살표" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
