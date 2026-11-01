import NoResultView from "@/components/fridge/items/NoResultView";

export default function ShoppingEmptyState() {
  return (
    <div
      role="status"
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4"
    >
      <NoResultView
        className="flex flex-col items-center gap-4"
        imageClassName="h-[92px] w-[92px]"
        messageClassName="typo-m text-gray-50"
      />
    </div>
  );
}
