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
      // 1️⃣ [수정] 푸시 연동/해제를 먼저 시도합니다.
      if (next) {
        const isSuccess = await registerPushNotification();
        if (!isSuccess) {
          setEnabled(prev);
          alert("알림 권한이 거부되었거나 등록에 실패했습니다.");
          return;
        }
      } else {
        // 🚀 토글을 끌 때 서버 DB에서 구독 정보를 먼저 확실히 지웁니다.
        await unsubscribePush();
      }

      // 2️⃣ [수정] 위 작업이 성공했을 때만 마케팅 동의 상태를 업데이트합니다.
      await updateMarketingPush(next);

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
        label="PUSH 수신 동의"
        checked={enabled}
        onChange={handleToggle}
      />

      {showConfirm && (
        <ConfirmModal
          message="마케팅 수신에 동의하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
}
