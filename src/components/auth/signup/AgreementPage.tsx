import React from "react";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { CheckboxCheckIcon, blankCheck } from "@/assets/index";

import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import type { AgreementItem, AuthAgreements } from "@/types/auth";

interface AgreementPageProps {
  agreement: AgreementItem;
  isChecked: boolean;
  onBack: () => void;
  onConfirm: (key: AgreementItem["key"]) => void;
  updateAgreements: (next: Partial<AuthAgreements>) => void;
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
    <div className="flex h-[100dvh] w-full flex-col items-center overflow-hidden px-4">
      {/* 헤더 */}
      <BackHeader title="이용 약관" onBack={onBack} />

      {/* 헤더 아래 고정 간격 */}
      <div className="h-[75px] shrink-0" />

      {/* 카드 + 버튼 영역 */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* 약관 카드 */}
        <div className="bg-gray-0 border-gray-10 mx-auto flex max-h-full w-full max-w-[361px] flex-col overflow-hidden rounded-[6px] border">
          {/* 카드 상단 */}
          <div className="flex h-[48px] shrink-0 items-center gap-[16px] p-3">
            {!isPolicyOnly ? (
              <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={e =>
                    updateAgreements({ [agreement.key]: e.target.checked })
                  }
                  className="peer absolute inset-0 z-10 h-full w-full cursor-default appearance-none"
                />
                <img
                  src={blankCheck}
                  alt="unchecked"
                  className="pointer-events-none z-0 block h-full w-full object-contain peer-checked:hidden"
                />
                <CheckboxCheckIcon className="pointer-events-none z-0 hidden h-4 w-4 object-contain text-gray-50 peer-checked:block" />
              </div>
            ) : (
              <span className="inline-block h-4 w-4" />
            )}
            <span className="text-sm font-medium">{agreement.label}</span>
          </div>

          <div className="border-gray-30 mx-auto w-[332px] border-t-[1.5px]" />

          {/* 약관 전문만 스크롤 */}
          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-3">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="typo-body2 text-gray-80 mt-2 mb-2">
                    {children}
                  </h2>
                ),

                p: ({ children }) => (
                  <p className="typo-body2 mb-[6px] text-gray-50">{children}</p>
                ),

                li: ({ children }) => (
                  <li className="typo-body2 ml-4 list-disc text-gray-50">
                    {children}
                  </li>
                ),

                strong: ({ children }) => (
                  <strong className="typo-body2 text-semantic-negative font-medium">
                    {children}
                  </strong>
                ),
                // table 부분 크기 고정시키면 이상하게 나와서 뺌 그래서 피그마랑 구조 다름
                table: ({ children }) => (
                  <div className="my-4">
                    <table className="border-gray-10 bg-gray-0 border-collapse border">
                      {children}
                    </table>
                  </div>
                ),

                tr: ({ children }) => <tr>{children}</tr>,

                th: ({ children }) => (
                  <th className="typo-caption border-gray-10 bg-gray-0 border px-[16.5px] py-[6px] text-center text-gray-50">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="typo-caption border-gray-10 bg-gray-0 border px-[16.5px] py-[6px] text-center text-gray-50">
                    {children}
                  </td>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="typo-body2 text-gray-50 underline">
                    {children}
                  </a>
                ),
              }}
            >
              {agreement.content}
            </ReactMarkdown>

            {/* AgreementItem에 없는 추가 영역 */}
            {children && (
              <div className="typo-label mt-[18px] text-center">{children}</div>
            )}
          </div>
        </div>

        {/* 하단 버튼 (safe-area 대응) */}
        <div className="mt-auto flex w-full justify-center pt-[11px] pb-[calc(32px+env(safe-area-inset-bottom))]">
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
