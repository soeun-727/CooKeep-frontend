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
    h-[56px]
    mx-auto max-w-[450px]
    flex items-center px-4
    ${transparent ? "bg-transparent" : "bg-[#FAFAFA]"}
  `}
      >
        {/* 사이드바 버튼 */}
        <button
          onClick={toggleSidebar}
          className="w-[36px] h-[36px] flex items-center justify-center"
        >
          <img src={menuIcon} className="w-full h-full object-contain" />
        </button>

        {/* 제목: title props가 있을 때만 렌더링 */}
        {title && (
          <h1 className="text-[16px] font-semibold text-[#202020]">{title}</h1>
        )}
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
