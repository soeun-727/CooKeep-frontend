import DessertImg from "@/assets/recipe/select/dessert.svg";
import FriedImg from "@/assets/recipe/select/fried.svg";
import HealthyImg from "@/assets/recipe/select/healthy.svg";
import NoodlesImg from "@/assets/recipe/select/noodles.svg";
import RiceImg from "@/assets/recipe/select/rice.svg";
import SoupImg from "@/assets/recipe/select/soup.svg";

export const DIFFICULTY_OPTIONS = [
  {
    key: "SOUP_STEW",
    title: "Soup",
    desc: "국물류",
    image: SoupImg,
  },
  {
    key: "RICE_BOWL",
    title: "Rice",
    desc: "밥류",
    image: RiceImg,
  },
  {
    key: "NOODLE",
    title: "Noodles",
    desc: "면류",
    image: NoodlesImg,
  },
  {
    key: "STIR_FRY_GRILL",
    title: "Fried",
    desc: "볶음 · 구이",
    image: FriedImg,
  },
  {
    key: "SALAD_HEALTHY",
    title: "Healthy",
    desc: "건강식",
    image: HealthyImg,
  },
  {
    key: "SNACK_DESSERT",
    title: "Dessert",
    desc: "디저트",
    image: DessertImg,
  },
] as const;
