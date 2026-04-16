import veg from "../assets/fridge/items/vegatable.svg";
import fruit from "../assets/fridge/items/fruit.svg";
import meat from "../assets/fridge/items/meat.svg";
import fish from "../assets/fridge/items/fish.svg";
import egg from "../assets/fridge/items/egg.svg";
import rice from "../assets/fridge/items/rice.svg";
import bread from "../assets/fridge/items/bread.svg";
import salt from "../assets/fridge/items/salt.svg";
import simple from "../assets/fridge/items/simple.svg";
import candy from "../assets/fridge/items/candy.svg";
import drink from "../assets/fridge/items/drink.svg";
import ferment from "../assets/fridge/items/fermented.svg";
import bean from "../assets/fridge/items/bean.svg";
import elseIcon from "../assets/fridge/items/else.svg";

export interface CategoryItem {
  id: number;
  name: string;
  image: string;
  serverKey: string;
}

export const INGREDIENT_CATEGORIES: CategoryItem[] = [
  { id: 1, name: "채소", image: veg, serverKey: "VEGETABLE" },
  { id: 2, name: "과일", image: fruit, serverKey: "FRUIT" },
  { id: 3, name: "육류", image: meat, serverKey: "MEAT" },
  { id: 4, name: "해산물", image: fish, serverKey: "SEAFOOD" },
  { id: 5, name: "유제품 · 계란", image: egg, serverKey: "DAIRY_EGG" },
  {
    id: 6,
    name: "곡물 · 쌀 · 면",
    image: rice,
    serverKey: "GRAIN_RICE_NOODLE",
  },
  { id: 7, name: "베이커리", image: bread, serverKey: "BAKERY" },
  {
    id: 8,
    name: "양념 · 소스 · 조미료",
    image: salt,
    serverKey: "SEASONING_SAUCE",
  },
  { id: 9, name: "즉석 · 간편식", image: simple, serverKey: "READY_MEAL" },
  { id: 10, name: "과자 · 디저트", image: candy, serverKey: "SNACK_DESSERT" },
  { id: 11, name: "음료", image: drink, serverKey: "BEVERAGE" },
  { id: 12, name: "절임 · 발효", image: ferment, serverKey: "FERMENTED" },
  { id: 13, name: "콩류", image: bean, serverKey: "BEANS" },
  { id: 14, name: "기타", image: elseIcon, serverKey: "ETC" },
];

export const CATEGORY_ID_TO_SERVER_KEY = Object.fromEntries(
  INGREDIENT_CATEGORIES.map((c) => [c.id, c.serverKey]),
);

export const CATEGORY_SERVER_KEY_TO_NAME = Object.fromEntries(
  INGREDIENT_CATEGORIES.map((c) => [c.serverKey, c.name]),
);
