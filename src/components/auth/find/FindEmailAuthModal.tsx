import CautionIcon from "../../../assets/signup/icon_caution.svg";
import Button from "../../ui/Button";

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

const FindEmailAuthModal = ({
  type,
  email,
  onConfirm,
  onSignup,
}: FindEmailAuthModalProps) => {
  const isSend = type === "send";
  const isVerify = type === "verify";
  const isNotRegistered = type === "notRegistered";
  const isHelp = type === "help";
  const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

  const handleOpenKakao = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, Math.max(1, local.length - 4));
    return `${visible}****@${domain}`;
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
        {isHelp && (
          <img
            src={CautionIcon}
            alt="주의"
            className="mb-2 w-[20px] h-[20px]"
          />
        )}

        <p className="text-[14px] font-medium text-center leading-[20px] text-[#111111]">
          {isSend && "인증번호가 발송되었어요"}
          {isVerify && "인증에 성공하셨습니다"}
          {isNotRegistered && (
            <>
              해당 이메일로 가입된 계정을 <br />
              찾을 수 없어요 <br />
              회원가입을 먼저 진행해 주세요
            </>
          )}

          {isHelp && (
            <>
              통신 환경에 따라
              <br />
              발송이 지연되거나 차단될 수 있어요.
              <br />
              <br />
              스팸 메일함을 확인하시거나,
              <br />
              잠시 후 다시 시도해주세요.
            </>
          )}
        </p>

        {isVerify && email && (
          <p className="text-[12px] text-[#7D7D7D] text-center">
            {maskEmail(email)}
          </p>
        )}

        {isHelp && (
          <p className="text-[12px] text-[#7D7D7D] text-center">
            문제가 지속되나요?
          </p>
        )}

        <Button
          size="S"
          onClick={
            isNotRegistered ? onSignup : isHelp ? handleOpenKakao : onConfirm
          }
          className={`!h-[38px] ${
            isHelp ? "!w-[200px] !bg-[#202020]" : "!w-[184px] !bg-[#32E389]"
          }`}
        >
          {isHelp
            ? "채널 문의 바로가기"
            : isNotRegistered
              ? "회원가입하기"
              : "확인"}
        </Button>
      </div>
    </>
  );
};

export default FindEmailAuthModal;
