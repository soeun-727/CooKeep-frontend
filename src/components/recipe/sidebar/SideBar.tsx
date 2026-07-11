import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { AiRecipeSessionItem } from "@/api/aiSession";
import { useRecipeStore } from "@/stores/useRecipeStore";

import { SearchIcon } from "@/assets/index";
import XIcon from "@/assets/recipe/select/x.svg?react";

import DoublecheckModal from "@/components/ui/DoublecheckModal";
import TextField from "@/components/ui/TextField";

import Recipe from "./Recipe";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const {
    pinned,
    sessions,
    fetchSessions,
    isLoading,
    error,
    toggleLike,
    renameRecipe,
    deleteSession,
  } = useRecipeStore();
  const [isVisible, setIsVisible] = useState(isOpen);
  const [shouldAnimateOpen, setShouldAnimateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const translateClasses = shouldAnimateOpen
    ? "translate-x-0"
    : "-translate-x-full";

  const handleConfirmDelete = async () => {
    if (selectedRecipe) {
      try {
        await deleteSession(selectedRecipe.id);

        if (window.location.pathname.includes(String(selectedRecipe.id))) {
          navigate("/recipe");
        }
        setIsDeleteModalOpen(false);
        setSelectedRecipe(null);
      } catch (err) {
        setIsDeleteModalOpen(false);
        setIsErrorModalOpen(true);
      }
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    if (!isOpen) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setShouldAnimateOpen(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShouldAnimateOpen(false);
      setTimeout(() => {
        setShouldAnimateOpen(true);
      }, 0);
    }
  }, [isOpen]);

  const renderRecipeList = (list: AiRecipeSessionItem[], isLiked: boolean) => (
    <div className="flex w-full flex-col items-center">
      {list
        .filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map(item => {
          const isCurrentActive = window.location.pathname.includes(
            String(item.sessionId),
          );
          return (
            <Recipe
              key={item.sessionId}
              isLiked={isLiked}
              name={item.title}
              searchTerm={searchTerm}
              isActive={isCurrentActive}
              onLike={() => toggleLike(item.sessionId)}
              onRename={newTitle => renameRecipe(item.sessionId, newTitle)}
              onDelete={() => {
                setSelectedRecipe({ id: item.sessionId, name: item.title });
                setIsDeleteModalOpen(true);
              }}
              onSelect={() => {
                onClose();
                navigate(`/recipe/result/${item.sessionId}`);
              }}
            />
          );
        })}
    </div>
  );

  if (!isVisible) return null;
  const portalTarget = document.getElementById("sidebar-portal");

  if (!portalTarget) {
    console.warn("HTML에 #sidebar-portal 엘리먼트가 존재하지 않습니다.");
    return null;
  }

  return createPortal(
    <>
      {/* 1. 배경 오버레이 */}
      <div
        className={`bg-black-overlay fixed inset-0 z-[50] ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* 2. 사이드바 본체 */}
      <div className="shadow-container pointer-events-none fixed inset-0 z-[50] flex justify-center">
        <div className="relative h-full w-full max-w-[450px] overflow-hidden">
          <div
            className={`rounded-tr-L rounded-br-L bg-gray-0 pointer-events-auto absolute left-0 h-full w-80 transform transition-transform duration-300 ease-in-out ${translateClasses}`}
          >
            <div className="no-scrollbar flex h-full flex-1 flex-col gap-6 overflow-y-auto px-4 py-15">
              {/* 콘텐츠 영역 */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between px-1">
                  <p className="typo-h3 text-gray-80">레시피 기록</p>
                  <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-end"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className={`bg-gray-10 focus-within:bg-gray-0 [&_input]:text-gray-80 rounded-M [&_input]:border-gray-10 [&_input]:bg-transparent [&_input]:outline-none [&_input::placeholder]:text-gray-50 [&_p]:hidden`}
                >
                  <TextField
                    value={searchTerm}
                    placeholder="레시피를 검색하세요"
                    onChange={value => setSearchTerm(value)}
                    rightIcon={<SearchIcon className="h-6 w-6 text-gray-50" />}
                  />
                </div>
              </div>

              <div className="mt-2 flex w-full flex-col items-center">
                {isLoading && (
                  <div className="py-4 text-center text-sm text-gray-400">
                    불러오는 중...
                  </div>
                )}

                {error && (
                  <div className="py-4 text-center text-sm text-red-400">
                    {error}
                  </div>
                )}

                {pinned.length + sessions.length > 0 ? (
                  <div className="flex w-full flex-col justify-start">
                    <p className="typo-l-strong px-1">찜한 레시피</p>
                    {pinned.length > 0 && renderRecipeList(pinned, true)}

                    {pinned.length > 0 && sessions.length > 0 && (
                      <div className="h-6" />
                    )}
                    <p className="typo-l-strong px-1">다른 레시피</p>
                    {sessions.length > 0 && renderRecipeList(sessions, false)}
                  </div>
                ) : (
                  <div className="py-20 text-center text-sm text-gray-400">
                    저장된 레시피가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 삭제 확인 모달 연결 */}
      <DoublecheckModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={selectedRecipe?.name ?? ""}
        description="이 레시피를 삭제할까요?"
      />
      <div className="!font-medium whitespace-pre-wrap">
        <DoublecheckModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          onConfirm={() => setIsDeleteModalOpen(false)}
          title={
            <span className="block leading-relaxed font-medium">
              요리 기록이 있는 레시피는
              <br />
              삭제할 수 없어요
            </span>
          }
          variant="singular"
          confirmText="확인"
        />
      </div>
    </>,
    portalTarget,
  );
}
