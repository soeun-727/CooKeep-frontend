import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiRecipeDetail, getAiRecipeDetail } from "@/api/dailyAiRecipe";
import { createDailyRecipe } from "@/api/myRecipe";
import { useCookeepRecordStore } from "@/stores/useCookeepRecordStore";
import { useCookeepsStore } from "@/stores/useCookeepsStore";
import { AxiosError } from "axios";

import ConfirmModal from "@/components/fridge/modals/ConfirmModal";
import { CookingTipsSection } from "@/components/myCookeep/record/CookingTipsSection";
import PhotoRewardModal from "@/components/myCookeep/record/PhotoRewardModal";
import RecordImageContent from "@/components/myCookeep/record/RecordImageContent";
import UploadCompleteModal from "@/components/myCookeep/record/UploadCompleteModal";
import { VisibleChangeSection } from "@/components/myCookeep/record/VisibleChangeSection";
import RecipeTitle from "@/components/recipe/main/result/RecipeTitle";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { RecipeInfoDetail } from "@/components/ui/RecipeInfoDetail";
import WeeklyGoalModal from "@/components/ui/WeeklyGoalModal";

import { compressAndUploadImage } from "@/utils/imageUpload";
import { setTodayRecord } from "@/utils/record";

export default function RecordWritePage() {
  const navigate = useNavigate();

  const [recipeDetail, setRecipeDetail] = useState<AiRecipeDetail | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rewardQueue, setRewardQueue] = useState<string[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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

  // 재료선택 화면에 갔다가 다시 돌아오는 경우 작성 완료 전까지는 이미지가 남아있으면 안 됨
  useEffect(() => {
    setImage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async () => {
    if (!recipeDetail || selectedRecipeId === null) {
      alert("레시피 정보가 로드되지 않았습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = image?.file
        ? await compressAndUploadImage(image.file)
        : image?.url || "";

      const requestData = {
        aiRecipeId: selectedRecipeId,
        isPublic: isPublic,
        title: title || recipeDetail.title,
        description: memo,
        recipeImageUrl: imageUrl,
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
        if (imageUrl) {
          rewards.push("PHOTO_UPLOAD");
        }

        setTodayRecord();
        setRewardQueue(rewards);
        setIsSuccess(true);
      } else {
        alert("업로드에 실패했습니다.");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMsg =
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "레시피 등록 실패");
      alert(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelConfirm = () => {
    resetRecord();
    navigate(-1);
  };

  if (!recipeDetail) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="mb-20 flex flex-col gap-3 px-4">
        <BackHeader
          title="레시피 등록"
          onBack={() => setIsCancelModalOpen(true)}
        />

        <RecordImageContent
          imageSrc={image?.url}
          onImageChange={file => {
            setImage({ url: URL.createObjectURL(file), file });
          }}
        />
        <RecipeTitle
          name={title || recipeDetail.title}
          category=""
          usedItems={recipeDetail.ingredientsJson.user_ingredients.length}
          editMode={true}
          onNameChange={setTitle}
        />

        <CookingTipsSection cookingTips={memo} onChangeCookingTips={setMemo} />

        <RecipeInfoDetail
          selectedIngredients={recipeDetail.ingredientsJson.user_ingredients}
          requiredIngredients={
            recipeDetail.ingredientsJson.additional_ingredients
          }
          substitutions={recipeDetail.ingredientsJson.optional_ingredients}
          steps={recipeDetail.stepsJson.map((step, idx) => ({
            order: idx + 1,
            description: step.content,
          }))}
          difficulty="NORMAL"
          youtubeVideos={recipeDetail.youtubeUrlJson}
          youtubeTags={(() => {
            try {
              return recipeDetail.youtubeSearchQueries
                ? JSON.parse(recipeDetail.youtubeSearchQueries)
                : [];
            } catch {
              return [];
            }
          })()}
        />
        <VisibleChangeSection isPublic={isPublic} onChange={setIsPublic} />
      </div>

      <div className="fixed bottom-0 mx-auto w-full max-w-[450px] px-4 pt-6">
        <Button
          size="L"
          variant="green"
          disabled={isUploading}
          onClick={handleUpload}
        >
          레시피 업로드하기
        </Button>
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
      {isCancelModalOpen && (
        <ConfirmModal
          title="레시피 등록을 취소하시겠어요?"
          subtitle="기존에 입력한 정보는 저장되지 않아요"
          onConfirm={handleCancelConfirm}
          buttonVariants={["gray", "black"]}
          onCancel={() => setIsCancelModalOpen(false)}
        />
      )}
    </>
  );
}
