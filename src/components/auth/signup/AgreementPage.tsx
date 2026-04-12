import React from "react";
import Button from "../../ui/Button";
import BackHeader from "../../ui/BackHeader";
import type { AgreementItem } from "../../../constants/agreements";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blankCheck, grayCheck } from "../../../assets";
interface Agreements {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  policy: boolean;
}
interface AgreementPageProps {
  agreement: AgreementItem;
  isChecked: boolean;
  onBack: () => void;
  onConfirm: (key: AgreementItem["key"]) => void;
  updateAgreements: (next: Partial<Agreements>) => void;
  children?: React.ReactNode;
}

export default function AgreementPage({
  agreement,
  isChecked,
  onBack,
  onConfirm,
  updateAgreements,
  children,
}: AgreementPageProps) {
  const isPolicyOnly = agreement.key === "policy";

  return (
    <div className="flex flex-col h-[100dvh] w-full px-4 overflow-hidden items-center">
      {/* 헤더 */}
      <BackHeader title="이용 약관" onBack={onBack} />

      {/* 헤더 아래 고정 간격 */}
      <div className="h-[75px] shrink-0" />

      {/* 카드 + 버튼 영역 */}
      <div className="flex-1 flex flex-col  min-h-0">
        {/* 약관 카드 */}
        <div className="w-full max-w-[361px] mx-auto bg-white border border-[#D1D1D1] rounded-[6px] flex flex-col overflow-hidden max-h-full">
          {/* 카드 상단 */}
          <div className="flex items-center gap-[16px] p-3 h-[48px] shrink-0">
            {!isPolicyOnly ? (
              <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    updateAgreements({ [agreement.key]: e.target.checked })
                  }
                  className="peer absolute inset-0 w-full h-full appearance-none cursor-default z-10"
                />
                <img
                  src={blankCheck}
                  alt="unchecked"
                  className="block peer-checked:hidden w-full h-full object-contain pointer-events-none z-0"
                />
                <img
                  src={grayCheck}
                  alt="checked"
                  className="hidden peer-checked:block w-4 h-4 object-contain pointer-events-none z-0"
                />
              </div>
            ) : (
              <span className="w-4 h-4 inline-block" />
            )}
            <span className="text-sm font-medium">{agreement.label}</span>
          </div>

          <div className="mx-auto w-[332px] border-t-[1.5px] border-[#C3C3C3]" />

          {/* 약관 전문만 스크롤 */}
          <div className="flex-1 overflow-y-auto p-3 min-h-0 no-scrollbar">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="typo-body2 text-[#202020] mt-2 mb-2">
                    {children}
                  </h2>
                ),

                p: ({ children }) => (
                  <p className="typo-body2 text-[#7D7D7D] mb-[6px]">
                    {children}
                  </p>
                ),

                li: ({ children }) => (
                  <li className="typo-body2 text-[#7D7D7D] ml-4 list-disc">
                    {children}
                  </li>
                ),

                strong: ({ children }) => (
                  <strong className="typo-body2 font-medium text-[#D91F1F]">
                    {children}
                  </strong>
                ),
                // table 부분 크기 고정시키면 이상하게 나와서 뺌 그래서 피그마랑 구조 다름
                table: ({ children }) => (
                  <div className="my-4">
                    <table className="border border-[#D1D1D1] border-collapse bg-white">
                      {children}
                    </table>
                  </div>
                ),

                tr: ({ children }) => <tr>{children}</tr>,

                th: ({ children }) => (
                  <th className="typo-caption text-[#7D7D7D] text-center px-[16.5px] py-[6px] border border-[#D1D1D1] bg-white">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="typo-caption text-[#7D7D7D] text-center px-[16.5px] py-[6px] border border-[#D1D1D1] bg-white">
                    {children}
                  </td>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="underline text-[#7D7D7D] typo-body2"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {agreement.content}
            </ReactMarkdown>

            {/* AgreementItem에 없는 추가 영역 */}
            {children && (
              <div className="mt-[18px] typo-label text-center">{children}</div>
            )}
          </div>
        </div>

        {/* 하단 버튼 (safe-area 대응) */}
        <div
          className="
    mt-auto
    pt-[11px]
    pb-[calc(32px+env(safe-area-inset-bottom))]
    w-full
    flex
    justify-center
  "
        >
          <div className="w-full max-w-[361px]">
            <Button
              size="L"
              variant="black"
              className="w-full"
              onClick={() => onConfirm(agreement.key)}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
