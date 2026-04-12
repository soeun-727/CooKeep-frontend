import { useEffect, useState } from "react";
import SettingsToggleItem from "../components/SettingsToggleItem";
import ConfirmModal from "../../ui/ConfirmModal";
import { updateMarketingPush } from "../../../api/user";

type Props = {
  marketingPush: boolean;
};

export default function NotificationSection({ marketingPush }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [enabled, setEnabled] = useState(marketingPush);

  useEffect(() => {
    setEnabled(marketingPush);
  }, [marketingPush]);

  // 토글 핸들러
  const handleToggle = (next: boolean) => {
    if (!enabled && next) {
      setShowConfirm(true);
      return;
    }

    updatePush(next);
  };

  // 실제 API 호출
  const [loading, setLoading] = useState(false);

  const updatePush = async (next: boolean) => {
    if (loading) return;

    const prev = enabled;
    setEnabled(next);
    setLoading(true);

    try {
      await updateMarketingPush(next);
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
