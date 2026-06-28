// src/pages/settings/components/NoticeCategoryItem.tsx
import { useState } from "react";
import NoticeItem from "./NoticeItem";
import arrowIcon from "../../../assets/signup/arrowright.svg";
import { Notice } from "../../../types/notice";

type Props = {
  category: Notice;
};

export default function NoticeCategoryItem({ category }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-col items-start self-stretch w-full rounded-[6px] border border-gray-10 ${
        open ? "bg-gray-10" : "bg-gray-0"
      }`}
    >
      {/* 헤더 */}
      <div
        className={`flex w-full items-center justify-between px-[12px] cursor-pointer ${
          open ? "pt-[12px] pb-[6px]" : "py-[12px]"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p
          className={`typo-label ${open ? "text-green-deep" : "text-gray-80"}`}
        >
          {category.title}
        </p>
        <img
          src={arrowIcon}
          alt="공지사항 열기 화살표"
          className={`w-[24px] h-[24px] transition-transform ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {/* 내용 */}
      {open && (
        <div className="flex w-full flex-col gap-[14px] px-[12px] pb-[12px]">
          <NoticeItem title={category.title} content={category.content} />
        </div>
      )}
    </div>
  );
}
