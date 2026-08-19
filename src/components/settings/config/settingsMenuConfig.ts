export type SettingsMenuAction =
  | { type: "navigate"; path: string }
  | { type: "external"; url: string }
  | { type: "callback"; key: "logout" | "withdraw" };

export type SettingsMenuItem = {
  label: string;
  action: SettingsMenuAction;
  muted?: boolean;
};

export type SettingsSectionConfig = {
  title: string;
  items: SettingsMenuItem[];
};

export const settingsSections: SettingsSectionConfig[] = [
  {
    title: "공지사항",
    items: [
      {
        label: "서비스 소개",
        action: { type: "navigate", path: "/settings/notice" },
      },
    ],
  },
  {
    title: "고객센터",
    items: [
      { label: "1:1 문의", action: { type: "navigate", path: "/support" } },
      {
        label: "자주 하는 질문 (FAQ)",
        action: { type: "navigate", path: "/settings/faq" },
      },
      {
        label: "의견 남기기",
        action: {
          type: "external",
          url: "https://forms.gle/G8FLBSARMgwmE14WA",
        },
      },
    ],
  },
  {
    title: "이용 약관",
    items: [
      {
        label: "서비스 이용 약관",
        action: { type: "navigate", path: "/settings/terms" },
      },
      {
        label: "개인정보 수집 및 이용 동의",
        action: { type: "navigate", path: "/settings/privacy" },
      },
      {
        label: "마케팅 활용 및 광고 수신 동의",
        action: { type: "navigate", path: "/settings/marketing" },
      },
      {
        label: "개인정보 처리방침",
        action: { type: "navigate", path: "/settings/policy" },
      },
    ],
  },
  {
    title: "계정 관리",
    items: [
      { label: "로그아웃", action: { type: "callback", key: "logout" } },
      {
        label: "탈퇴하기",
        action: { type: "callback", key: "withdraw" },
        muted: true,
      },
    ],
  },
];
