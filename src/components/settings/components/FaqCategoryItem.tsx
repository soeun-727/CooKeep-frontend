// src/pages/settings/components/FaqCategoryItem.tsx
import { useState } from "react";

import arrowIcon from "@/assets/signup/arrowright.svg";

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
      className={`flex flex-col items-start self-stretch w-full rounded-[6px] border border-gray-10 ${
        open ? "bg-gray-10" : "bg-gray-0"
      }`}
    >
      {/* 카테고리 헤더 */}
      <div
        className={`flex w-full cursor-pointer items-center justify-between px-[12px] ${open ? "pt-[12px] pb-[6px]" : "py-[12px]"}`}
        onClick={() => setOpen(prev => !prev)}
      >
        <p
          className={`typo-label ${open ? "text-green-deep" : "text-gray-80"}`}
        >
          {title}
        </p>
        <img
          src={arrowIcon}
          alt="약관 보기 화살표"
          className={`h-[24px] w-[24px] transition-transform ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {/* Q/A 리스트 */}
      {open && (
        <div className="flex w-full flex-col gap-[14px] px-[12px] pb-[12px]">
          {items.map(item => (
            <FaqItemComponent
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
