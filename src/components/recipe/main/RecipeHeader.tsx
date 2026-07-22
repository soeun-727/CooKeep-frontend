import { useState } from "react";
import { useParams } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { useRecipeStore } from "@/stores/useRecipeStore";

import BackIcon from "@/assets/back.svg?react";
import MenuIcon from "@/assets/recipe/main/menu.svg?react";
import HeartIcon from "@/assets/icons/heart.svg?react";

import Sidebar from "../sidebar/SideBar";

interface RecipeHeaderProps {
  title?: string;
  transparent?: boolean;
}

export default function RecipeHeader({ title }: RecipeHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { sessionId: paramSessionId } = useParams();
  const { sessionId: flowSessionId } = useRecipeFlowStore();
  const { pinned, toggleLike } = useRecipeStore();
  const currentSessionId = paramSessionId
    ? Number(paramSessionId)
    : flowSessionId;
  const isLiked = pinned.some(p => p.sessionId === currentSessionId);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleToggleLike = async () => {
    if (currentSessionId) {
      await toggleLike(currentSessionId);
    }
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 mx-auto flex h-10 w-full max-w-[450px] items-center justify-between px-4 py-2">
        {title && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h1 className="typo-l-strong text-gray-80 whitespace-nowrap">
              {title}
            </h1>
          </div>
        )}

        {/* 왼쪽: 사이드바 버튼 */}
        <button
          onClick={toggleSidebar}
          className="z-10 flex h-10 w-10 cursor-pointer items-center justify-start"
        >
          <BackIcon width={21} height={20} />
        </button>

        <div className="flex">
          {currentSessionId && (
            <button
              onClick={handleToggleLike}
              className="z-10 flex h-10 w-10 cursor-pointer items-center justify-end"
            >
              <HeartIcon
                width={24}
                height={21}
                className={`stroke-gray-10 fill-current ${
                  isLiked ? "text-gray-30" : "text-transparent"
                }`}
              />
            </button>
          )}
          <button
            onClick={toggleSidebar}
            className="z-10 flex h-10 w-10 cursor-pointer items-center justify-end"
          >
            <MenuIcon width={22} height={22} />
          </button>
        </div>
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
