// src/pages/settings/FaqPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import { faqCategories } from "../../constants/faqData";
import FaqCategoryItem from "../../components/settings/components/FaqCategoryItem";

export default function FaqPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const openCategoryId = location.state?.openCategoryId;

  return (
    <>
      <BackHeader title="FAQ" onBack={() => navigate(-1)} />
      <main className="pt-[75px] px-4 pb-[50px] flex flex-col gap-[14px]">
        {faqCategories.map((category) => (
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
