export type AuthAgreements = {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  policy: boolean;
};

export type AgreementItem = {
  key: keyof AuthAgreements;
  label: string;
  required: boolean;
  content: string;
  consentNotice?: string; // 추가
  notice: string;
};
