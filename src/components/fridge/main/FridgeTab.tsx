import { useEffect, useMemo, useState, useCallback } from "react";
import Search from "../features/Search";
import Sort from "../features/Sort";
import Storage from "./Storage";
import IngredientGrid from "../items/IngredientGrid";
import NoResultView from "../items/NoResultView";
import ItemOption from "../items/ItemOption";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import { useIngredientStore } from "../../../stores/useIngredientStore";
import { useSortedIngredients } from "../../../hooks/useSortedIngredients";
import ExpiryAlertModal from "../modals/ExpiryAlertModal";
import IngredientDetailModal from "../modals/IngredientDetailModal";
import { getRefrigeratorHome } from "../../../api/ingredient";
import { getPushEligibility } from "../../../api/user";
import { loadingChar } from "../../../assets";

export default function FridgeTab() {
  const { ingredients, setIngredients, searchTerm, viewCategory } =
    useIngredientStore();
  const { selectedIngredientId, closeDetail } = useIngredientStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);
  const EXPIRY_MODAL_KEY = "expiry-alert-last-shown";

  const parseServerData = useCallback((data: any) => {
    const mapItem = (i: any, category: string) => ({
      ...i,
      category,
      id: i.ingredientId || i.id || i.referenceId || 0,
      name: i.name || "이름 없음",
      dDay: i.leftDays ?? 0,
      image: i.imageUrl || "",
      quantity: i.quantity || 1,
      unit: i.unit || "PIECE",
      expiryDate: i.expirationDate || new Date().toISOString().split("T")[0],
      createdAt: i.createdAt || new Date().toISOString(),
    });
    const fridge = (data.fridge || []).map((i: any) => mapItem(i, "냉장"));
    const freezer = (data.freezer || []).map((i: any) => mapItem(i, "냉동"));
    const pantry = (data.pantry || []).map((i: any) => mapItem(i, "상온"));
    return [...fridge, ...freezer, ...pantry];
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getRefrigeratorHome();
      const targetData = response.data.data || response.data;

      if (targetData) {
        const parsed = parseServerData(targetData);
        setIngredients(parsed);

        const today = new Date().toISOString().slice(0, 10);
        const lastShown = localStorage.getItem(EXPIRY_MODAL_KEY);
        if (lastShown !== today) {
          const eligibility = await getPushEligibility();
          const hasTodayItems = parsed.some((i) => i.dDay === 0);
          if (eligibility?.eligible && hasTodayItems) {
            setIsExpiryModalOpen(true);
            localStorage.setItem(EXPIRY_MODAL_KEY, today);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIngredients, parseServerData]);

  useEffect(() => {
    loadData();
  }, []);

  const { filteredIngredients, sortedIngredients } = useSortedIngredients();
  const todayIngredients = useMemo(
    () => ingredients.filter((i) => i.dDay === 0),
    [ingredients],
  );
  const selectedIngredient = useMemo(() => {
    if (!selectedIngredientId) return null;
    return ingredients.find((i) => i.id === selectedIngredientId) || null;
  }, [ingredients, selectedIngredientId]);

  const getCategoryIcon = (category: string | null) => {
    if (category === "냉동") return freezerIcon;
    if (category === "상온") return pantryIcon;
    return fridgeIcon;
  };

  const isSearching = searchTerm.trim().length > 0;
  const isListView = !!viewCategory && !isSearching;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center top-55 bg-[#FAFAFA]">
        <img className="opacity-70 w-30 p-5" src={loadingChar} alt="loading" />
        <div className="typo-body2 text-zinc-500">식재료 가져오는 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col transition-all">
      <Search />
      {isExpiryModalOpen && todayIngredients.length > 0 && (
        <ExpiryAlertModal
          isOpen={isExpiryModalOpen}
          onClose={() => setIsExpiryModalOpen(false)}
          items={todayIngredients}
        />
      )}
      {isSearching &&
        (filteredIngredients.length > 0 ? (
          <IngredientGrid items={filteredIngredients} />
        ) : (
          <NoResultView />
        ))}
      {isListView && (
        <>
          <Sort
            categoryIcon={getCategoryIcon(viewCategory)}
            viewCategory={viewCategory!}
          />
          <IngredientGrid items={sortedIngredients} />
        </>
      )}
      {!isSearching && !viewCategory && (
        <div className="flex flex-col gap-[10px]">
          <Storage
            category="냉장"
            image={fridgeIcon}
            ingredients={ingredients.filter((i) => i.category === "냉장")}
          />
          <Storage
            category="냉동"
            image={freezerIcon}
            ingredients={ingredients.filter((i) => i.category === "냉동")}
          />
          <Storage
            category="상온"
            image={pantryIcon}
            ingredients={ingredients.filter((i) => i.category === "상온")}
          />
        </div>
      )}
      <ItemOption />
      {selectedIngredient && (
        <IngredientDetailModal
          key={selectedIngredient.id}
          ingredient={selectedIngredient}
          onClose={closeDetail}
          onUpdate={() => loadData()}
        />
      )}
    </div>
  );
}
