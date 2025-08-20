import { ProductType } from '@prisma/client';

export type ProductSpecs = Record<string, string | number | boolean>;

export interface ProductPageType {
  id: string;
  name: string;
  slug: string;
  brand: string;
  imageUrl: string;
  productType: ProductType;
  shortDescription: string;
  longDescription: string;
  price: number;
  stockCount: number;
  isOnSale: boolean;
  reducedPrice: number | null;
  oneStarReviews: number;
  twoStarReviews: number;
  threeStarReviews: number;
  fourStarReviews: number;
  fiveStarReviews: number;
  averageRating: number;
  totalRatingCount: number;
  specs: ProductSpecs;
}

export interface ProductCardType extends ProductCartWishlistType {
  averageRating: number;
  totalRatingCount: number;
}

export interface ProductCartWishlistType {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  isOnSale: boolean;
  reducedPrice: number | null;
  averageRating: number;
  totalRatingCount: number;
}
