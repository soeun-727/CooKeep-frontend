import CautionIcon from "../../../assets/signup/icon_caution.svg";
import Button from "../../ui/Button";

export type EmailAuthModalType = "send" | "verify" | "already" | "help";

interface EmailAuthModalProps {
  type: EmailAuthModalType;
  email?: string; // 추가
  onConfirm: () => void;
  onLogin?: () => void;
}

// ex) hello@gmail.com → hel****@gmail.com
const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, Math.max(1, local.length - 4));
  return `${visible}****@${domain}`;
};

const EmailAuthModal = ({
  type,
  email,
  onConfirm,
  onLogin,
}: EmailAuthModalProps) => {
  const isSend = type === "send";
  const isVerify = type === "verify";
  const isAlready = type === "already";
  const isHelp = type === "help";

  const isBlackButton = isHelp;

  const buttonText = isHelp
    ? "채널 문의 바로가기"
    : isAlready
      ? "로그인하기"
      : "확인";
  const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

  const handleOpenKakao = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-[100] bg-[rgba(17,17,17,0.5)]"
        onClick={onConfirm} // 배경 클릭 시 닫히게 하고 싶으면 유지
      />
      <div
        className="fixed z-[110] left-1/2 -translate-x-1/2 bg-white rounded-[10px]"
        style={{
          top: isHelp ? 308 : isSend ? 359 : 343,
          width: isHelp ? 256 : 240,
          minHeight: isHelp ? 236 : isSend ? 134 : 166,
          paddingTop: isHelp ? 25 : 35,
          paddingRight: 28,
          paddingBottom: 25,
          paddingLeft: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* 인증번호 발송 안됨 아이콘 */}
        {isHelp && (
          <img
            src={CautionIcon}
            alt="주의"
            className="mb-2 w-[20px] h-[20px]"
          />
        )}
        {/* 메인 메시지 */}
        <p
          className={`text-center leading-[20px] typo-body2 whitespace-pre-wrap ${isHelp ? "-mt-[6px]" : ""}`}
        >
          {isSend && "인증번호가 발송되었어요"}
          {isVerify && "인증에 성공하였습니다"}
          {isAlready && "이미 가입된 계정이 있어요"}
          {isHelp &&
            "통신 환경에 따라\n발송이 지연되거나 차단될 수 있어요.\n\n스팸 메일함을 확인하시거나,\n잠시 후 다시 시도해주세요."}
        </p>

        {/* 부가 텍스트 */}
        {/* 이메일 표시 - send / verify / already 모두 동일하게 */}
        {/* {(isSend || isVerify || isAlready) && email && (
          <p className="text-[12px] text-[#7D7D7D] text-center">{email}</p>
        )} */}

        {/* 마스킹된 이메일 표시 */}
        {(isVerify || isAlready) && email && (
          <p className="text-[12px] text-[#7D7D7D] text-center">
            {maskEmail(email)}
          </p>
        )}

        {isHelp && (
          <p className="text-[12px] text-[#7D7D7D] text-center">
            문제가 지속되나요?
          </p>
        )}

        {/* 버튼 */}
        <Button
          size="S"
          onClick={isAlready ? onLogin : isHelp ? handleOpenKakao : onConfirm}
          className={`
    ${isBlackButton ? "!w-[200px] !bg-[#202020]" : "!w-[184px] !bg-[#32E389]"}
  `}
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default EmailAuthModal;
