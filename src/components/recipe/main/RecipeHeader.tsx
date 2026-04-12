// components/recipe/main/RecipeHeader.tsx
import { useState } from "react";
import menuIcon from "../../../assets/recipe/main/menu.svg";
import Sidebar from "../sidebar/SideBar";

interface RecipeHeaderProps {
  title?: string; // 제목을 선택 사항으로 변경
  transparent?: boolean;
}

export default function RecipeHeader({
  title,
  transparent = false,
}: RecipeHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`
    fixed top-0 left-0 right-0 z-50
    mx-auto max-w-[450px]
    h-[56px]
    flex items-center
    px-4
    ${transparent ? "bg-transparent" : "bg-[#FAFAFA]"}
  `}
      >
        {/* 사이드바 버튼 */}
        <button
          className="absolute top-[2px] left-[10px] w-[36px] h-[36px]"
          onClick={toggleSidebar}
        >
          <img
            src={menuIcon}
            alt="메뉴 버튼"
            className="w-full h-full object-contain"
          />
        </button>

        {/* 제목: title props가 있을 때만 렌더링 */}
        {title && (
          <h1
            className="absolute left-1/2 -translate-x-1/2 text-[16px] leading-[24px] font-semibold text-[#202020]"
            style={{ top: "8px" }}
          >
            {title}
          </h1>
        )}
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
