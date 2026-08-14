import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  MyRecipeDetail,
  deleteDailyRecipe,
  getMyRecipeDetail,
  updateDailyRecipe,
  updateRecipeVisibility,
} from "@/api/myRecipe";

import privateIcon from "@/assets/mycookeep/record/private_icon.svg";
import publicIcon from "@/assets/mycookeep/record/public_icon.svg";

import { CookingTipsSection } from "@/components/myCookeep/record/CookingTipsSection";
import PhotoRewardModal from "@/components/myCookeep/record/PhotoRewardModal";
import RecordImageContent from "@/components/myCookeep/record/RecordImageContent";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import DoublecheckModal from "@/components/ui/DoublecheckModal";
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
    <div className="flex w-full flex-col">
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
          </div>
        </div>
      </div>

      {isEditing && (
        <>
          {/* 공개 여부 수정 컨트롤 */}
          <div className="mt-[32px] flex justify-center gap-[9px] pb-9">
            {/* 나만 보기 버튼 */}
            <button
              disabled={!isEditing}
              onClick={() => setTempIsPublic(false)}
              className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors ${tempIsPublic === false ? "bg-green-light" : "bg-gray-10"}`}
            >
              <div className="bg-gray-0 flex h-[36px] w-[36px] items-center justify-center rounded-full">
                <img src={privateIcon} className="w-[24px]" alt="private" />
              </div>
              <span className="typo-label text-gray-80">나만 보기</span>
            </button>

            {/* 쿠킵스 공개 버튼 */}
            <button
              disabled={!isEditing}
              onClick={() => setTempIsPublic(true)}
              className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors ${tempIsPublic === true ? "bg-green-light" : "bg-gray-10"}`}
            >
              <div className="bg-gray-0 flex h-[36px] w-[36px] items-center justify-center rounded-full">
                <img src={publicIcon} className="w-[36px]" alt="public" />
              </div>
              <span className="typo-label text-gray-80">쿠킵스 공개</span>
            </button>
          </div>
          <div className="mt-2 mb-2 flex">
            <Button
              size="L"
              variant="black"
              onClick={handleUpdateClick}
              className="w-full"
            >
              수정 완료
            </Button>
          </div>
        </>
      )}
      {showPhotoRewardModal && (
        <PhotoRewardModal
          onConfirm={() => {
            setShowPhotoRewardModal(false);
          }}
        />
      )}
      <DoublecheckModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="수정이 완료되었어요"
        onConfirm={handleConfirmUpdate}
        confirmText="확인"
        variant="singular"
      />
      <DoublecheckModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={tempTitle}
        description="이 레시피를 삭제할까요?"
        onConfirm={handleConfirmDelete}
        variant="black"
      />
    </div>
  );
}
