import { useNavigate } from "react-router-dom";

import Preference from "@/components/auth/onboarding/Preference";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

// TODO: Preference 컴포넌트에서 못먹는 재료 GET API 연결 후, 수정 완료 버튼 클릭 시 PUT API 호출하도록 구현 필요
const ExcludedIngredientPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex h-full flex-col px-4">
      <BackHeader title="못 먹는 재료 수정" />
      <div className="mt-15 flex flex-1">
        <Preference />
      </div>
      <Button variant="black" size="L" onClick={() => navigate("/mycookeep")}>
        수정완료
      </Button>
    </section>
  );
};
export default ExcludedIngredientPage;
