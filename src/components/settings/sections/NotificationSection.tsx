import { useEffect, useState } from "react";
import SettingsToggleItem from "../components/SettingsToggleItem";
import ConfirmModal from "../../ui/ConfirmModal";
import { updateMarketingPush } from "../../../api/user";
import { registerPushNotification, unsubscribePush } from "../../../api/push";

type Props = {
  marketingPush: boolean;
  onStateChange: (isAgreed: boolean) => void;
};

export default function NotificationSection({
  marketingPush,
  onStateChange,
}: Props) {
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
      // DB 상태 업데이트
      await updateMarketingPush(next);

      if (next) {
        const isSuccess = await registerPushNotification();
        if (!isSuccess) {
          setEnabled(prev);
          await updateMarketingPush(prev);
          alert(
            "알림 권한이 거부되었거나 등록에 실패했습니다. 브라우저 설정을 확인해주세요.",
          );
          return;
        }
      } else {
        await unsubscribePush();
      }

      onStateChange(next);
    } catch (error) {
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
    <section className="px-4 mt-[26px]">
      <SettingsToggleItem
        label="Push 수신 동의"
        checked={enabled}
        onChange={handleToggle}
      />

      {showConfirm && (
        <ConfirmModal
          message="Push 수신에 동의하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
}
