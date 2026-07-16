interface PagenationProps {
  currentPage: number;
  totalPage: number;
}

export default function RecipePagination({
  currentPage,
  totalPage,
}: PagenationProps) {
  return (
    <div className="bg-gray-0 typo-caption-strong text-gray-30 flex items-center gap-4 rounded-full px-6 py-1">
      <span>이전</span>
      <div className="gap-3">
        <img />
        <div className="typo-caption text-green-deep">
          <span>{currentPage}</span>
          <span>/</span>
          <span>{totalPage}</span>
        </div>
        <img />
      </div>
      <span>다음</span>
    </div>
  );
}
