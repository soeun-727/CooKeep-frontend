import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { AiRecipeSessionItem } from "@/api/aiSession";
import { useRecipeStore } from "@/stores/useRecipeStore";

import XIcon from "@/assets/icons/x.svg?react";
import { SearchIcon } from "@/assets/index";

import ConfirmModal from "@/components/fridge/modals/ConfirmModal";
import { InputModal } from "@/components/fridge/modals/InputModal";
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
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [renameInput, setRenameInput] = useState("");

  const translateClasses = shouldAnimateOpen
    ? "translate-x-0"
    : "-translate-x-full";

  const handleConfirmDelete = async () => {
    if (!selectedRecipe) return;

    const recipeId = selectedRecipe.id;

    setIsDeleteModalOpen(false);
    setSelectedRecipe(null);

    try {
      await deleteSession(recipeId);

      if (window.location.pathname.includes(String(recipeId))) {
        navigate("/recipe");
      }
    } catch (err) {
      setIsErrorModalOpen(true);
    }
  };

  const handleConfirmRename = async () => {
    if (selectedRecipe && renameInput.trim()) {
      await renameRecipe(selectedRecipe.id, renameInput.trim());
      setIsRenameModalOpen(false);
      setSelectedRecipe(null);
      setRenameInput("");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    if (!isOpen) {
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
              onRename={() => {
                setSelectedRecipe({ id: item.sessionId, name: item.title });
                setRenameInput(item.title);
                setIsRenameModalOpen(true);
              }}
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

  const portalTarget = document.getElementById("sidebar-portal");

  return (
    <>
      {isVisible &&
        portalTarget &&
        createPortal(
          <>
            <div
              className={`bg-black-overlay fixed inset-0 z-[50] ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <div className="shadow-container pointer-events-none fixed inset-0 z-[50] flex justify-center">
              <div className="relative h-full w-full max-w-[450px] overflow-hidden">
                <div
                  className={`rounded-tr-L rounded-br-L bg-gray-0 pointer-events-auto absolute left-0 h-full w-80 transform transition-transform duration-300 ease-in-out ${translateClasses}`}
                >
                  <div className="no-scrollbar flex h-full flex-1 flex-col gap-6 overflow-y-auto px-4 py-[30px]">
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
                          rightIcon={
                            <SearchIcon className="h-6 w-6 text-gray-50" />
                          }
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
                          {pinned.length > 0 && sessions.length > 0}
                          <p className="typo-l-strong mt-6 px-1">다른 레시피</p>
                          {sessions.length > 0 &&
                            renderRecipeList(sessions, false)}
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
          </>,
          portalTarget,
        )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title="이 레시피를 삭제할까요?"
          subtitle={selectedRecipe?.name ?? ""}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isRenameModalOpen && (
        <InputModal
          title="새로운 레시피명을 입력해주세요"
          placeholder="레시피명을 입력해주세요"
          value={renameInput}
          onChange={setRenameInput}
          onConfirm={handleConfirmRename}
          onClose={() => {
            setIsRenameModalOpen(false);
            setSelectedRecipe(null);
            setRenameInput("");
          }}
          buttonTexts={["변경", "취소"]}
        />
      )}

      {isErrorModalOpen && (
        <ConfirmModal
          title="요리 기록이 있는 레시피는"
          subtitle="삭제할 수 없어요"
          onConfirm={() => setIsErrorModalOpen(false)}
          onCancel={() => setIsErrorModalOpen(false)}
          buttonTexts={["확인"]}
        />
      )}
    </>
  );
}
