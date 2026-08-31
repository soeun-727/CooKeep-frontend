import { useState } from "react";

import ArrowIcon from "@/assets/signup/arrowright.svg?react";
import BlankCheck from "@/assets/signup/blankCheck.svg?react";
import CheckboxCheckIcon from "@/assets/signup/checkboxCheck.svg?react";

import { AGREEMENTS } from "@/constants/agreements";

import { AgreementItem, AuthAgreements } from "@/types/auth";

import AgreementPage from "../signup/AgreementPage";

interface AgreementListProps {
  agreements: AuthAgreements;
  updateAgreements: (next: Partial<AuthAgreements>) => void;
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
      <div className="bg-background absolute inset-0 z-50 flex w-full flex-col">
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
        ></AgreementPage>
      </div>
    );
  }

  return (
    <div className="mt-[26px] w-full">
      {/* 전체 동의 */}
      <label className="border-gray-10 flex h-12 w-full items-center gap-3 rounded-xl border bg-white px-3">
        <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={e =>
              updateAgreements({
                terms: e.target.checked,
                privacy: e.target.checked,
                marketing: e.target.checked,
              })
            }
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none"
          />

          <BlankCheck className="pointer-events-none h-6 w-6 peer-checked:hidden" />

          <CheckboxCheckIcon className="text-green pointer-events-none hidden h-6 w-6 peer-checked:block" />
        </div>
        <span className="typo-m-strong text-gray-80 flex-1">약관 전체동의</span>
      </label>

      {/* 개별 약관 */}
      <div className="mt-4 flex w-full flex-col gap-1">
        {AGREEMENTS.map(item => (
          <div
            key={item.key}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2"
          >
            <label className="flex cursor-pointer items-center gap-4">
              {item.key !== "policy" ? (
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={agreements[item.key]}
                    onChange={e =>
                      updateAgreements({ [item.key]: e.target.checked })
                    }
                    className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none"
                  />

                  <BlankCheck className="pointer-events-none h-6 w-6 peer-checked:hidden" />

                  <CheckboxCheckIcon className="pointer-events-none hidden h-6 w-6 text-gray-50 peer-checked:block" />
                </div>
              ) : (
                <span className="inline-block h-6 w-6" />
              )}

              <span className="typo-m flex-1 text-gray-50">{item.label}</span>
            </label>

            <button type="button" onClick={() => setAgreementPage(item)}>
              <ArrowIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
