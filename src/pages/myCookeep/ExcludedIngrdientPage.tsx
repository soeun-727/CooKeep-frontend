import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";

import {
  OnboardingIngredient,
  getOnboardingIngredients,
} from "@/api/onboarding";
import {
  getDislikeIngredientList,
  updateDislikeIngredientList,
} from "@/api/user";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

import Preference from "@/components/auth/onboarding/Preference";
import ConfirmModal from "@/components/fridge/modals/ConfirmModal";
import { BackHeader } from "@/components/ui/BackHeader";
import Button from "@/components/ui/Button";

const ExcludedIngredientPage = () => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allIngredients, setAllIngredients] = useState<OnboardingIngredient[]>(
    [],
  );
  const [dislikedIngredients, setDislikedIngredients] = useState<
    OnboardingIngredient[]
  >([]);
  const { selectedIngredients } = useOnboardingStore();

  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    const fetchIngredients = async () => {
      try {
        const [ingredientsRes, dislikeRes] = await Promise.all([
          getOnboardingIngredients(),
          getDislikeIngredientList(),
        ]);

        const catalog = ingredientsRes.data?.data?.ingredients ?? [];
        if (!isActive) return;
        setAllIngredients(catalog);

        const dislikedNames = dislikeRes.dislikedIngredients ?? [];
        const selected: OnboardingIngredient[] = dislikedNames.map(
          (name, index) => {
            const matched = catalog.find(item => item.ingredient === name);
            return (
              matched ?? { defaultIngredientId: -(index + 1), ingredient: name }
            );
          },
        );
        setDislikedIngredients(selected);
      } catch (error) {
        console.error("못 먹는 재료 로드 실패:", error);
      }
    };

    fetchIngredients();

    return () => {
      isActive = false;
    };
  }, []);

  const confrimHandler = async () => {
    if (isSubmitting) return;

    const dislikedNames = selectedIngredients.map(item => item.ingredient);

    setIsSubmitting(true);
    try {
      await updateDislikeIngredientList(dislikedNames);
      setIsModalOpen(false);
      navigate("/myCookeep");
    } catch (error) {
      const axiosError = error as AxiosError<{
        code?: string;
        message?: string;
      }>;
      console.error(
        "못 먹는 재료 수정 실패:",
        axiosError.response?.status,
        axiosError.response?.data,
      );
      alert(
        axiosError.response?.data?.message || "수정 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex h-full flex-col px-4">
      <BackHeader title="못 먹는 재료 수정" />
      <div className="mt-15 flex flex-1">
        <Preference
          allIngredients={allIngredients}
          initialSelectedIngredients={dislikedIngredients}
        />
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
