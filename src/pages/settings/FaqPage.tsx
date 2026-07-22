import { useLocation } from "react-router-dom";

import FaqCategoryItem from "@/components/settings/components/FaqCategoryItem";
import { BackHeader } from "@/components/ui/BackHeader";

import { faqCategories } from "@/constants/faqData";

export default function FaqPage() {
  const location = useLocation();
  const openCategoryId = location.state?.openCategoryId;

  return (
    <>
      <BackHeader title="FAQ" />
      <main className="flex flex-col gap-[14px] px-4 pt-[75px] pb-[50px]">
        {faqCategories.map(category => (
          <FaqCategoryItem
            key={category.id}
            title={category.title}
            items={category.items}
            defaultOpen={category.id === openCategoryId}
          />
        ))}
      </main>
    </>
  );
}
