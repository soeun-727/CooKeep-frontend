import { useNavigate } from "react-router-dom";

export default function LoginFooter() {
  const navigate = useNavigate();

  return (
    <>
      {/* 하단 메뉴 */}
      <div className="flex items-center justify-center gap-[18px]">
        <button
          onClick={() => navigate("/findpw")}
          className="typo-m text-gray-80 text-center"
        >
          비밀번호 찾기
        </button>

        <div className="bg-gray-30 h-[10px] w-px shrink-0" />

        <button
          onClick={() => navigate("/signup")}
          className="typo-m text-gray-80 w-[77px] text-center"
        >
          회원가입
        </button>
      </div>
    </>
  );
}
