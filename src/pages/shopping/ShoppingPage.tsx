import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShoppingBanner from "@/components/shopping/ShoppingBanner";
import ShoppingHeader from "@/components/shopping/ShoppingHeader";
import ShoppingIntro from "@/components/shopping/ShoppingIntro";
import ShoppingProductSection from "@/components/shopping/ShoppingProductSection";
import ShoppingSearchBar from "@/components/shopping/ShoppingSearchBar";

import type { ShoppingMainData, ShoppingSectionData } from "@/types/shopping";

const initialIngredients = [
  "오이",
  "양파",
  "브로콜리",
  "당근",
  "토마토",
  "대파",
].map(name => ({ id: name, name }));

const initialSections: ShoppingSectionData[] = [
  { id: "vegetables", title: "채소" },
  { id: "meat", title: "육류" },
  { id: "dairy-eggs", title: "유제품, 계란" },
  { id: "ready-meals", title: "즉석, 간편식" },
].map(section => ({
  ...section,
  ingredients: initialIngredients,
  products: [],
}));

interface ShoppingPageProps {
  data?: ShoppingMainData;
}

export default function ShoppingPage({ data }: ShoppingPageProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendationIndex] = useState(() => Math.random());
  const recommendations = data?.recommendations ?? [];
  const recommendation =
    recommendations[Math.floor(recommendationIndex * recommendations.length)];
  const sections = data?.sections ?? initialSections;

  return (
    <main className="bg-gray-0 text-gray-80 pb-sab min-h-dvh w-full min-w-0">
      <div className="flex flex-col gap-3 pt-[env(safe-area-inset-top,0px)]">
        <ShoppingHeader />
        <ShoppingSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={() =>
            navigate(
              `/shopping/search?q=${encodeURIComponent(searchTerm.trim())}`,
            )
          }
        />
      </div>
      <div className="mt-4">
        <ShoppingIntro />
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <ShoppingProductSection
          section={{
            id: "weekly",
            title: "이번 주 추천 재료",
            ingredients: [],
            products: recommendation?.products ?? [],
          }}
          heading={
            recommendation ? (
              <span className="leading-7">
                이번 주는{" "}
                <span className="text-green-deep">
                  {recommendation.ingredient.name}
                </span>
                을 활용해 볼까요?
              </span>
            ) : (
              <span className="leading-7">
                이번 주는 어떤 재료를 활용해 볼까요?
              </span>
            )
          }
        />
        <ShoppingBanner size="small" data={data?.banners[0]} />
        {sections.map((section, index) => (
          <Fragment key={section.id}>
            <ShoppingProductSection section={section} />
            {index === 1 && (
              <ShoppingBanner size="medium" data={data?.banners[1]} />
            )}
          </Fragment>
        ))}
        <ShoppingBanner size="large" data={data?.banners[2]} />
      </div>
    </main>
  );
}
