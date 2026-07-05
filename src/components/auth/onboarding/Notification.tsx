import { useState } from "react";

import { updatePushConsent } from "@/api/onboarding";
import { registerPushNotification } from "@/api/push";

import char from "@/assets/character/noti_char.svg";

import Button from "@/components/ui/Button";

import { NOTI_EXAMPLE_DATA } from "@/constants/onboarding";

import ExampleNotification from "./ExampleNotification";

interface NotificationProps {
  onNext: () => void;
}

export default function Notification({ onNext }: NotificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const INFINITE_DATA = [...NOTI_EXAMPLE_DATA, ...NOTI_EXAMPLE_DATA];

  const handlePushConsent = async (isAgreed: boolean) => {
    setIsLoading(true);
    try {
      if (isAgreed) {
        const isSuccess = await registerPushNotification();

        if (isSuccess) {
          await updatePushConsent(true);
        } else {
          await updatePushConsent(false);
          alert(
            "알림 권한이 거부되었습니다. 원활한 이용을 위해 브라우저 설정을 확인해주세요.",
          );
        }
      } else {
        await updatePushConsent(false);
      }
    } catch (error) {
      console.error("알림 설정 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
      onNext();
    }
  };

  return (
    <div className="bg-background relative mx-auto flex h-screen w-[361px] flex-col overflow-hidden">
      <div className="mt-[107px] shrink-0">
        <h1 className="typo-h1 text-left">
          쿠킵 루틴, 알림으로 받아보시겠어요?
        </h1>
        <p className="typo-body2 mt-1 text-left break-keep text-gray-500">
          유통기한 임박, 주간 목표, 물 주기처럼 까먹지 않게
          <br />
          필요한 순간에만 도와드릴게요.
          <br />
          언제든지 설정에서 변경할 수 있어요.
        </p>
      </div>

      <div
        className="relative mt-14 flex flex-col items-center justify-start overflow-hidden"
        style={{
          height: "calc(100dvh - 500px)",
        }}
      >
        <div className="bg-blur-to-t absolute top-0 left-0 z-10 h-12 w-full" />
        <div className="animate-roll flex flex-col gap-[6px]">
          {INFINITE_DATA.map((data, index) => (
            <ExampleNotification
              key={index}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
        <div className="bg-blur-to-b absolute bottom-0 left-0 z-10 h-12 w-full" />
      </div>

      <div className="bg-background fixed bottom-0 left-1/2 z-50 w-[361px] -translate-x-1/2 pb-[34px]">
        <div className="flex justify-end">
          <img src={char} className="mb-[26.5px] w-[95px]" alt="character" />
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
