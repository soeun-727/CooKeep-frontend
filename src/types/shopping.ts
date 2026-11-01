export interface ShoppingProduct {
  id: string | number;
  name: string;
  imageUrl?: string;
  price?: number;
  landingUrl: string;
  ingredientId?: string;
}

export interface ShoppingIngredient {
  id: string;
  name: string;
}

export interface ShoppingSectionData {
  id: string;
  title: string;
  ingredients: ShoppingIngredient[];
  products: ShoppingProduct[];
}

export interface ShoppingBannerData {
  imageUrl?: string;
  landingUrl?: string;
  productName?: string;
}

export interface ShoppingMainData {
  recommendations: {
    ingredient: ShoppingIngredient;
    products: ShoppingProduct[];
  }[];
  sections: ShoppingSectionData[];
  banners: ShoppingBannerData[];
}
