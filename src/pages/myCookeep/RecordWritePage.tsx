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
import { deleteImage, uploadImage } from "../../api/image";
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

  // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files || files.length === 0 || isUploading) return;

  //   const file = files[0];

  //   // 초고용량 방어
  //   if (file.size > 15 * 1024 * 1024) {
  //     alert("이미지가 너무 큽니다. 해상도를 낮춰서 다시 시도해주세요.");
  //     return;
  //   }

  //   setIsUploading(true);

  //   try {
  //     // 1️⃣ 이미지 압축
  //     const compressedBlob = await imageCompression(file, compressionOptions);

  //     const compressedFile = new File([compressedBlob], file.name, {
  //       type: compressedBlob.type,
  //     });

  //     // 2️⃣ 새 이미지 업로드
  //     const response = await uploadImage(compressedFile);
  //     const newUrl = response.data.imageUrl;

  //     // 3️⃣ 기존 이미지 삭제 (업로드 성공 후!)
  //     if (image?.url) {
  //       try {
  //         await deleteImage(image.url);
  //       } catch (err) {
  //         console.warn("기존 이미지 삭제 실패 (무시)", err);
  //       }
  //     }

  //     // 4️⃣ 스토어 교체
  //     setImage({ url: newUrl });
  //   } catch (error) {
  //     console.error("이미지 업로드 에러:", error);
  //     alert("이미지 업로드 중 오류가 발생했습니다.");
  //   } finally {
  //     setIsUploading(false);
  //     if (e.target) e.target.value = "";
  //   }
  // };

  // RecordWritePage.tsx

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
        // 핵심: navigate 전에 ref를 true로 설정
        // isUploadedRef.current = true;

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
        // isUploadedRef.current = true; ← 여기서 아래로 올렸음
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

  // const handleUpload = async () => {
  //   if (!recipeDetail || selectedRecipeId === null || isPublic === null) {
  //     alert("레시피 정보가 로드되지 않았습니다.");
  //     return;
  //   }

  //   setIsUploading(true);

  //   try {
  //     const requestData = {
  //       aiRecipeId: selectedRecipeId,
  //       isPublic: isPublic,
  //       title: title || recipeDetail.title,
  //       description: memo,
  //       recipeImageUrl: image?.url || "",
  //     };

  //     const response = await createDailyRecipe(requestData);
  //     if (
  //       response &&
  //       (response.data ||
  //         String(response.status) === "200" ||
  //         response.status === "OK")
  //     ) {
  //       const rewards: string[] = [];

  //       // 우선순위 A-3: 주간 목표 달성 (먼저 큐에 넣기)
  //       if (response.data?.weeklyGoalAchieved) {
  //         rewards.push("WEEKLY_GOAL");
  //       }

  //       // 우선순위 C-1: 레시피 기록 보상 (항상)
  //       rewards.push("RECIPE_RECORD");

  //       // 우선순위 C-2: 사진 있으면 추가
  //       if (image?.url) {
  //         rewards.push("PHOTO_UPLOAD");
  //       }

  //       setRewardQueue(rewards);

  //       setIsSuccess(true);
  //       isUploadedRef.current = true; // ← setIsUploaded(true) 대신
  //     } else {
  //       alert("업로드에 실패했습니다.");
  //     }
  //   } catch (error: unknown) {
  //     let errorMsg = "레시피 등록 실패";

  //     if (error && typeof error === "object") {
  //       const axiosError = error as AxiosError<{ message?: string }>;
  //       errorMsg = axiosError.response?.data?.message ?? errorMsg;
  //     }

  //     alert(errorMsg);
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  if (!recipeDetail) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#32E389]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FAFAFA]">
        <div className="sticky top-0 z-[120] bg-[#FAFAFA] shrink-0">
          <BackHeader title="레시피 선택" onBack={() => navigate(-1)} />
        </div>

        <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col min-h-0 mt-10">
          <div className="pt-4 flex flex-col gap-[10px]">
            {/* <RecordWriteImageCard
              title={title}
              // imageSrc={images[0]?.url}
              imageSrc={image?.url}
              onClickAddImage={() => fileInputRef.current?.click()}
              onChangeTitle={setTitle}
              onDeleteImage={async () => {
                if (image?.url) {
                  try {
                    await deleteImage(image.url);
                  } catch (err) {
                    console.warn("이미지 삭제 실패 (무시)", err);
                  }
                }
                setImage(null);
              }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={handleImageChange}
            /> */}
            <RecordWriteImageCard
              title={title}
              imageSrc={image?.url}
              onImageChange={async (file) => {
                // onClickAddImage 대신
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
                  if (image?.url) {
                    try {
                      await deleteImage(image.url);
                    } catch (err) {
                      console.warn("기존 이미지 삭제 실패", err);
                    }
                  }
                  setImage({ url: newUrl });
                } catch {
                  alert("이미지 업로드 중 오류가 발생했습니다.");
                } finally {
                  setIsUploading(false);
                }
              }}
              onChangeTitle={setTitle}
              onDeleteImage={async () => {
                if (image?.url) {
                  try {
                    await deleteImage(image.url);
                  } catch (err) {
                    console.warn("이미지 삭제 실패", err);
                  }
                }
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
              className="w-full rounded-[10px] bg-white px-[10px] py-3 text-center typo-body text-[#202020] placeholder:text-[#7D7D7D] resize-none outline-none overflow-hidden"
              rows={1}
            />
          </div>

          <div className="relative mt-[15px] flex justify-center animate-float-bubble shrink-0">
            <div
              className="relative z-10 inline-flex text-center justify-center items-center px-[16px] py-[9px] rounded-[3px] bg-white text-[#32E389] text-[12px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.13)]"
              style={{ width: 206, height: 36 }}
            >
              나만의 팁 작성하기
            </div>
            <div
              className="absolute top-0 translate-y-[-50%] w-[12px] h-[12px] bg-white rotate-45 z-0"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
            />
          </div>

          <div className="mt-auto pt-[64px] pb-[20px] flex flex-col gap-4 items-center shrink-0">
            <div className="flex justify-center gap-[9px] w-full">
              <button
                onClick={() => setIsPublic(false)}
                className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors ${isPublic === false ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
              >
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
                  <img
                    src={privateIcon}
                    alt="private"
                    className="h-[24px] w-[24px]"
                  />
                </div>
                <span className="typo-label text-[#202020]">나만 보기</span>
              </button>

              <button
                onClick={() => setIsPublic(true)}
                className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors ${isPublic === true ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
              >
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
                  <img
                    src={publicIcon}
                    alt="public"
                    className="h-[36px] w-[36px]"
                  />
                </div>
                <span className="typo-label text-[#202020]">
                  쿠킵스에 공개하기
                </span>
              </button>
            </div>

            <Button
              size="L"
              variant="black"
              disabled={isPublic === null || isUploading}
              className={`${isPublic === null ? "text-white" : "!text-[#32E389]"}`}
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
