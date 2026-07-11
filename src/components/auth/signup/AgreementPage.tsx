// components/auth/signup/AgreementPage.tsx (or 기존 경로)
import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import BlankCheck from "@/assets/signup/blankCheck.svg?react";
import CheckboxCheckIcon from "@/assets/signup/checkboxCheck.svg?react";

import BackHeader from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

import type { AgreementItem, AuthAgreements } from "@/types/auth";
import { splitAgreementSections } from "@/utils/splitAgreementSections";

interface AgreementPageProps {
  agreement: AgreementItem;
  isChecked: boolean;
  onBack: () => void;
  onConfirm: (key: AgreementItem["key"]) => void;
  updateAgreements: (next: Partial<AuthAgreements>) => void;
  children?: React.ReactNode;
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="typo-m-strong text-gray-80">{children}</h2>
  ),
  p: ({ children }) => <p className="typo-m text-gray-50">{children}</p>,
  ul: ({ children }) => (
    <ul className="ml-2 list-disc marker:text-xs">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="typo-m list-decimal text-gray-50">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="typo-m ml-4 text-gray-50">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="typo-m text-semantic-negative font-medium">
      {children}
    </strong>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="border-gray-10 bg-gray-0 border-collapse border">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="typo-caption border px-3 py-1 text-gray-50">{children}</th>
  ),
  td: ({ children }) => (
    <td className="typo-caption border px-3 py-1 text-gray-50">{children}</td>
  ),
  a: ({ href, children }) => (
    <a href={href} className="typo-m text-gray-50 underline">
      {children}
    </a>
  ),
};

// 버튼 영역이 콘텐츠를 가리지 않도록 확보할 하단 여백
const BOTTOM_SAFE_PADDING = "pb-[114px]";

export default function AgreementPage({
  agreement,
  isChecked,
  onBack,
  onConfirm,
  updateAgreements,
  children,
}: AgreementPageProps) {
  const isPolicyOnly = agreement.key === "policy";
  const sections = splitAgreementSections(agreement.content);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col items-center overflow-hidden px-4">
      {/* 헤더 */}
      <BackHeader title="이용 약관" onBack={onBack} />

      {/* 카드 + notice가 함께 스크롤되는 영역 (버튼 아래로 이어짐) */}
      <div
        className={`no-scrollbar flex-1 overflow-y-auto pt-[52px] ${BOTTOM_SAFE_PADDING}`}
      >
        <div className="mx-auto flex w-full flex-col gap-3">
          {/* 약관 카드 */}
          <div className="border-gray-10 bg-gray-0 flex w-full flex-col rounded-[6px] border px-3">
            {/* 카드 상단 */}
            <div className="flex h-12 shrink-0 items-center gap-3 self-stretch rounded-xl py-3">
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
                  <BlankCheck
                    className="pointer-events-none z-0 block h-full w-full object-contain peer-checked:hidden"
                    aria-hidden="true"
                  />
                  <CheckboxCheckIcon
                    className="pointer-events-none z-0 hidden h-6 w-6 object-contain text-gray-50 peer-checked:block"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <span className="-ml-3 inline-block flex-shrink-0" />
              )}
              <span className="text-gray-80 typo-m-strong flex h-6 flex-1 flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap">
                {agreement.label}
              </span>
            </div>

            <div className="bg-gray-30 h-[1.5px] w-full shrink-0" />

            {/* 약관 전문 (카드 내부는 더 이상 스크롤하지 않음 - 페이지 전체가 스크롤) */}
            <div className="flex flex-col items-start gap-3 py-3">
              {sections.map((section, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-2 self-stretch"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {section}
                  </ReactMarkdown>
                </div>
              ))}

              {agreement.consentNotice && (
                <div className="flex flex-col items-start gap-2 self-stretch">
                  {agreement.consentNotice.split("\n\n").map((line, i) => (
                    <p
                      key={i}
                      className="typo-m-strong self-stretch text-gray-50"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* AgreementItem에 없는 추가 영역 */}
              {children && (
                <div className="typo-m text-gray-80 w-full text-center">
                  {children}
                </div>
              )}
            </div>
          </div>

          {/* notice: 카드 밖, 페이지 스크롤에 포함됨 */}
          {agreement.notice && (
            <div className="flex flex-col items-start gap-1 self-stretch">
              {agreement.notice.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="typo-m text-gray-80 self-stretch text-center"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
          {/* 하단 버튼: 콘텐츠 위에 얹혀서 스크롤 시 그라디언트로 자연스럽게 사라짐 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4">
            <div className="bg-bottom-fade pointer-events-auto flex w-full flex-col items-center pt-6 pb-[calc(32px+env(safe-area-inset-bottom))]">
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
    </div>
  );
}
