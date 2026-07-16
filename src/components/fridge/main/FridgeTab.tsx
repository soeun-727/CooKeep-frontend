import { useCallback, useEffect, useMemo, useState } from "react";

import { getRefrigeratorHome } from "@/api/ingredient";
import { getPushEligibility } from "@/api/user";
import { useIngredientStore } from "@/stores/useIngredientStore";

import { FreezerIcon, FridgeIcon, PantryIcon } from "@/assets/index";

import { useSortedIngredients } from "@/hooks/useSortedIngredients";

import Search from "../features/Search";
import Sort from "../features/Sort";
import IngredientGrid from "../items/IngredientGrid";
import ItemOption from "../items/ItemOption";
import NoResultView from "../items/NoResultView";
import ExpiryAlertModal from "../modals/ExpiryAlertModal";
import IngredientDetailModal from "../modals/IngredientDetailModal";
import Storage from "./Storage";
import LoadingScreen from "@/components/ui/LoadingScreen";

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
          const hasTodayItems = parsed.some(i => i.dDay === 0);
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
    () => ingredients.filter(i => i.dDay === 0),
    [ingredients],
  );
  const selectedIngredient = useMemo(() => {
    if (!selectedIngredientId) return null;
    return ingredients.find(i => i.id === selectedIngredientId) || null;
  }, [ingredients, selectedIngredientId]);

  const isSearching = searchTerm.trim().length > 0;
  const isListView = !!viewCategory && !isSearching;

  const fridgeItems = useMemo(
    () => ingredients.filter(i => i.category === "냉장"),
    [ingredients],
  );
  const freezerItems = useMemo(
    () => ingredients.filter(i => i.category === "냉동"),
    [ingredients],
  );
  const pantryItems = useMemo(
    () => ingredients.filter(i => i.category === "상온"),
    [ingredients],
  );

  const getCategoryIcon = useCallback((category: string | null) => {
    if (category === "냉동") return FreezerIcon;
    if (category === "상온") return PantryIcon;
    return FridgeIcon;
  }, []);

  const handleCloseExpiryModal = useCallback(
    () => setIsExpiryModalOpen(false),
    [],
  );

  const handleUpdate = useCallback(() => loadData(), [loadData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex w-full flex-col pt-[calc(env(safe-area-inset-top)+3rem)]">
      <Search />
      {isExpiryModalOpen && todayIngredients.length > 0 && (
        <ExpiryAlertModal
          isOpen={isExpiryModalOpen}
          onClose={handleCloseExpiryModal}
          items={todayIngredients}
        />
      )}
      {isSearching &&
        (filteredIngredients.length > 0 ? (
          <IngredientGrid items={filteredIngredients} />
        ) : (
          <div className="flex h-[calc(100dvh-220px)] items-center justify-center pb-10">
            <NoResultView />
          </div>
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
            icon={FridgeIcon}
            ingredients={fridgeItems}
          />
          <Storage
            category="냉동"
            icon={FreezerIcon}
            ingredients={freezerItems}
          />
          <Storage
            category="상온"
            icon={PantryIcon}
            ingredients={pantryItems}
          />
        </div>
      )}
      <ItemOption />
      {selectedIngredient && (
        <IngredientDetailModal
          key={selectedIngredient.id}
          ingredient={selectedIngredient}
          onClose={closeDetail}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
