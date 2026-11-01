import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ShoppingEmptyState from "@/components/shopping/ShoppingEmptyState";
import ShoppingProductCard from "@/components/shopping/ShoppingProductCard";
import ShoppingSearchBar from "@/components/shopping/ShoppingSearchBar";
import { BackHeader } from "@/components/ui/BackHeader";

import type { ShoppingProduct } from "@/types/shopping";

type SortOrder = "default" | "price-asc" | "price-desc";

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "default", label: "기본순" },
  { value: "price-asc", label: "낮은 가격순" },
  { value: "price-desc", label: "높은 가격순" },
];

interface ShoppingSearchPageProps {
  products?: ShoppingProduct[];
}

export default function ShoppingSearchPage({
  products = [],
}: ShoppingSearchPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [input, setInput] = useState<{ query: string; value: string } | null>(
    null,
  );
  const searchTerm = input?.query === query ? input.value : query;
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const matches = query
    ? products.filter(product =>
        product.name
          .toLocaleLowerCase("ko-KR")
          .includes(query.toLocaleLowerCase("ko-KR")),
      )
    : [];
  const sortedProducts = [...matches].sort((a, b) => {
    if (sortOrder === "default") return 0;
    if (a.price === undefined) return b.price === undefined ? 0 : 1;
    if (b.price === undefined) return -1;
    return sortOrder === "price-asc" ? a.price - b.price : b.price - a.price;
  });

  const submitSearch = () => {
    const value = searchTerm.trim();
    if (!value) return;
    setSearchParams({ q: value });
    setInput(null);
    setIsSortOpen(false);
  };

  return (
    <main className="bg-gray-0 text-gray-80 pb-sab relative flex min-h-dvh w-full flex-col pt-[env(safe-area-inset-top,0px)]">
      <div className="relative px-4">
        <BackHeader
          onBack={() => navigate("/shopping")}
          sortIcon
          onSortClick={() => setIsSortOpen(value => !value)}
        />
        {isSortOpen && (
          <>
            <button
              type="button"
              aria-label="정렬 메뉴 닫기"
              onClick={() => setIsSortOpen(false)}
              className="fixed inset-0 z-10 cursor-default"
            />
            <div
              role="group"
              aria-label="상품 정렬"
              className="bg-gray-0 border-gray-10 shadow-container rounded-M absolute top-full right-4 z-20 min-w-32 overflow-hidden border py-2"
            >
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={sortOrder === option.value}
                  onClick={() => {
                    setSortOrder(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`typo-m block w-full px-4 py-2 text-left ${sortOrder === option.value ? "text-green-deep" : "text-gray-80"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-3">
        <ShoppingSearchBar
          value={searchTerm}
          onChange={value => setInput({ query, value })}
          onSubmit={submitSearch}
          showClearButton
        />
      </div>
      {sortedProducts.length > 0 ? (
        <div
          aria-label="장보기 검색 결과"
          className="mt-6 grid grid-cols-2 px-4"
        >
          {sortedProducts.map(product => (
            <ShoppingProductCard
              key={product.id}
              product={product}
              layout="grid"
            />
          ))}
        </div>
      ) : query ? (
        <ShoppingEmptyState />
      ) : null}
    </main>
  );
}
