// src/components/settings/components/AgreementReadCard.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgreementItem } from "@/constants/agreements";

interface AgreementReadCardProps {
  agreement: AgreementItem;
  notice?: React.ReactNode;
}

export default function AgreementReadCard({
  agreement,
  notice,
}: AgreementReadCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-[6px] border border-[#D1D1D1] bg-white">
      {/* 상단 제목 */}
      <div className="flex h-[48px] items-center p-3">
        <span className="text-sm font-medium">{agreement.label}</span>
      </div>

      <div className="mx-auto w-[calc(100%-24px)] border-t border-[#C3C3C3]" />

      {/* 약관 내용 */}
      <div className="p-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="typo-body2 mt-2 mb-2 text-[#202020]">
                {children}
              </h2>
            ),
            p: ({ children }) => (
              <p className="typo-body2 mb-[6px] text-[#7D7D7D]">{children}</p>
            ),
            li: ({ children }) => (
              <li className="typo-body2 ml-4 list-disc text-[#7D7D7D]">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="typo-body2 font-medium text-[#D91F1F]">
                {children}
              </strong>
            ),
            table: ({ children }) => (
              <div className="my-4 overflow-x-auto">
                <table className="border-collapse border border-[#D1D1D1] bg-white">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="typo-caption border px-3 py-1 text-[#7D7D7D]">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="typo-caption border px-3 py-1 text-[#7D7D7D]">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a href={href} className="typo-body2 text-[#7D7D7D] underline">
                {children}
              </a>
            ),
          }}
        >
          {agreement.content}
        </ReactMarkdown>

        {/* 공고일자 / 시행일자 */}
        {notice && (
          <div className="typo-label mt-[18px] text-center whitespace-pre-line">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
