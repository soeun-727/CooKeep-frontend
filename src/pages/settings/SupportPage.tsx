import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import image from "../../assets/settings/cs.svg";

export default function SupportPage() {
  const navigate = useNavigate();
  const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xfSKxhX";

  const handleOpenKakao = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* 헤더 */}
      <BackHeader title="고객센터" onBack={() => navigate(-1)} />

      <main className="pt-[97px] px-4 flex flex-col relative gap-12">
        {/* 상단 텍스트 */}
        <section className="">
          <h2 className="typo-h1 !text-[22px] text-left">
            무엇을 도와드릴까요?
          </h2>

          <p className="typo-body2 text-[#7D7D7D]">
            아래 카카오톡 채널로 문의사항을 전송해 주시면
            <br />
            순차적으로 확인 후 안내드릴게요
          </p>
        </section>
        <img src={image} className="h-35" />
        {/* 이메일 버튼 */}
        <button
          onClick={handleOpenKakao}
          className="
    flex items-center justify-center
    h-[56px]
    rounded-[10px]
    bg-[#202020]
    typo-body
    text-[white]
  "
        >
          채널 문의 바로가기
        </button>

        {/* 운영 시간 안내 */}
        <p className="-mt-[23px] typo-caption text-[#7D7D7D]">
          운영 시간: 평일 10:00–18:00 (주말·공휴일 제외)
          <br />
          영업일 기준 2–3일 이내에 답변드려요
        </p>
      </main>
    </>
  );
}
