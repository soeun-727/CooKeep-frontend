import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Preference from "@/components/auth/onboarding/Preference";
import ConfirmModal from "@/components/fridge/modals/ConfirmModal";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

// TODO: Preference 컴포넌트에서 못먹는 재료 GET API 연결 후, 수정 완료 버튼 클릭 시 PUT API 호출하도록 구현 필요
const ExcludedIngredientPage = () => {
  const [modalOpen, setIsModalOpen] = useState(false);

  const confrimHandler = () => {
    setIsModalOpen(false);
    navigate("/myCookeep");
  };

  const navigate = useNavigate();
  return (
    <section className="flex h-full flex-col px-4">
      <BackHeader title="못 먹는 재료 수정" />
      <div className="mt-15 flex flex-1">
        <Preference />
      </div>
      <Button variant="black" size="L" onClick={() => setIsModalOpen(true)}>
        수정완료
      </Button>

      {modalOpen && (
        <ConfirmModal
          title="못 먹는 재료를 확정할까요?"
          onConfirm={confrimHandler}
          onCancel={() => setIsModalOpen(false)}
          buttonVariants={["green", "gray"]}
        />
      )}
    </section>
  );
};
export default ExcludedIngredientPage;
