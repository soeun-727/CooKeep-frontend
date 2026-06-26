// src/components/settings/components/AgreementReadCard.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgreementItem } from "../../../constants/agreements";

interface Props {
  agreement: AgreementItem;
  notice?: React.ReactNode;
}

export default function AgreementReadCard({ agreement, notice }: Props) {
  return (
    <div className="w-full bg-gray-0 border border-[#D1D1D1] rounded-[6px] overflow-hidden">
      {/* 상단 제목 */}
      <div className="p-3 h-[48px] flex items-center">
        <span className="text-sm font-medium">{agreement.label}</span>
      </div>

      <div className="mx-auto w-[calc(100%-24px)] border-t border-gray-30" />

      {/* 약관 내용 */}
      <div className="p-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="typo-body2 text-gray-80 mt-2 mb-2">{children}</h2>
            ),
            p: ({ children }) => (
              <p className="typo-body2 text-gray-50 mb-[6px]">{children}</p>
            ),
            li: ({ children }) => (
              <li className="typo-body2 text-gray-50 ml-4 list-disc">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="typo-body2 font-medium text-semantic-negative">
                {children}
              </strong>
            ),
            table: ({ children }) => (
              <div className="my-4 overflow-x-auto">
                <table className="border border-[#D1D1D1] border-collapse bg-gray-0">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="typo-caption text-gray-50 px-3 py-1 border">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="typo-caption text-gray-50 px-3 py-1 border">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a href={href} className="underline typo-body2 text-gray-50">
                {children}
              </a>
            ),
          }}
        >
          {agreement.content}
        </ReactMarkdown>

        {/* 공고일자 / 시행일자 */}
        {notice && (
          <div className="mt-[18px] typo-label text-center whitespace-pre-line">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
