import { useState } from "react";

import MenuIcon from "@/assets/recipe/main/menu.svg?react";

import Sidebar from "../sidebar/SideBar";

interface RecipeHeaderProps {
  title?: string;
  transparent?: boolean;
}

export default function RecipeHeader({
  title,
  transparent = false,
}: RecipeHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 mx-auto flex h-10 max-w-[450px] items-center px-4 py-2 ${transparent ? "bg-transparent" : "bg-background"} `}
      >
        {/* 사이드바 버튼 */}
        <button
          onClick={toggleSidebar}
          className="flex h-10 items-center justify-center"
        >
          <MenuIcon className="h-full w-full" />
        </button>

        {title && <h1 className="text-gray-80 typo-l-strong">{title}</h1>}
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
