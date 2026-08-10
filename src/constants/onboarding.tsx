import image1 from "@/assets/onboarding/guide_1.svg";
import image2 from "@/assets/onboarding/guide_2.webp";
import image3 from "@/assets/onboarding/guide_3.webp";
import image4 from "@/assets/onboarding/guide_4.webp";

export const ONBOARDING_GOALS = [
  { id: "cook", title: "주 n회 요리하기" },
  { id: "photo", title: "요리 사진 n번 기록하기" },
  { id: "expired", title: "유통기한 임박 재료 n개 사용하기" },
  { id: "like", title: "레시피에 좋아요 n회 남기기" },
];

export const ONBOARDING_DATA = [
  {
    id: 1,
    img: image1,
    title: (
      <div>
        <span className="text-green">냉장고</span> 식재료를 한눈에 관리해요
      </div>
    ),
    text: "등록만 하면 유통기한을 알아서 챙겨드려요!",
  },
  {
    id: 2,
    img: image2,
    title: (
      <div>
        나에게 딱 맞는 <span className="text-green">AI 레시피</span>를 만들어요
      </div>
    ),
    text: "가진 재료와 취향에 맞게 추천드릴게요!",
  },
  {
    id: 3,
    img: image3,
    title: (
      <div>
        완성한 요리를 <span className="text-green">MY 쿠킵</span>에 기록해요
      </div>
    ),
    text: "직접 만든 요리를 팁과 함께 남기고, 관리할 수 있어요!",
  },
  {
    id: 4,
    img: image4,
    title: (
      <div>
        <span className="text-green">쿠킵스</span>에서 식재료를 키우고, 공유해요
      </div>
    ),
    text: "식재료를 키우고, 다른 쿠킵이들의 레시피를 구경하세요!",
  },
];

export const NOTI_EXAMPLE_DATA = [
  {
    title: "유통기한 임박 🚨",
    description: "두부 유통기한이 하루 남았어요!\n지금 요리하러 가볼까요?",
  },
  {
    title: "주간 목표 달성 🎉",
    description:
      "'주 3회 요리하기' 목표를 달성했어요\n쿠키 리워드를 확인해보세요!",
  },
  {
    title: "식물에 물 줄 시간 🌱",
    description:
      "토마토가 시들고 있어요\n보유하신 쿠키를 사용해 물을 줄 수 있어요",
  },
  {
    title: "오늘의 쿠킵 레시피 🍳",
    description:
      "지금 있는 재료로 만들 수 있는 요리가 있어요\n지금 레시피를 확인해보세요!",
  },
];
