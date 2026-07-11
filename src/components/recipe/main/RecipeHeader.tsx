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
        className={`fixed relative top-0 right-0 left-0 z-50 mx-auto flex h-10 w-full max-w-[450px] items-center px-4 py-2 ${transparent ? "bg-transparent" : "bg-background"} `}
      >
        <button
          onClick={toggleSidebar}
          className="relative z-10 flex h-10 cursor-pointer items-center justify-center"
        >
          <MenuIcon className="h-full w-full" />
        </button>

        {title && (
          <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <h1 className="text-gray-80 typo-l-strong whitespace-nowrap">
              {title}
            </h1>
          </div>
        )}
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
