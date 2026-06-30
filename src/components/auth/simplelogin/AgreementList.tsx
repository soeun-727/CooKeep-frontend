import { useState } from "react";

import arrowIcon from "@/assets/signup/arrowright.svg";

import { AGREEMENTS, AGREEMENT_NOTICE } from "@/constants/agreements";
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
      <div className="fixed inset-0 z-50 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-[450px] min-h-[100dvh] bg-background">
          {" "}
          {/*overflow-y-auto*/}
          <AgreementPage
            agreement={agreementPage}
            isChecked={agreements[agreementPage.key]}
            onBack={() => setAgreementPage(null)}
            updateAgreements={updateAgreements}
            onConfirm={key => {
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
      <label className="relative flex items-center px-4 h-[48px] max-w-[361px] w-full rounded-[6px] border border-gray-10 cursor-pointer">
        <input
          type="checkbox"
          className="peer w-4 h-4 appearance-none border border-gray-50 rounded-sm checked:bg-green cursor-pointer"
          checked={isAllChecked}
          onChange={e =>
            updateAgreements({
              terms: e.target.checked,
              privacy: e.target.checked,
              marketing: e.target.checked,
            })
          }
        />
        <span className="ml-[16px] typo-label text-gray-80">약관 전체동의</span>
        <span className="absolute left-4 w-4 h-4 flex items-center justify-center pointer-events-none text-gray-0 text-lg font-bold peer-checked:visible invisible">
          ✓
        </span>
      </label>

      {/* 개별 약관 */}
      <div className="flex h-[138px] w-[361px] flex-col gap-[6px] px-4 py-3">
        {AGREEMENTS.map(item => (
          <div
            key={item.key}
            className="mx-auto flex h-[24px] w-[337px] items-center justify-between"
          >
            <label className="flex cursor-pointer items-center gap-4">
              {item.key !== "policy" ? (
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-50"
                  checked={agreements[item.key]}
                  onChange={e =>
                    updateAgreements({ [item.key]: e.target.checked })
                  }
                />
              ) : (
                <span className="inline-block h-4 w-4" />
              )}

              <span className="typo-label text-gray-50">{item.label}</span>
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
