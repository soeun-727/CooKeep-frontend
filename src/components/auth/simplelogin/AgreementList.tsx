import { useState } from "react";
import { AGREEMENTS, AGREEMENT_NOTICE } from "../../../constants/agreements";
import arrowIcon from "../../../assets/signup/arrowright.svg";
import type { AgreementItem } from "../../../constants/agreements";
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
        <div className="w-full max-w-[450px] min-h-[100dvh] bg-[#FAFAFA]">
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
      <label className="relative flex items-center px-4 h-[48px] max-w-[361px] w-full rounded-[6px] border border-[#D1D1D1] cursor-pointer">
        <input
          type="checkbox"
          className="peer w-4 h-4 appearance-none border border-[#7D7D7D] rounded-sm checked:bg-(--color-green) cursor-pointer"
          checked={isAllChecked}
          onChange={(e) =>
            updateAgreements({
              terms: e.target.checked,
              privacy: e.target.checked,
              marketing: e.target.checked,
            })
          }
        />
        <span className="ml-[16px] typo-label text-[#202020]">
          약관 전체동의
        </span>
        <span className="absolute left-4 w-4 h-4 flex items-center justify-center pointer-events-none text-white text-lg font-bold peer-checked:visible invisible">
          ✓
        </span>
      </label>

      {/* 개별 약관 */}
      <div className="w-[361px] h-[138px] px-4 py-3 flex flex-col gap-[6px]">
        {AGREEMENTS.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between w-[337px] h-[24px] mx-auto"
          >
            <label className="flex items-center gap-4 cursor-pointer">
              {item.key !== "policy" ? (
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#7D7D7D]"
                  checked={agreements[item.key]}
                  onChange={(e) =>
                    updateAgreements({ [item.key]: e.target.checked })
                  }
                />
              ) : (
                <span className="w-4 h-4 inline-block" />
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
