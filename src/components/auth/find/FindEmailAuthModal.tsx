import CautionIcon from "@/assets/signup/icon_caution.svg?react";

import Button from "@/components/ui/Button";

export type FindEmailAuthModalType =
  | "send"
  | "verify"
  | "notRegistered"
  | "help";

interface FindEmailAuthModalProps {
  type: FindEmailAuthModalType;
  email?: string;
  onConfirm: () => void;
  onSignup?: () => void;
}

const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!domain) return email;

  if (local.length <= 4) {
    return `${"*".repeat(local.length)}@${domain}`;
  }

  return `${local.slice(0, local.length - 4)}****@${domain}`;
};

const modalConfig = {
  send: {
    title: "인증번호가 발송되었어요",
    buttonText: "확인",
    variant: "green" as const,
  },
  verify: {
    title: "인증에 성공했어요",
    buttonText: "확인",
    variant: "green" as const,
  },
  notRegistered: {
    title:
      "해당 이메일로 가입된 계정을\n찾을 수 없어요\n회원가입을 먼저 진행해 주세요",
    buttonText: "회원가입하기",
    variant: "green" as const,
  },
  help: {
    title:
      "통신 환경에 따라\n발송이 지연되거나 차단될 수 있어요.\n스팸 메일함을 확인하시거나,\n잠시 후 다시 시도해주세요.",
    buttonText: "채널 문의 바로가기",
    variant: "black" as const,
  },
} as const;

export default function FindEmailAuthModal({
  type,
  email,
  onConfirm,
  onSignup,
}: FindEmailAuthModalProps) {
  const config = modalConfig[type];
  const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

  const handleOpenKakao = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  const handleButtonClick = () => {
    if (type === "notRegistered" && onSignup) {
      onSignup();
    } else if (type === "help") {
      handleOpenKakao();
    } else {
      onConfirm();
    }
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="bg-black-overlay fixed inset-0 z-[100]"
        onClick={onConfirm} // 배경 클릭 시 닫히게 하고 싶으면 유지
      />
      <div className="bg-gray-0 shadow-container fixed top-1/2 left-1/2 z-[110] flex w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl p-6">
        <div className="flex w-full flex-col items-center gap-3">
          {type === "help" && <CautionIcon className="text-gray-80 h-5 w-5" />}

          <div className="flex w-full flex-col items-center gap-2">
            <p className="typo-l-strong text-gray-80 text-center whitespace-pre-wrap">
              {config.title}
            </p>

            {type === "verify" && email && (
              <p className="typo-m text-gray-80 text-center">
                {maskEmail(email)}
              </p>
            )}

            {type === "help" && (
              <p className="typo-m text-gray-80 text-center">
                문제가 지속되나요?
              </p>
            )}
          </div>
        </div>

        <Button
          size="S"
          variant={config.variant}
          className="w-full"
          onClick={handleButtonClick}
        >
          {config.buttonText}
        </Button>
      </div>
    </>
  );
}
