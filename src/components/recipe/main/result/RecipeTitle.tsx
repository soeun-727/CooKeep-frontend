import { useState } from "react";

import EditIcon from "@/assets/icons/rename.svg?react";

import { InputModal } from "@/components/fridge/modals/InputModal";

interface RecipeTitleProps {
  name: string;
  category?: string;
  usedItems: number;
  editMode?: boolean;
  onNameChange?: (name: string) => void;
}

export default function RecipeTitle({
  name,
  category,
  usedItems,
  editMode = false,
  onNameChange,
}: RecipeTitleProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [titleName, setTitleName] = useState(name);
  const [draftTitleName, setDraftTitleName] = useState(name);

  const openModalHandler = () => {
    setDraftTitleName(titleName);
    setModalOpen(true);
  };

  const confirmTitleHandler = (newTitle: string) => {
    setTitleName(newTitle);
    onNameChange?.(newTitle);
    setModalOpen(false);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-2 px-1">
      {category && (
        <span className="bg-green-light text-green-deep typo-caption rounded-S self-start px-3 py-[2px]">
          {category}
        </span>
      )}

      {/* 레시피 이름 */}
      <div className="flex gap-2">
        <h2 className="text-gray-80 typo-h2">{titleName}</h2>
        {editMode && (
          <button onClick={openModalHandler}>
            <EditIcon className="h-6 w-6 text-gray-50" />
          </button>
        )}
      </div>

      <p className="typo-l text-gray-50">
        보유한 재료 중 <span className="text-green-deep">{usedItems}개</span>를
        사용했어요!
      </p>
      {modalOpen && (
        <InputModal
          title="새로운 레시피명을 입력해주세요"
          placeholder="레시피명을 입력해주세요"
          value={draftTitleName}
          buttonTexts={["변경", "취소"]}
          onChange={setDraftTitleName}
          onConfirm={confirmTitleHandler}
          onClose={closeModalHandler}
        />
      )}
    </div>
  );
}
