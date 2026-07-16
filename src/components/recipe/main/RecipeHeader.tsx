import { useState } from "react";
import { useParams } from "react-router-dom";

import { useRecipeFlowStore } from "@/stores/useRecipeFlowStore";
import { useRecipeStore } from "@/stores/useRecipeStore";

import MenuIcon from "@/assets/recipe/main/menu.svg?react";
import HeartIcon from "@/assets/icons/heart.svg?react";

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
      <header
        className={`fixed top-0 right-0 left-0 z-50 mx-auto flex h-10 w-full max-w-[450px] items-center justify-between px-4 py-2 ${transparent ? "bg-transparent" : "bg-background"} `}
      >
        {/* 왼쪽: 사이드바 버튼 */}
        <button
          onClick={toggleSidebar}
          className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center"
        >
          <MenuIcon width={40} height={40} />
        </button>

        {/* 중앙: 타이틀 */}
        {title && (
          <div className="pointer-events-none flex items-center justify-center">
            <h1 className="text-gray-80 typo-l-strong whitespace-nowrap">
              {title}
            </h1>
          </div>
        )}

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
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
