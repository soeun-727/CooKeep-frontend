import { type ReactNode, useState } from "react";

import type { ShoppingSectionData } from "@/types/shopping";

import ShoppingCategoryTabs from "./ShoppingCategoryTabs";
import ShoppingProductCard from "./ShoppingProductCard";

interface ShoppingProductSectionProps {
  section: ShoppingSectionData;
  heading?: ReactNode;
}

export default function ShoppingProductSection({
  section,
  heading,
}: ShoppingProductSectionProps) {
  const [selectedId, setSelectedId] = useState(section.ingredients[0]?.id);
  const activeId = section.ingredients.some(item => item.id === selectedId)
    ? selectedId
    : section.ingredients[0]?.id;
  const products = activeId
    ? section.products.filter(product => product.ingredientId === activeId)
    : section.products;

  return (
    <section className="w-full min-w-0" aria-label={section.title}>
      <h2 className="text-gray-80 px-4 py-2 text-[18px] leading-6 font-bold">
        {heading ?? section.title}
      </h2>
      {section.ingredients.length > 0 && (
        <ShoppingCategoryTabs
          ingredients={section.ingredients}
          selectedId={activeId}
          onSelect={setSelectedId}
        />
      )}
      <div className="relative">
        <div
          aria-label={`${section.title} 상품 목록`}
          tabIndex={products.length > 0 ? 0 : undefined}
          className="flex min-h-[200px] w-full overflow-x-auto overscroll-x-contain [scrollbar-color:var(--color-gray-30)_transparent] [scrollbar-width:thin]"
        >
          {products.map(product => (
            <ShoppingProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length > 0 && (
          <div
            aria-hidden="true"
            className="from-gray-0/0 to-gray-0 pointer-events-none absolute top-0 right-0 h-[200px] w-12 bg-gradient-to-r"
          />
        )}
      </div>
    </section>
  );
}
