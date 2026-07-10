// import CautionIcon from "@/assets/signup/icon_caution.svg";

// import Button from "@/components/ui/Button";

// export type EmailAuthModalType = "send" | "verify" | "already" | "help";

// interface EmailAuthModalProps {
//   type: EmailAuthModalType;
//   email?: string; // 추가
//   onConfirm: () => void;
//   onLogin?: () => void;
// }

// // ex) hello@gmail.com → hel****@gmail.com
// const maskEmail = (email: string) => {
//   const [local, domain] = email.split("@");
//   if (!domain) return email;
//   const visible = local.slice(0, Math.max(1, local.length - 4));
//   return `${visible}****@${domain}`;
// };

// export default function EmailAuthModal({
//   type,
//   email,
//   onConfirm,
//   onLogin,
// }: EmailAuthModalProps) {
//   const isSend = type === "send";
//   const isVerify = type === "verify";
//   const isAlready = type === "already";
//   const isHelp = type === "help";

//   const isBlackButton = isHelp;

//   const buttonText = isHelp
//     ? "채널 문의 바로가기"
//     : isAlready
//       ? "로그인하기"
//       : "확인";
//   const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

//   const handleOpenKakao = () => {
//     window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
//   };
//   return (
//     <>
//       {/* 배경 오버레이 */}
//       <div
//         className="bg-black-overlay fixed inset-0 z-[100]"
//         onClick={onConfirm} // 배경 클릭 시 닫히게 하고 싶으면 유지
//       />
//       <div
//         className="bg-gray-0 fixed left-1/2 z-[110] -translate-x-1/2 rounded-[10px]"
//         style={{
//           top: isHelp ? 308 : isSend ? 359 : 343,
//           width: isHelp ? 256 : 240,
//           minHeight: isHelp ? 236 : isSend ? 134 : 166,
//           paddingTop: isHelp ? 25 : 35,
//           paddingRight: 28,
//           paddingBottom: 25,
//           paddingLeft: 28,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 16,
//         }}
//       >
//         {/* 인증번호 발송 안됨 아이콘 */}
//         {isHelp && (
//           <img
//             src={CautionIcon}
//             alt="주의"
//             className="mb-2 h-[20px] w-[20px]"
//           />
//         )}
//         {/* 메인 메시지 */}
//         <p
//           className={`typo-body2 text-center leading-[20px] whitespace-pre-wrap ${isHelp ? "-mt-[6px]" : ""}`}
//         >
//           {isSend && "인증번호가 발송되었어요"}
//           {isVerify && "인증에 성공하였습니다"}
//           {isAlready && "이미 가입된 계정이 있어요"}
//           {isHelp &&
//             "통신 환경에 따라\n발송이 지연되거나 차단될 수 있어요.\n\n스팸 메일함을 확인하시거나,\n잠시 후 다시 시도해주세요."}
//         </p>

//         {/* 마스킹된 이메일 표시 */}
//         {(isVerify || isAlready) && email && (
//           <p className="text-center text-[12px] text-gray-50">
//             {maskEmail(email)}
//           </p>
//         )}

//         {isHelp && (
//           <p className="text-center text-[12px] text-gray-50">
//             문제가 지속되나요?
//           </p>
//         )}

//         {/* 버튼 */}
//         <Button
//           size="S"
//           onClick={isAlready ? onLogin : isHelp ? handleOpenKakao : onConfirm}
//           className={` ${isBlackButton ? "!bg-gray-80 !w-[200px]" : "!bg-green !w-[184px]"} `}
//         >
//           {buttonText}
//         </Button>
//       </div>
//     </>
//   );
// }

import CautionIcon from "@/assets/signup/icon_caution.svg?react";
import Button from "@/components/ui/Button";

export type EmailAuthModalType = "send" | "verify" | "already" | "help";

interface EmailAuthModalProps {
  type: EmailAuthModalType;
  email?: string;
  onConfirm: () => void;
  onLogin?: () => void;
}

const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!domain) return email;

  // 1. 아이디가 4글자 이하로 너무 짧은 경우
  if (local.length <= 4) {
    // 글자 수만큼 정확히 '*'을 반복해서 채워줍니다. (ex: 3글자면 ***)
    return `${"*".repeat(local.length)}@${domain}`;
  }

  // 2. 아이디가 5글자 이상일 때 (기존 로직 유지)
  // 뒤에서 4글자를 제외한 만큼만 살리고, 뒤에는 ****를 붙입니다.
  const visible = local.slice(0, local.length - 4);
  return `${visible}****@${domain}`;
};

// 피그마 UI 설정을 위한 객체 맵핑
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
  already: {
    title: "이미 가입한 계정이 있어요",
    buttonText: "로그인하기",
    variant: "green" as const,
  },
  help: {
    title:
      "통신 환경에 따라\n발송이 지연되거나 차단될 수 있어요.\n스팸 메일함을 확인하시거나,\n잠시 후 다시 시도해주세요.",
    buttonText: "채널 문의 바로가기",
    variant: "black" as const,
  },
} as const;

export default function EmailAuthModal({
  type,
  email,
  onConfirm,
  onLogin,
}: EmailAuthModalProps) {
  const config = modalConfig[type];

  const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

  const handleOpenKakao = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  const handleButtonClick = () => {
    if (type === "already" && onLogin) {
      onLogin();
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
        onClick={onConfirm}
      />

      {/* 피그마 공통 규격 적용된 모달창 (화면 정중앙 정렬) */}
      <div className="bg-gray-0 shadow-container fixed top-1/2 left-1/2 z-[110] flex w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl p-6">
        {/* 상단 내용 영역 (gap: 12px) */}
        <div className="flex w-full flex-col items-center gap-3">
          {/* 아이콘 영역 (help 일 때만 노출) */}
          {type === "help" && (
            <div className="flex items-start justify-center gap-2">
              <CautionIcon className="text-gray-80 h-5 w-5" />
            </div>
          )}

          {/* 텍스트 영역 (gap: 8px) */}
          <div className="flex w-full flex-col items-center gap-2">
            {/* 메인 제목 (Body/L Strong) */}
            <p className="typo-l-strong text-gray-80 s-stretch text-center whitespace-pre-wrap">
              {config.title}
            </p>

            {/* 마스킹된 이메일 (verify, already 일 때 / Body/M) */}
            {(type === "verify" || type === "already") && email && (
              <p className="typo-m text-gray-80 s-stretch text-center">
                {maskEmail(email)}
              </p>
            )}

            {/* 하단 서브 안내 (help 일 때 / Body/M) */}
            {type === "help" && (
              <p className="typo-m text-gray-80 s-stretch text-center">
                문제가 지속되나요?
              </p>
            )}
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <Button
          size="S"
          variant={config.variant}
          onClick={handleButtonClick}
          className="w-full"
        >
          {config.buttonText}
        </Button>
      </div>
    </>
  );
}
