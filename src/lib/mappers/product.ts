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

export function mapToProductPage(product: Product): ProductPageType {
  const averageRating = calculateAverageRating('averageRating', product);
  const totalRatingCount = calculateAverageRating('totalRatingCount', product);

  return {
    ...mapToProductCard(product),
    brand: product.brand,
    productType: product.productType,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    stockCount: product.stockCount,
    oneStarReviews: product.oneStarReviews,
    twoStarReviews: product.twoStarReviews,
    threeStarReviews: product.threeStarReviews,
    fourStarReviews: product.fourStarReviews,
    fiveStarReviews: product.fiveStarReviews,
    specs: normalizeSpecs(product.specs),
  };
}

export function mapToProductCard(product: Product): ProductCardType {
  const averageRating = calculateAverageRating('averageRating', product);
  const totalRatingCount = calculateAverageRating('totalRatingCount', product);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    imageUrl: product.imageUrl,
    price: product.price,
    isOnSale: product.isOnSale,
    reducedPrice: product.reducedPrice,
    averageRating,
    totalRatingCount,
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
