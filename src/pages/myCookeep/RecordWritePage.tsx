import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import Button from "../../components/ui/Button";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import RecordWriteImageCard from "../../components/myCookeep/record/RecordWriteImageCard";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import UploadCompleteModal from "../../components/myCookeep/record/UploadCompleteModal";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import { uploadImage } from "../../api/image";
import { createDailyRecipe } from "../../api/myRecipe";
import { AiRecipeDetail, getAiRecipeDetail } from "../../api/dailyAiRecipe";
import imageCompression from "browser-image-compression";
import { AxiosError } from "axios";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import PhotoRewardModal from "../../components/myCookeep/record/PhotoRewardModal";
import WeeklyGoalModal from "../../components/ui/WeeklyGoalModal";

export default function RecordWritePage() {
  const navigate = useNavigate();
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [recipeDetail, setRecipeDetail] = useState<AiRecipeDetail | null>(null);
  // const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rewardQueue, setRewardQueue] = useState<string[]>([]);

  const {
    selectedRecipeId,
    editingRecordId,
    title,
    memo,
    image,
    isPublic,
    setTitle,
    setMemo,
    setIsPublic,
    setImage,
    resetRecord,
  } = useCookeepRecordStore();

  useEffect(() => {
    if (!selectedRecipeId) return;

    const fetchDetail = async () => {
      try {
        const response = await getAiRecipeDetail(selectedRecipeId);
        if (response.status === "OK") {
          setRecipeDetail(response.data);
          setTitle(response.data.title);
        }
      } catch (error) {
        console.error("레시피 상세 로드 실패", error);
      }
    };

    fetchDetail();
  }, [selectedRecipeId, setTitle, title]);

  useEffect(() => {
    if (isSuccess) return;
    if (!selectedRecipeId && !editingRecordId) {
      navigate("/mycookeep/record/select", { replace: true });
    }
  }, [selectedRecipeId, editingRecordId, navigate, isSuccess]);

  const handleMemoInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const compressionOptions = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 720,
    useWebWorker: true,
    initialQuality: 0.7,
    alwaysKeepResolution: false,
  };

  const handleUpload = async () => {
    if (!recipeDetail || selectedRecipeId === null || isPublic === null) {
      alert("레시피 정보가 로드되지 않았습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const requestData = {
        aiRecipeId: selectedRecipeId,
        isPublic: isPublic,
        title: title || recipeDetail.title,
        description: memo,
        recipeImageUrl: image?.url || "",
      };

      const response = await createDailyRecipe(requestData);
      if (
        response &&
        (response.data ||
          String(response.status) === "200" ||
          response.status === "OK")
      ) {
        const rewards: string[] = [];
        if (response.data?.weeklyGoalAchieved) {
          rewards.push("WEEKLY_GOAL");
        }
        rewards.push("RECIPE_RECORD");
        if (image?.url) {
          rewards.push("PHOTO_UPLOAD");
        }

        setRewardQueue(rewards);
        setIsSuccess(true);
      } else {
        alert("업로드에 실패했습니다.");
      }
    } catch (error: unknown) {
      let errorMsg = "레시피 등록 실패";
      if (error && typeof error === "object") {
        const axiosError = error as AxiosError<{ message?: string }>;
        errorMsg = axiosError.response?.data?.message ?? errorMsg;
      }
      alert(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  if (!recipeDetail) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar bg-background">
        <div className="sticky top-0 z-[120] bg-background shrink-0">
          <BackHeader title="레시피 선택" onBack={() => navigate(-1)} />
        </div>

        <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col min-h-0 mt-10">
          <div className="pt-4 flex flex-col gap-[10px]">
            <RecordWriteImageCard
              title={title}
              imageSrc={image?.url}
              onImageChange={async (file) => {
                if (file.size > 15 * 1024 * 1024) {
                  alert(
                    "이미지가 너무 큽니다. 해상도를 낮춰서 다시 시도해주세요.",
                  );
                  return;
                }
                setIsUploading(true);
                try {
                  const compressedBlob = await imageCompression(
                    file,
                    compressionOptions,
                  );
                  const compressedFile = new File([compressedBlob], file.name, {
                    type: compressedBlob.type,
                  });
                  const response = await uploadImage(compressedFile);
                  const newUrl = response.data.imageUrl;
                  setImage({ url: newUrl });
                } catch {
                  alert("이미지 업로드 중 오류가 발생했습니다.");
                } finally {
                  setIsUploading(false);
                }
              }}
              onChangeTitle={setTitle}
              onDeleteImage={async () => {
                setImage(null);
              }}
            />
            <RecipeRecordContentSection
              recipe={{
                ingredients: recipeDetail.ingredientsJson,
                steps: recipeDetail.stepsJson,
              }}
            />
            {/* 유튜브 카드 추가 */}
            {recipeDetail.youtubeUrlJson &&
              recipeDetail.youtubeUrlJson.length > 0 && (
                <RecipeDetailYoutube
                  videos={recipeDetail.youtubeUrlJson}
                  tags={(() => {
                    try {
                      return recipeDetail.youtubeSearchQueries
                        ? JSON.parse(recipeDetail.youtubeSearchQueries)
                        : [];
                    } catch {
                      return [];
                    }
                  })()}
                />
              )}
          </div>

          <div className="flex w-full flex-col items-center pt-4 shrink-0">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value.slice(0, 500))}
              onInput={handleMemoInput}
              placeholder="글자 수 최대 500자"
              className="w-full rounded-[10px] bg-gray-0 px-[10px] py-3 text-center typo-body text-gray-80 placeholder:text-gray-50 resize-none outline-none overflow-hidden"
              rows={1}
            />
          </div>

          <div className="relative mt-[15px] flex justify-center animate-float-bubble shrink-0">
            <div
              className="relative z-10 inline-flex text-center justify-center items-center px-[16px] py-[9px] rounded-[3px] bg-gray-0 text-green text-[12px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.13)]"
              style={{ width: 206, height: 36 }}
            >
              나만의 팁 작성하기
            </div>
            <div
              className="absolute top-0 translate-y-[-50%] w-[12px] h-[12px] bg-gray-0 rotate-45 z-0"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
            />
          </div>

          <div className="mt-auto pt-[64px] pb-[20px] flex flex-col gap-4 items-center shrink-0">
            <div className="flex justify-center gap-[9px] w-full">
              <button
                onClick={() => setIsPublic(false)}
                className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors ${isPublic === false ? "bg-green-light" : "bg-gray-10"}`}
              >
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-0">
                  <img
                    src={privateIcon}
                    alt="private"
                    className="h-[24px] w-[24px]"
                  />
                </div>
                <span className="typo-label text-gray-80">나만 보기</span>
              </button>

              <button
                onClick={() => setIsPublic(true)}
                className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors ${isPublic === true ? "bg-green-light" : "bg-gray-10"}`}
              >
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-0">
                  <img
                    src={publicIcon}
                    alt="public"
                    className="h-[36px] w-[36px]"
                  />
                </div>
                <span className="typo-label text-gray-80">
                  쿠킵스에 공개하기
                </span>
              </button>
            </div>

            <Button
              size="L"
              variant="black"
              disabled={isPublic === null || isUploading}
              className={`${isPublic === null ? "text-gray-0" : "!text-green"}`}
              onClick={handleUpload}
            >
              레시피 업로드하기
            </Button>
          </div>
        </div>
      </div>

      {/* 우선순위 A-3: 주간 목표 달성 모달 */}
      {rewardQueue[0] === "WEEKLY_GOAL" && (
        <WeeklyGoalModal
          isOpen={true}
          onClose={() => {
            const nextQueue = [...rewardQueue];
            nextQueue.shift();
            if (nextQueue.length > 0) {
              setRewardQueue(nextQueue);
            } else {
              navigate("/mycookeep");
              setTimeout(() => resetRecord(), 100);
            }
          }}
        />
      )}

      {rewardQueue[0] === "RECIPE_RECORD" && (
        <UploadCompleteModal
          isOpen={true}
          onConfirm={async () => {
            await useCookeepsStore.getState().fetchCookies();

            const nextQueue = [...rewardQueue];
            nextQueue.shift();

            if (nextQueue.length > 0) {
              setRewardQueue(nextQueue);
            } else {
              navigate("/mycookeep");
              setTimeout(() => {
                resetRecord();
              }, 100);
            }
          }}
          onCancel={() => {}}
        />
      )}

      {rewardQueue[0] === "PHOTO_UPLOAD" && (
        <PhotoRewardModal
          onConfirm={() => {
            const nextQueue = [...rewardQueue];
            nextQueue.shift();

            if (nextQueue.length > 0) {
              setRewardQueue(nextQueue);
            } else {
              navigate("/mycookeep");
              setTimeout(() => {
                resetRecord();
              }, 100);
            }
          }}
        />
      )}
    </>
  );
}
