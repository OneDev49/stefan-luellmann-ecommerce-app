import { Prisma, Product } from '@prisma/client';
import {
  ProductPageType,
  ProductCardType,
  ProductSpecs,
} from '@/types/product';
import { calculateAverageRating } from '../calculateRating';

/* Normalize Specs so that Prisma JSON format works with TypeScript */
function normalizeSpecs(input: Prisma.JsonValue): ProductSpecs {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (
      typeof v === 'string' ||
      typeof v === 'number' ||
      typeof v === 'boolean'
    )
      out[k] = v;
  }
  return out;
}

type ProductWithCategories = Product & {
  categories?: Array<{ slug: string; name: string }>;
};

export function mapToProductPage(
  product: ProductWithCategories
): ProductPageType {
  const averageRating = calculateAverageRating('averageRating', product);
  const totalRatingCount = calculateAverageRating('totalRatingCount', product);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    imageUrl: product.imageUrl,
    productType: product.productType,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    price: product.price,
    stockCount: product.stockCount,
    isOnSale: product.isOnSale,
    reducedPrice: product.reducedPrice,
    oneStarReviews: product.oneStarReviews,
    twoStarReviews: product.twoStarReviews,
    threeStarReviews: product.threeStarReviews,
    fourStarReviews: product.fourStarReviews,
    fiveStarReviews: product.fiveStarReviews,
    averageRating,
    totalRatingCount,
    specs: normalizeSpecs(product.specs),
    createdAt: product.createdAt,
    categories: product.categories,
  };
}

export function mapToProductCard(
  product: ProductWithCategories
): ProductCardType {
  const averageRating = calculateAverageRating('averageRating', product);
  const totalRatingCount = calculateAverageRating('totalRatingCount', product);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    imageUrl: product.imageUrl,
    price: product.price,
    stockCount: product.stockCount,
    isOnSale: product.isOnSale,
    reducedPrice: product.reducedPrice,
    averageRating,
    totalRatingCount,
    createdAt: product.createdAt,
    categories: product.categories,
  };
}

/* import { Product } from '@prisma/client';
import { ClientProduct } from '@/types/product';

export function toClientProduct(dbProduct: Product): ClientProduct {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
    imageUrl: dbProduct.imageUrl,
    brand: dbProduct.brand,
    stockCount: dbProduct.stockCount,
    isOnSale: dbProduct.isOnSale,
    reducedPrice: dbProduct.reducedPrice,
  };
}

export function toClientProducts(dbProducts: Product[]): ClientProduct[] {
  return dbProducts.map(toClientProduct);
}
 */
