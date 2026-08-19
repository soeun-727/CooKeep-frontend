import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgreementItem } from "@/types/auth";
import { splitAgreementSections } from "@/utils/splitAgreementSections";

interface AgreementReadCardProps {
  agreement: AgreementItem;
  notice?: React.ReactNode;
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
    <div className="my-1 w-full">
      <table className="border-gray-10 w-full table-fixed border-collapse border">
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th className="typo-caption border-gray-10 border px-[6px] py-[5px] text-center font-normal text-gray-50">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="typo-caption border-gray-10 border px-[6px] py-[5px] text-center text-gray-50">
      {children}
    </td>
  ),
  a: ({ href, children }) => (
    <a href={href} className="typo-m text-gray-50 underline">
      {children}
    </a>
  ),
};

export default function AgreementReadCard({
  agreement,
}: AgreementReadCardProps) {
  const sections = splitAgreementSections(agreement.content);

  return (
    <div className="border-gray-10 bg-gray-0 flex flex-col items-start self-stretch rounded-[6px] border px-3">
      <div className="rounded-M flex h-12 items-center gap-3 self-stretch py-3">
        <span className="text-gray-80 typo-m-strong flex h-6 flex-1 flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap">
          {agreement.label.replace(/\s*\((필수|선택)\)$/, "")}
        </span>
      </div>

      <div className="bg-gray-30 h-[1.5px] w-full" />

      <div className="flex flex-col items-start gap-3 self-stretch py-3">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col items-start gap-2 self-stretch">
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
              <p key={i} className="typo-m-strong self-stretch text-gray-50">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
