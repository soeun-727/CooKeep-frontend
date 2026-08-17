import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  MyRecipeDetail,
  deleteDailyRecipe,
  getMyRecipeDetail,
  updateDailyRecipe,
  updateRecipeVisibility,
} from "@/api/myRecipe";

import ConfirmModal from "@/components/fridge/modals/ConfirmModal";
import { CookingTipsSection } from "@/components/myCookeep/record/CookingTipsSection";
import PhotoRewardModal from "@/components/myCookeep/record/PhotoRewardModal";
import RecordImageContent from "@/components/myCookeep/record/RecordImageContent";
import { VisibleChangeSection } from "@/components/myCookeep/record/VisibleChangeSection";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import RecipeOptionMenu from "@/components/ui/OptionsMenu";
import { RecipeInfoDetail } from "@/components/ui/RecipeInfoDetail";

import { compressAndUploadImage } from "@/utils/imageUpload";

export default function RecordDetailPage() {
  const navigate = useNavigate();
  const { recordId } = useParams();

  const [record, setRecord] = useState<MyRecipeDetail | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(
    undefined,
  );
  const [pendingImageFile, setPendingImageFile] = useState<File | undefined>(
    undefined,
  );
  const [tempIsPublic, setTempIsPublic] = useState<boolean>(false);
  const [showPhotoRewardModal, setShowPhotoRewardModal] = useState(false);

  useEffect(() => {
    if (!recordId) return;
    const fetchDetail = async () => {
      try {
        const response = await getMyRecipeDetail(Number(recordId));
        if (response.status === "OK") {
          setRecord(response.data);
          setTempTitle(response.data.title);
          setTempDescription(response.data.description || "");
          setCurrentImageUrl(response.data.recipeImageUrl || undefined);
          setTempIsPublic(response.data.isPublic);
        }
      } catch (error) {
        console.error("레시피 상세 조회 실패:", error);
      }
    };
    fetchDetail();
  }, [recordId]);

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await deleteDailyRecipe(Number(recordId));
      if (response.status === "OK") {
        navigate("/mycookeep", { replace: true });
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateClick = () => {
    const imageChanged =
      currentImageUrl !== (record?.recipeImageUrl || undefined);
    const visibilityChanged = tempIsPublic !== record?.isPublic;
    if (
      tempTitle === record?.title &&
      tempDescription === (record?.description || "") &&
      !imageChanged &&
      !visibilityChanged
    ) {
      setIsEditing(false);
      return;
    }
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!record || !recordId) return;
    try {
      const imageUrl = pendingImageFile
        ? await compressAndUploadImage(pendingImageFile)
        : currentImageUrl;

      const wasImageDeleted = !imageUrl && !!record.recipeImageUrl;
      const isImageChanged = imageUrl && imageUrl !== record.recipeImageUrl;

      const response = await updateDailyRecipe(Number(recordId), {
        title: tempTitle,
        description: tempDescription,
        ...(isImageChanged && { recipeImageUrl: imageUrl }),
        ...(wasImageDeleted && { deleteRecipeImage: true }),
      });
      if (tempIsPublic !== record.isPublic) {
        await updateRecipeVisibility(Number(recordId), tempIsPublic);
      }

      if (response.status === "OK") {
        setRecord({ ...response.data, isPublic: tempIsPublic });
        setCurrentImageUrl(response.data.recipeImageUrl || undefined);
        setPendingImageFile(undefined);
        setIsEditing(false);
        setIsUpdateModalOpen(false);

        if (response.data.photoCookieAwarded === true) {
          setShowPhotoRewardModal(true);
        }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message =
        err?.response?.data?.message ||
        (error instanceof Error ? error.message : "수정에 실패했습니다.");
      alert(message);
    }
  };

  const handleImageFileSelect = (file: File) => {
    setCurrentImageUrl(URL.createObjectURL(file));
    setPendingImageFile(file);
  };

  if (!record) return null;

  return (
    <div className="mb-20 flex w-full flex-col">
      <div className="relative">
        <BackHeader />
        <div className="absolute top-2 right-0 flex items-center">
          <RecipeOptionMenu
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <RecordImageContent
          imageSrc={currentImageUrl}
          onImageChange={handleImageFileSelect}
          editMode={isEditing}
        />

        <div className="flex flex-col gap-6">
          <RecipeTitle
            name={record.title}
            category=""
            usedItems={record.content.ingredients.user_ingredients.length}
            editMode={isEditing}
            onNameChange={setTempTitle}
          />
          <div className="flex flex-col gap-3">
            <CookingTipsSection
              cookingTips={
                isEditing ? tempDescription : record.description || ""
              }
              onChangeCookingTips={isEditing ? setTempDescription : undefined}
              readOnly={!isEditing}
            />
            <RecipeInfoDetail
              selectedIngredients={record.content.ingredients.user_ingredients}
              requiredIngredients={
                record.content.ingredients.additional_ingredients
              }
              substitutions={record.content.ingredients.optional_ingredients}
              steps={record.content.steps.map((step, idx) => ({
                order: idx + 1,
                description: step.content,
              }))}
              difficulty="NORMAL"
              youtubeVideos={record.content.youtubeReferences}
              youtubeTags={record.content.youtubeSearchQueries ?? []}
            />
            {isEditing && (
              <VisibleChangeSection
                isPublic={tempIsPublic}
                onChange={setTempIsPublic}
              />
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed bottom-0 mx-auto w-full max-w-[450px] pt-6">
          <Button size="L" variant="black" onClick={handleUpdateClick}>
            수정 완료
          </Button>
        </div>
      )}

      {showPhotoRewardModal && (
        <PhotoRewardModal
          onConfirm={() => {
            setShowPhotoRewardModal(false);
          }}
        />
      )}

      {isUpdateModalOpen && (
        <ConfirmModal
          title="수정이 완료되었어요"
          buttonTexts={["확인"]}
          onConfirm={handleConfirmUpdate}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmModal
          title="이 레시피를 삭제할까요?"
          subtitle={tempTitle}
          buttonTexts={["네", "아니오"]}
          buttonVariants={["gray", "black"]}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
