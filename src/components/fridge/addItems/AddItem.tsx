import { useEffect, useMemo, useState } from "react";

import {
  IngredientType,
  type MasterIngredientListResponse,
  StorageType,
  UnitType,
  getMasterIngredientList,
  getRecentIngredients,
} from "@/api/ingredient";
import { loadingChar } from "@/assets";
import {
  type MasterItem,
  useAddIngredientStore,
} from "@/stores/useAddIngredientStore";

import defaultChar from "@/assets/character/default_char.svg";
import searchIcon from "@/assets/fridge/search_on.svg";

import TextField from "@/components/ui/TextField";

import { INGREDIENT_CATEGORIES } from "@/constants/category";
import { DEFAULT_EXPIRY_DAYS } from "@/constants/expiry";

import { calculateExpiryDate } from "@/utils/expiryDate";

import AddItemFooter from "./AddItemFooter";
import Category from "./components/Category";
import Custom from "./components/Custom";
import ItemsGrid from "./components/ItemsGrid";

export default function AddItem() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setCategoryId,
    setHistoryItems,
    isModalOpen,
    setModalOpen,
    toggleItem,
  } = useAddIngredientStore();

  const [masterItems, setMasterItems] = useState<MasterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteLocal = (id: number | string) => {
    setMasterItems(prev => prev.filter(item => item.id !== id));
  };

  const parseMasterData = (
    data: MasterIngredientListResponse,
  ): MasterItem[] => {
    return data.categories.flatMap(cat => {
      const categoryInfo =
        INGREDIENT_CATEGORIES.find(tc => tc.serverKey === cat.category) ||
        INGREDIENT_CATEGORIES[12];

      return cat.ingredients.map(ing => {
        const days = DEFAULT_EXPIRY_DAYS[cat.category] || 7;
        const defaultStorage: StorageType =
          cat.category === "MEAT" || cat.category === "SEAFOOD"
            ? "FREEZER"
            : "FRIDGE";

        return {
          id: ing.id,
          referenceId: ing.id,
          name: ing.name,
          image: ing.imageUrl,
          categoryId: categoryInfo.id,
          type: (ing.type || "DEFAULT") as IngredientType,

          // 서버 응답에 없으므로 프론트 기본값 매핑
          storageType: defaultStorage,
          unit: "PIECE" as UnitType,
          expiration: calculateExpiryDate(days),
          quantity: 1,
          memo: "",
        };
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [masterRes, recentRes] = await Promise.all([
          getMasterIngredientList(),
          getRecentIngredients(),
        ]);

        let allMasterItems: MasterItem[] = [];
        if (masterRes.data && masterRes.data.data) {
          const parsed = parseMasterData(masterRes.data.data);
          setMasterItems(parsed);
          allMasterItems = parsed;
        }
        if (recentRes.data && recentRes.data.data) {
          const recentIngredients = recentRes.data.data.ingredients.map(ing => {
            const fullInfo = allMasterItems.find(
              m => m.id === ing.ingredientId,
            );

            return {
              id: ing.ingredientId,
              referenceId: ing.ingredientId,
              name: ing.name,
              image: ing.imageUrl,
              type: ing.type as IngredientType,
              categoryId: fullInfo?.categoryId || 14,
              storageType: fullInfo?.storageType || ("FRIDGE" as StorageType),
              unit: fullInfo?.unit || ("PIECE" as UnitType),
              expiration: fullInfo?.expiration || calculateExpiryDate(7),
              quantity: 1,
              memo: "",
            };
          });

          setHistoryItems(recentIngredients);
        }
      } catch (error) {
        console.error("데이터 연동 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setHistoryItems]);

  const filteredItems = useMemo(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase();

    if (trimmedSearch.length > 0) {
      return masterItems.filter(item =>
        item.name.toLowerCase().includes(trimmedSearch),
      );
    }
    return masterItems.filter(
      item => Number(item.categoryId) === Number(selectedCategoryId),
    );
  }, [masterItems, searchTerm, selectedCategoryId]);

  if (isLoading)
    return (
      <div className="mt-50 flex flex-col items-center justify-center text-center">
        <img className="w-30 p-5 opacity-70" src={loadingChar} />
        <div className="typo-body2 text-zinc-500">식재료를 불러오는 중...</div>
      </div>
    );

  return (
    <>
      <div className="w-full flex flex-col items-center mt-1 h-full overflow-hidden">
        <div className="shrink-0 [&_p]:hidden [&_input]:border-none [&_input]:outline-none [&_input::placeholder]:text-gray-30 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
          <TextField
            value={searchTerm}
            placeholder="재료명을 검색하세요"
            onChange={value => setSearchTerm(value)}
            rightIcon={<img src={searchIcon} className="" />}
          />
        </div>
        <div className="mt-4 w-[401px] shrink-0 pl-[31px]">
          <div className="no-scrollbar flex gap-[6px] overflow-x-auto scroll-smooth pr-8 pb-2">
            {INGREDIENT_CATEGORIES.map(category => (
              <div key={category.id} className="flex-shrink-0">
                <Category
                  name={category.name}
                  image={category.image}
                  isSelected={selectedCategoryId === category.id}
                  onSelect={() => setCategoryId(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="no-scrollbar min-h-0 w-full flex-1 overflow-y-auto scroll-smooth">
          <ItemsGrid items={filteredItems} onDeleteLocal={handleDeleteLocal} />
        </div>
        <div className="w-full shrink-0 pt-35">
          <AddItemFooter />
        </div>
      </div>
      {isModalOpen && (
        <Custom
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          categories={INGREDIENT_CATEGORIES}
          onConfirm={(serverData: any) => {
            const newId =
              serverData?.customIngredientId ||
              serverData?.data?.customIngredientId;
            const finalName =
              serverData?.name || serverData?.data?.name || searchTerm;
            const finalImage =
              serverData?.imageUrl || serverData?.data?.imageUrl || defaultChar;

            if (!newId) {
              alert("식재료 등록 중 오류가 발생했습니다.");
              return;
            }

            const selectedCat = INGREDIENT_CATEGORIES.find(
              c => c.id === selectedCategoryId,
            );
            const serverKey = selectedCat?.serverKey || "ETC";
            const defaultDays = DEFAULT_EXPIRY_DAYS[serverKey] || 7;
            const newCustomItem: MasterItem = {
              id: newId,
              referenceId: newId,
              name: finalName,
              image: finalImage,
              categoryId: selectedCategoryId || 13,
              type: "CUSTOM" as const,
              storageType: "FRIDGE" as const,
              unit: "PIECE" as const,
              expiration: calculateExpiryDate(defaultDays),
              quantity: 1,
              memo: "",
            };
            toggleItem(newCustomItem);
            setMasterItems(prev => [newCustomItem, ...prev]);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
