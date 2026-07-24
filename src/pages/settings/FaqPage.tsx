import { useLocation } from "react-router-dom";

import FaqCategoryItem from "@/components/settings/components/FaqCategoryItem";
import { BackHeader } from "@/components/ui/BackHeader";

import { faqCategories } from "@/constants/faqData";

export default function FaqPage() {
  const location = useLocation();
  const openCategoryId = location.state?.openCategoryId;

  return (
    <>
      <main className="flex h-full flex-col px-4">
        <BackHeader title="자주 하는 질문 (FAQ)" />

        <div className="no-scrollbar flex-1 overflow-y-auto pb-12">
          <div className="flex flex-col gap-3 pt-3">
            {faqCategories.map(category => (
              <FaqCategoryItem
                key={category.id}
                title={category.title}
                items={category.items}
                defaultOpen={category.id === openCategoryId}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
