import type { ShoppingProduct } from "@/types/shopping";

interface ShoppingProductCardProps {
  product: ShoppingProduct;
  layout?: "carousel" | "grid";
}

export default function ShoppingProductCard({
  product,
  layout = "carousel",
}: ShoppingProductCardProps) {
  return (
    <a
      href={product.landingUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`text-gray-80 flex min-h-[200px] min-w-0 shrink-0 flex-col gap-2 p-2 ${layout === "grid" ? "w-full" : "w-[150px]"}`}
    >
      <div className="flex h-[120px] items-center justify-center">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <p className="typo-m-strong line-clamp-2">{product.name}</p>
      {product.price !== undefined && (
        <p className="typo-m">{product.price.toLocaleString("ko-KR")}원</p>
      )}
    </a>
  );
}
