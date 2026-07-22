import { useLocation } from "react-router-dom";

import FaqCategoryItem from "@/components/settings/components/FaqCategoryItem";
import { BackHeader } from "@/components/ui/BackHeader";

import { faqCategories } from "@/constants/faqData";

export default function FaqPage() {
  const location = useLocation();
  const openCategoryId = location.state?.openCategoryId;

  return (
    <>
      <BackHeader title="자주 하는 질문 (FAQ)" />
      <main className="flex flex-col gap-3 px-4 pt-[52px] pb-12">
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
