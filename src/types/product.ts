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
  createdAt: Date;
  categories?: Array<{ slug: string; name: string }>;
}

export interface ProductCardType {
  id: string;
  name: string;
  slug: string;
  brand: string;
  imageUrl: string;
  price: number;
  stockCount: number;
  isOnSale: boolean;
  reducedPrice: number | null;
  averageRating: number;
  totalRatingCount: number;
  createdAt: Date;
  categories?: Array<{ slug: string; name: string }>;
}

export interface ProductCartWishlistType {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  stockCount: number;
  isOnSale: boolean;
  reducedPrice: number | null;
  averageRating: number;
  totalRatingCount: number;
}
