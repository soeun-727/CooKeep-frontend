import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { uploadImage } from "@/api/image";
import {
  MyRecipeDetail,
  deleteDailyRecipe,
  getMyRecipeDetail,
  updateDailyRecipe,
  updateRecipeVisibility,
} from "@/api/myRecipe";
import imageCompression from "browser-image-compression";

import privateIcon from "@/assets/mycookeep/record/private_icon.svg";
import publicIcon from "@/assets/mycookeep/record/public_icon.svg";

import RecipeDetailYoutube from "@/components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import PhotoRewardModal from "@/components/myCookeep/record/PhotoRewardModal";
import RecipeRecordContentSection from "@/components/myCookeep/record/RecipeRecordContentSection";
import RecordViewImageCard from "@/components/myCookeep/record/RecordViewImageCard";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import DoublecheckModal from "@/components/ui/DoublecheckModal";
import RecipeOptionMenu from "@/components/ui/OptionsMenu";

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
  const [isImageUploading, setIsImageUploading] = useState(false);
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
    // const wasNoImage = !record.recipeImageUrl;
    // const nowHasImage = !!currentImageUrl;
    // const shouldGivePhotoReward = wasNoImage && nowHasImage;
    try {
      const wasImageDeleted = !currentImageUrl && !!record.recipeImageUrl;
      const isImageChanged =
        currentImageUrl && currentImageUrl !== record.recipeImageUrl;

      const response = await updateDailyRecipe(Number(recordId), {
        title: tempTitle,
        description: tempDescription,
        ...(isImageChanged && { recipeImageUrl: currentImageUrl }),
        ...(wasImageDeleted && { deleteRecipeImage: true }),
      });
      if (tempIsPublic !== record.isPublic) {
        await updateRecipeVisibility(Number(recordId), tempIsPublic);
      }

      if (response.status === "OK") {
        setRecord({ ...response.data, isPublic: tempIsPublic });
        setCurrentImageUrl(response.data.recipeImageUrl || undefined);
        setIsEditing(false);

        if (response.data.photoCookieAwarded === true) {
          setShowPhotoRewardModal(true);
        }

        // if (shouldGivePhotoReward) {
        //   setShowPhotoRewardModal(true);
        // }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err?.response?.data?.message || "수정에 실패했습니다.");
    }
  };

  const compressionOptions = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 720,
    useWebWorker: true,
    initialQuality: 0.7,
  };

  const handleImageFileSelect = async (file: File) => {
    if (file.size > 15 * 1024 * 1024) {
      alert("이미지가 너무 큽니다. 해상도를 낮춰서 다시 시도해주세요.");
      return;
    }
    setIsImageUploading(true);
    try {
      const compressedBlob = await imageCompression(file, compressionOptions);
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
      });
      const response = await uploadImage(compressedFile);
      setCurrentImageUrl(response.data.imageUrl);
    } catch {
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleImageDelete = () => {
    setCurrentImageUrl(undefined);
  };

  if (!record) return null;

  return (
    <div className="no-scrollbar bg-background flex h-full flex-1 flex-col overflow-y-auto">
      <div className="bg-background sticky top-0 z-[120] w-full">
        <div className="relative mx-auto flex w-full max-w-[450px] items-center justify-center">
          <div className="absolute left-0 w-full">
            <BackHeader title="레시피 보기" />
          </div>
          <div className="absolute top-2 right-2 flex items-center">
            <RecipeOptionMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[450px] flex-1 flex-col px-4">
        <div className="flex flex-col gap-[10px] pt-[51px]">
          <RecordViewImageCard
            title={tempTitle}
            imageSrc={currentImageUrl}
            isEditing={isEditing}
            isImageUploading={isImageUploading}
            onChangeTitle={newTitle => setTempTitle(newTitle)}
            onImageFileSelect={handleImageFileSelect}
            onImageDelete={handleImageDelete}
          />

          {/* 레시피 내용 */}
          <RecipeRecordContentSection
            recipe={{
              ingredients: record.content.ingredients,
              steps: record.content.steps,
            }}
          />
          {record.content.youtubeReferences &&
            record.content.youtubeReferences.length > 0 && (
              <RecipeDetailYoutube
                videos={record.content.youtubeReferences}
                tags={record.content.youtubeSearchQueries ?? []}
              />
            )}
        </div>

        {/* 메모 */}
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          {isEditing ? (
            <textarea
              value={tempDescription}
              onChange={e => setTempDescription(e.target.value)}
              onInput={e => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
              placeholder="글자 수 최대 500자"
              className="bg-gray-0 typo-body text-gray-80 w-full resize-none overflow-hidden rounded-[10px] px-[10px] py-3 text-center outline-none placeholder:text-gray-50"
              rows={1}
            />
          ) : (
            record.description && (
              <div className="bg-gray-0 typo-body text-gray-80 w-full rounded-[10px] border border-gray-100 px-[15px] py-4 text-center break-words whitespace-pre-wrap">
                {record.description}
              </div>
            )
          )}
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
    </div>
  );
}
