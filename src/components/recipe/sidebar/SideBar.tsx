import React, { useEffect, useState, useLayoutEffect } from "react";
import Recipe from "./Recipe";
import DoublecheckModal from "../../ui/DoublecheckModal";
import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/recipe/search.svg";
import { useRecipeStore } from "../../../stores/useRecipeStore";
import { useNavigate } from "react-router-dom";
import { AiRecipeSessionItem } from "../../../api/aiSession";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
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
    <div className="flex flex-col items-center w-full">
      {list
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map((item) => (
          <Recipe
            key={item.sessionId}
            isLiked={isLiked}
            name={item.title}
            searchTerm={searchTerm}
            onLike={() => toggleLike(item.sessionId)}
            onRename={(newTitle) => renameRecipe(item.sessionId, newTitle)}
            onDelete={() => {
              // 삭제 버튼 클릭 시 모달 오픈 및 데이터 세팅
              setSelectedRecipe({ id: item.sessionId, name: item.title });
              setIsDeleteModalOpen(true);
            }}
            onSelect={() => {
              onClose();
              navigate(`/recipe/result/${item.sessionId}`);
            }}
          />
        ))}
    </div>
  );

  if (!isVisible) return null;
  return (
    <>
      {/* 1. 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-[120] bg-[#11111160]
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* 2. 사이드바 본체 */}
      <div className="fixed inset-0 flex justify-center z-[130] pointer-events-none">
        <div className="relative w-full max-w-[450px] h-full overflow-hidden">
          <div
            className={`absolute left-0 top-[22px] pointer-events-auto
              w-[342px] h-[calc(100%-78px)] bg-[#FFFFFFE3] shadow-2xl rounded-tr-[10px] rounded-br-[10px]
              transform transition-transform duration-300 ease-in-out
              ${translateClasses}`}
          >
            <div className="flex flex-col h-full">
              {/* 콘텐츠 영역 */}
              <div className="flex-1 overflow-y-auto py-[35px] px-[26px] no-scrollbar">
                <div className="w-[290px]">
                  <div
                    className={`
    rounded-[6px]
    bg-white
    shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
    
    [&_>_div]:!w-full
    [&_p]:hidden
    
    [&_input]:outline-none
    [&_input]:border-none
    [&_input]:bg-white
    
    [&_input]:text-[#C3C3C3]
    [&_input]:text-[14px]
    [&_input]:font-medium
    [&_input]:leading-[20px]
    
    [&_input::placeholder]:text-[#C3C3C3]
  `}
                  >
                    <TextField
                      value={searchTerm}
                      placeholder="레시피를 검색하세요"
                      onChange={(value) => setSearchTerm(value)}
                      rightIcon={<img src={searchIcon} className="" />}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mt-2">
                  {isLoading && (
                    <div className="text-center py-4 text-sm text-gray-400">
                      불러오는 중...
                    </div>
                  )}

                  {error && (
                    <div className="text-center py-4 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  {pinned.length + sessions.length > 0 ? (
                    <>
                      {pinned.length > 0 && renderRecipeList(pinned, true)}

                      {pinned.length > 0 && sessions.length > 0 && (
                        <div className="h-6" />
                      )}

                      {sessions.length > 0 && renderRecipeList(sessions, false)}
                    </>
                  ) : (
                    <div className="text-center py-20 text-gray-400 text-sm">
                      저장된 레시피가 없습니다.
                    </div>
                  )}
                </div>
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
      <div className="whitespace-pre-wrap !font-medium">
        <DoublecheckModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          onConfirm={() => setIsDeleteModalOpen(false)}
          title={
            <span className="block font-medium leading-relaxed">
              요리 기록이 있는 레시피는
              <br />
              삭제할 수 없어요
            </span>
          }
          variant="singular"
          confirmText="확인"
        />
      </div>
    </>
  );
};

export default Sidebar;
