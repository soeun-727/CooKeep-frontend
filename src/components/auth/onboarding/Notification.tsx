import { useState } from "react";
import Button from "../../ui/Button";
import ExampleNotification from "./ExampleNotification";
import char from "../../../assets/character/noti_char.svg";
import { updatePushConsent } from "../../../api/onboarding";
import { registerPushNotification } from "../../../api/push";

const EXAMPLE_DATA = [
  {
    title: "유통기한 임박 🚨",
    description: "두부 유통기한이 하루 남았어요!\n지금 요리하러 가볼까요?",
  },
  {
    title: "주간 목표 달성 🎉",
    description:
      "'주 3회 요리하기' 목표를 달성했어요\n쿠키 리워드를 확인해보세요!",
  },
  {
    title: "식물에 물 줄 시간 🌱",
    description:
      "토마토가 시들고 있어요\n보유하신 쿠키를 사용해 물을 줄 수 있어요",
  },
  {
    title: "오늘의 쿠킵 레시피 🍳",
    description:
      "지금 있는 재료로 만들 수 있는 요리가 있어요\n지금 레시피를 확인해보세요!",
  },
];

interface Props {
  onNext: () => void;
}

export default function Notification({ onNext }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const INFINITE_DATA = [...EXAMPLE_DATA, ...EXAMPLE_DATA];

  const handlePushConsent = async (isAgreed: boolean) => {
    setIsLoading(true);
    try {
<<<<<<< HEAD
      await updatePushConsent(isAgreed);
      if (isAgreed) {
        const isSuccess = await registerPushNotification();
        if (!isSuccess) {
          console.warn(
            "브라우저 알림 권한이 거부되었거나 등록에 실패했습니다.",
          );
        }
      }
=======
      if (isAgreed) {
        // 동의 → onboarding API
        await updatePushConsent();
      }
      // false일 때는 아무 것도 안함
>>>>>>> 2c67b134010bf66f6eab2df3a738c518042e75a5
    } catch (error) {
      console.error("알림 설정 실패:", error);
    } finally {
      setIsLoading(false);
      onNext();
    }
  };

  return (
    <div className="flex flex-col w-[361px] mx-auto h-screen overflow-hidden relative bg-[#fafafa]">
      <div className="mt-[107px] shrink-0">
        <h1 className="typo-h1 text-left">
          쿠킵 루틴, 알림으로 받아보시겠어요?
        </h1>
        <p className="typo-body2 text-gray-500 mt-1 text-left break-keep">
          유통기한 임박, 주간 목표, 물 주기처럼 까먹지 않게
          <br />
          필요한 순간에만 도와드릴게요.
          <br />
          언제든지 설정에서 변경할 수 있어요.
        </p>
      </div>

      <div
        className="relative flex flex-col items-center justify-start overflow-hidden mt-14"
        style={{
          height: "calc(100dvh - 500px)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#fafafa] to-transparent z-10" />
        <div className="flex flex-col gap-[6px] animate-roll">
          {INFINITE_DATA.map((data, index) => (
            <ExampleNotification
              key={index}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fafafa] to-transparent z-10" />
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[361px] bg-[#fafafa] z-50 pb-[34px]">
        <div className="flex justify-end">
          <img src={char} className="w-[95px] mb-[26.5px]" alt="character" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            size="S"
            variant="black"
            onClick={() => handlePushConsent(true)}
            disabled={isLoading}
          >
            알림을 켤게요
          </Button>
          <Button
            size="S"
            className="!bg-gray-300"
            onClick={() => handlePushConsent(false)}
            disabled={isLoading}
          >
            괜찮아요
          </Button>
        </div>
      </div>
    </div>
  );
}
