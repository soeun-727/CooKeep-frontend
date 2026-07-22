import { useState } from "react";

import { updatePushConsent } from "@/api/onboarding";
import { registerPushNotification } from "@/api/push";

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
    <div className="bg-background relative mx-auto flex h-screen w-full flex-col overflow-hidden px-4">
      <div className="mt-25 flex shrink-0 flex-col gap-2">
        <h1 className="typo-h2 text-left">
          쿠킵 루틴,
          <br />
          알림으로 받아보시겠어요?
        </h1>
        <p className="typo-l text-left break-keep text-gray-50">
          까먹지 않게 필요한 순간에만 도와드릴게요
          <br />
          언제든지 설정에서 변경할 수 있어요!
        </p>
      </div>

      <div className="relative mt-14 flex h-75 flex-1 flex-col items-center justify-start overflow-hidden">
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

      <div className="bg-background fixed bottom-0 left-1/2 z-50 w-full max-w-[450px] -translate-x-1/2 px-4">
        {/* <div className="flex justify-end">
          <img src={char} className="mb-[26.5px] w-[95px]" alt="character" />
        </div> */}
        <div className="flex flex-col gap-2">
          <Button
            size="L"
            variant="green"
            onClick={() => handlePushConsent(true)}
            disabled={isLoading}
          >
            알림을 켤게요
          </Button>
          <Button
            size="S"
            className="!bg-gray-30"
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
