import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import optionIcon from "../../assets/mycookeep/record/options.svg";
import RecordViewImageCard from "../../components/myCookeep/record/RecordViewImageCard";
import { useEffect, useState } from "react";
import {
  deleteDailyRecipe,
  getMyRecipeDetail,
  MyRecipeDetail,
  updateDailyRecipe,
  updateRecipeVisibility,
} from "../../api/myRecipe";
import Button from "../../components/ui/Button";
import DoublecheckModal from "../../components/ui/DoublecheckModal";
import { uploadImage } from "../../api/image";
import imageCompression from "browser-image-compression";
import PhotoRewardModal from "../../components/myCookeep/record/PhotoRewardModal";

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
  // 임시 공개여부 state 추가
  const [tempIsPublic, setTempIsPublic] = useState<boolean>(false);
  // 사진모달
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
          setCurrentImageUrl(response.data.recipeImageUrl || undefined); // ← 추가
          setTempIsPublic(response.data.isPublic); // ← 추가
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

  // 1. 드롭다운 메뉴에서 삭제 버튼 클릭 시
  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true); // 삭제 확인 모달 열기
  };

  // 2. 모달에서 '네'를 눌렀을 때 실행될 실제 삭제 로직
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

  // 1. [수정 완료] 버튼 클릭 시 모달만 먼저 띄움
  const handleUpdateClick = () => {
    const imageChanged =
      currentImageUrl !== (record?.recipeImageUrl || undefined);
    const visibilityChanged = tempIsPublic !== record?.isPublic; // ← 추가
    // 변경사항이 아예 없으면 모달 안 띄우고 바로 종료 처리 가능
    if (
      tempTitle === record?.title &&
      tempDescription === (record?.description || "") &&
      !imageChanged &&
      !visibilityChanged // ← 추가
    ) {
      setIsEditing(false);
      return;
    }
    setIsUpdateModalOpen(true);
  };

  // 2. 모달에서 '네'를 눌렀을 때 실행될 실제 수정 API 로직
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
      // 공개여부가 바뀐 경우에만 추가 API 호출
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
    setCurrentImageUrl(undefined); // UI에서만 제거, 실제 삭제는 수정 완료 시 서버가 처리
  };

  if (!record) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FAFAFA]">
      {/* 3. 헤더 영역: 스크롤 시 상단에 고정되도록 sticky 유지 */}
      <div className="sticky top-0 z-[120] bg-[#FAFAFA] w-full">
        <div className="relative w-full flex justify-center items-center w-full max-w-[450px] mx-auto">
          <div className="absolute left-0 w-full">
            <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
          </div>
          <div className="absolute right-2 top-2 flex items-center">
            {isMenuOpen && (
              <div className="absolute right-2 top-10 flex flex-col items-center justify-center bg-white rounded-[10px] w-[130px] h-[72px] shadow-[0_1px_8.2px_-2px_#11111140] animate-fadeIn z-50 overflow-hidden">
                {/* 수정하기 버튼 */}
                <button
                  onClick={handleEdit}
                  className="w-full h-[34px] typo-caption !font-semibold hover:bg-gray-50 transition-colors"
                >
                  수정하기
                </button>

                {/* 구분선 */}
                <div className="w-[80px] h-[0.5px] bg-[#D1D1D1]" />

                {/* 삭제하기 버튼 */}
                <button
                  onClick={handleDeleteClick}
                  className="w-full h-[34px] typo-caption !font-semibold hover:bg-gray-50 transition-colors"
                >
                  삭제하기
                </button>
              </div>
            )}

            {/* 옵션 아이콘 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 flex items-center justify-center relative z-[110]"
            >
              <img src={optionIcon} className="w-1" alt="option" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col">
        <div className="pt-[51px] flex flex-col gap-[10px]">
          <RecordViewImageCard
            title={tempTitle}
            imageSrc={currentImageUrl} // ← record.recipeImageUrl 대신
            isEditing={isEditing}
            isImageUploading={isImageUploading} // ← 추가
            onChangeTitle={(newTitle) => setTempTitle(newTitle)}
            onImageFileSelect={handleImageFileSelect} // ← 추가
            onImageDelete={handleImageDelete} // ← 추가
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
              onChange={(e) => setTempDescription(e.target.value)}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
              placeholder="글자 수 최대 500자"
              className="overflow-hidden w-full rounded-[10px] bg-white px-[10px] py-3 text-center typo-body text-[#202020] placeholder:text-[#7D7D7D] resize-none outline-none"
              rows={1}
            />
          ) : (
            record.description && (
              <div className="w-full rounded-[10px] bg-white px-[15px] py-4 text-center typo-body text-[#202020] shadow-sm whitespace-pre-wrap break-words border border-gray-100">
                {record.description}
              </div>
            )
          )}
        </div>

        {/* 공개 여부 수정 컨트롤 */}
        <div className="mt-[32px] flex justify-center gap-[9px] pb-9">
          {/* 나만 보기 버튼 */}
          <button
            disabled={!isEditing}
            onClick={() => setTempIsPublic(false)} // ← 즉시 API 말고 임시저장
            className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors
              ${tempIsPublic === false ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
          >
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
              <img src={privateIcon} className="w-[24px]" alt="private" />
            </div>
            <span className="typo-label text-[#202020]">나만 보기</span>
          </button>

          {/* 쿠킵스 공개 버튼 */}
          <button
            disabled={!isEditing}
            onClick={() => setTempIsPublic(true)} // ← 즉시 API 말고 임시저장
            className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors
              ${tempIsPublic === true ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
          >
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
              <img src={publicIcon} className="w-[36px]" alt="public" />
            </div>
            <span className="typo-label text-[#202020]">쿠킵스 공개</span>
          </button>
        </div>
        {isEditing && (
          <div className=" flex mt-2 mb-2">
            <Button
              size="L"
              variant="black"
              onClick={handleUpdateClick}
              className="w-full"
            >
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
