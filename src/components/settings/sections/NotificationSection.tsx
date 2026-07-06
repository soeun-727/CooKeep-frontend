import { useEffect, useState } from "react";

import { registerPushNotification, unsubscribePush } from "@/api/push";
import { updateMarketingPush } from "@/api/user";

import SettingsToggleItem from "@/components/settings/components/SettingsToggleItem";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface NotificationSectionProps {
  marketingPush: boolean;
  onStateChange: (isAgreed: boolean) => void;
}

export default function NotificationSection({
  marketingPush,
  onStateChange,
}: NotificationSectionProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [enabled, setEnabled] = useState(marketingPush);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEnabled(marketingPush);
  }, [marketingPush]);

  const handleToggle = (next: boolean) => {
    if (!enabled && next) {
      setShowConfirm(true);
      return;
    }
    updatePush(next);
  };

  const updatePush = async (next: boolean) => {
    if (loading) return;

    const prev = enabled;
    setEnabled(next);
    setLoading(true);

    try {
      if (next) {
        const isSuccess = await registerPushNotification();
        if (!isSuccess) {
          setEnabled(prev);
          alert("알림 권한이 거부되었거나 등록에 실패했습니다.");
          return;
        }
      } else {
        await unsubscribePush();
      }

      await updateMarketingPush(next);

      onStateChange(next);
    } catch {
      setEnabled(prev);
      alert("푸시 설정 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    await updatePush(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <section className="flex w-full flex-col items-start gap-1">
      {/* 알림 라벨 */}
      <div className="flex w-full items-center gap-2 py-1">
        <span className="typo-l-strong text-gray-30 flex-1">알림 설정</span>
      </div>

      {/* 내용 + 토글 */}
      <div className="flex h-10 w-full items-center justify-between py-[2px]">
        <span className="typo-l-strong text-gray-80">PUSH 수신 동의</span>
        <SettingsToggleItem checked={enabled} onChange={handleToggle} />
      </div>

      {showConfirm && (
        <ConfirmModal
          message="PUSH 수신에 동의하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
}
