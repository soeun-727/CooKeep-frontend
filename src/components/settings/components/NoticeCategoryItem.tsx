import { useState } from "react";

import ArrowIcon from "@/assets/signup/arrowright.svg?react";

import { Notice } from "@/types/notice";

import NoticeItem from "./NoticeItem";

interface NoticeCategoryItemProps {
  category: Notice;
}

export default function NoticeCategoryItem({
  category,
}: NoticeCategoryItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-gray-10 flex flex-col self-stretch rounded-xl border px-3 ${
        open ? "bg-gray-10" : "bg-gray-0"
      }`}
    >
      {/* 헤더 */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex h-12 cursor-pointer items-center gap-5 ${
          open ? "py-3" : ""
        }`}
      >
        <p
          className={`flex-1 truncate ${
            open ? "typo-m-strong text-green-deep" : "typo-m text-gray-80"
          }`}
        >
          {category.title}
        </p>
        <ArrowIcon
          className={`h-6 w-6 transition-transform ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {/* 내용 */}
      {open && (
        <>
          <div className="bg-gray-30 h-[1.5px] w-full" />
          <div className="flex w-full flex-col gap-3 py-3">
            <NoticeItem notice={category} />
          </div>
        </>
      )}
    </div>
  );
}
