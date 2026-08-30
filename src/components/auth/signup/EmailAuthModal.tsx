import CautionModal, { CautionModalConfig } from "@/components/ui/CautionModal";
import { maskEmail } from "@/utils/maskEmail";

export type EmailAuthModalType = "send" | "verify" | "already" | "help";

interface EmailAuthModalProps {
  type: EmailAuthModalType;
  email?: string;
  onConfirm: () => void;
  onLogin?: () => void;
}

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

const buildConfig = (
  type: EmailAuthModalType,
  email?: string,
): CautionModalConfig => {
  switch (type) {
    case "send":
      return {
        title: "인증번호가 발송되었어요",
        buttonText: "확인",
        variant: "green",
      };
    case "verify":
      return {
        title: "인증에 성공했어요",
        buttonText: "확인",
        variant: "green",
        subText: email ? maskEmail(email) : undefined,
      };
    case "already":
      return {
        title: "이미 가입한 계정이 있어요",
        buttonText: "로그인하기",
        variant: "green",
        subText: email ? maskEmail(email) : undefined,
      };
    case "help":
      return {
        title:
          "통신 환경에 따라\n발송이 지연되거나 차단될 수 있어요.\n스팸 메일함을 확인하시거나,\n잠시 후 다시 시도해주세요.",
        buttonText: "채널 문의 바로가기",
        variant: "black",
        showIcon: true,
        subText: "문제가 지속되나요?",
      };
  }
};

export default function EmailAuthModal({
  type,
  email,
  onConfirm,
  onLogin,
}: EmailAuthModalProps) {
  const config = buildConfig(type, email);

  const handleButtonClick = () => {
    if (type === "already" && onLogin) {
      onLogin();
    } else if (type === "help") {
      window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
    } else {
      onConfirm();
    }
  };

  return (
    <CautionModal
      config={config}
      onClose={onConfirm}
      onButtonClick={handleButtonClick}
    />
  );
}
