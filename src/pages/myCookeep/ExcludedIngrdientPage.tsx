import Preference from "@/components/auth/onboarding/Preference";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

const ExcludedIngredientPage = () => {
  return (
    <section className="flex h-full flex-col px-4">
      <BackHeader title="못 먹는 재료 수정" />
      <div className="mt-15 flex flex-1">
        <Preference />
      </div>
      <Button variant="black" size="L">
        수정완료
      </Button>
    </section>
  );
};
export default ExcludedIngredientPage;
