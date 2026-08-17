import { useState } from "react";

import ArrowIcon from "@/assets/signup/arrowright.svg?react";

import type { FaqItem } from "@/constants/faqData";

import FaqItemComponent from "./FaqItem";

interface FaqCategoryItemProps {
  title: string;
  items: FaqItem[];
  defaultOpen?: boolean;
}

export default function FaqCategoryItem({
  title,
  items,
  defaultOpen,
}: FaqCategoryItemProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div
      className={`border-gray-10 flex w-full flex-col items-start self-stretch rounded-xl border px-3 ${
        open ? "bg-gray-10" : "bg-gray-0"
      }`}
    >
      {/* 카테고리 헤더 */}
      <div
        onClick={() => setOpen(prev => !prev)}
        className={`flex h-12 w-full cursor-pointer items-center justify-between ${open ? "py-3" : "py-3"} `}
      >
        <p
          className={
            open ? "typo-m-strong text-green-deep" : "typo-m text-gray-80"
          }
        >
          {title}
        </p>
        <ArrowIcon
          className={`h-6 w-6 transition-transform ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {/* Q/A 리스트 */}
      {open && (
        <>
          <div className="bg-gray-30 h-[1.5px] w-full" />

          <div className="flex w-full flex-col gap-3 py-3">
            {items.map(item => (
              <FaqItemComponent
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
