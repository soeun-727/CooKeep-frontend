type CommonEmailStep = "send" | "verify" | "help";
export type FindEmailAuthType = CommonEmailStep | "notRegistered";
export type EditPasswordEmailType = CommonEmailStep | "mismatch";
export type EmailAuthType = CommonEmailStep | "already";
export type EditEmailType = CommonEmailStep;
