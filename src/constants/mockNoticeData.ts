// src/constants/mockNoticeData.ts
export type NoticeItemType = {
  id: number;
  title: string;
  content: string;
};

export const mockNoticeCategories: NoticeItemType[] = [
  {
    id: 1,
    title: "서비스 소개",
    content:
      "쿠킵(CooKeep)이란?\n 맛있는 습관이 이어지는 곳, 쿠킵(CooKeep)\n- Cook: 냉장고 속 재료로 지금 할 수 있는 요리를 추천하고\n- Keep: 요리가 기록으로 남아 자연스럽게 이어지도록 도와드려요\n\n 1인 가구에게 요리는 지갑과 건강, 환경까지 함께 고려하는 선택이에요. 쿠킵은 그 선택을 알아보고, 기록으로 남겨 작은 보상으로 응원해요!",
  },
  {
    id: 2,
    title: "쿠킵에서 할 수 있는 것",
    content:
      "- 냉장고: 집에 있는 재료를 한눈에 정리하고 체계적으로 관리해요\n- AI레시피: 보유한 재료로 만들 수 있는 맞춤형 레시피를 추천받아요\n- MY쿠킵: 요리한 기록을 모아 나만의 루틴을 확인해요\n- 쿠킵스: 쿠키를 사용해 식물을 키우고, 다른 사람들의 레시피를 구경해요",
  },
  {
    id: 3,
    title: "이런 분께 잘 맞아요",
    content:
      "- 혼자 살며 매번 식사를 고민하는 2030 직장인·학생·프리랜서\n- 요리를 해보고 싶지만, 습관으로 이어지지 않았던 분\n- 배달·외식보다 건강하고 합리적인 식사를 원하는 분\n- 환경과 소비를 조금 더 의식하며 살고 싶은 분",
  },
];
