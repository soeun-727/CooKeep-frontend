import line from "../../../assets/login/Line.png";

import { useNavigate } from "react-router-dom";

export default function LoginFooter() {
  const navigate = useNavigate();

  return (
    <>
      {/* 하단 메뉴 */}
      <div className="flex items-center justify-center gap-[18px] mt-[39px]">
        <button className="typo-label" onClick={() => navigate("/findpw")}>
          비밀번호 찾기
        </button>
        <img src={line} alt="구분선" />
        <button className="typo-label" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </div>

      {/* 최하단 */}
      {/* <div className="mt-8 flex flex-col items-center justify-center">
        <div className="flex justify-center gap-4">
          <span className="typo-caption">전화번호를 변경했어요</span>
          <button
            onClick={() => navigate("/support")}
            className="typo-caption underline"
          >
            고객센터
          </button>
        </div>
      </div> */}
    </>
  );
}
