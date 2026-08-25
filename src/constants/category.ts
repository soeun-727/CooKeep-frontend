import type { ComponentType, SVGProps } from "react";

import Bean from "@/assets/fridge/items/bean.svg?react";
import Bread from "@/assets/fridge/items/bread.svg?react";
import Candy from "@/assets/fridge/items/candy.svg?react";
import Drink from "@/assets/fridge/items/drink.svg?react";
import Egg from "@/assets/fridge/items/egg.svg?react";
import ElseIcon from "@/assets/fridge/items/else.svg?react";
import Ferment from "@/assets/fridge/items/fermented.svg?react";
import Fish from "@/assets/fridge/items/fish.svg?react";
import Fruit from "@/assets/fridge/items/fruit.svg?react";
import Meat from "@/assets/fridge/items/meat.svg?react";
import Rice from "@/assets/fridge/items/rice.svg?react";
import Salt from "@/assets/fridge/items/salt.svg?react";
import Simple from "@/assets/fridge/items/simple.svg?react";
import Veg from "@/assets/fridge/items/vegatable.svg?react";

export interface CategoryItem {
  id: number;
  name: string;
  image: ComponentType<SVGProps<SVGSVGElement>>;
  serverKey: string;
}

export const INGREDIENT_CATEGORIES: CategoryItem[] = [
  { id: 1, name: "채소", image: Veg, serverKey: "VEGETABLE" },
  { id: 2, name: "과일", image: Fruit, serverKey: "FRUIT" },
  { id: 3, name: "육류", image: Meat, serverKey: "MEAT" },
  { id: 4, name: "해산물", image: Fish, serverKey: "SEAFOOD" },
  { id: 5, name: "유제품 · 계란", image: Egg, serverKey: "DAIRY_EGG" },
  {
    id: 6,
    name: "곡물 · 쌀 · 면",
    image: Rice,
    serverKey: "GRAIN_RICE_NOODLE",
  },
  { id: 7, name: "베이커리", image: Bread, serverKey: "BAKERY" },
  {
    id: 8,
    name: "양념 · 소스 · 조미료",
    image: Salt,
    serverKey: "SEASONING_SAUCE",
  },
  { id: 9, name: "즉석 · 간편식", image: Simple, serverKey: "READY_MEAL" },
  { id: 10, name: "과자 · 디저트", image: Candy, serverKey: "SNACK_DESSERT" },
  { id: 11, name: "음료", image: Drink, serverKey: "BEVERAGE" },
  { id: 12, name: "절임 · 발효", image: Ferment, serverKey: "FERMENTED" },
  { id: 13, name: "콩류", image: Bean, serverKey: "BEANS" },
  { id: 14, name: "기타", image: ElseIcon, serverKey: "ETC" },
];

export const CATEGORY_ID_TO_SERVER_KEY = Object.fromEntries(
  INGREDIENT_CATEGORIES.map(c => [c.id, c.serverKey]),
);

export const CATEGORY_SERVER_KEY_TO_NAME = Object.fromEntries(
  INGREDIENT_CATEGORIES.map(c => [c.serverKey, c.name]),
);
