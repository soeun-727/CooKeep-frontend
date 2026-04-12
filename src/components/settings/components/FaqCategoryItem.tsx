// src/pages/settings/components/FaqCategoryItem.tsx
import { useState } from "react";
import type { FaqItem } from "../../../constants/faqData";
import FaqItemComponent from "./FaqItem";
import arrowIcon from "../../../assets/signup/arrowright.svg";

type Props = {
  title: string;
  items: FaqItem[];
  defaultOpen?: boolean;
};

export default function FaqCategoryItem({ title, items, defaultOpen }: Props) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div
      className={`flex flex-col items-start self-stretch w-full rounded-[6px] border border-[#D1D1D1] ${
        open ? "bg-[#ECECEC]" : "bg-white"
      }`}
    >
      {/* 카테고리 헤더 */}
      <div
        className={`flex w-full items-center justify-between px-[12px] cursor-pointer 
    ${open ? "pt-[12px] pb-[6px]" : "py-[12px]"}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p
          className={`typo-label ${open ? "text-[#1FC16F]" : "text-[#202020]"}`}
        >
          {title}
        </p>
        <img
          src={arrowIcon}
          alt="약관 보기 화살표"
          className={`w-[24px] h-[24px] transition-transform ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {/* Q/A 리스트 */}
      {open && (
        <div className="flex w-full flex-col gap-[14px] px-[12px] pb-[12px]">
          {items.map((item) => (
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
