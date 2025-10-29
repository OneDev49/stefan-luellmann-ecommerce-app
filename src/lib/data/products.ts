/**
 * @file lib/data/products.ts
 * @description This File is used to hold all product queries across the project (both for REAL MODE and DEMO MODE).
 * In REAL MODE the prisma queries get cached using React's cache() function.
 * This is done so that the resource usage is minimal in REAL MODE.
 */

import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { Prisma, ProductType } from '@prisma/client';
import { isDemoMode } from '@/config/site';
import { mockDB } from './mockProductData';

const MAXIMUM_SEARCH_PAGE_LIMIT_UPPER_BOUND = 200;
const CAROUSEL_PRODUCT_LIMIT = 8;

/**
 * Categories
 */
export const getAllCategories = cache(async () => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getAllCategories();

  // REAL MODE
  return prisma.category.findMany({
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  });
});

export const getCategoryBySlug = cache(async (slug: string) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getCategoryBySlug(slug);

  // REAL MODE
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        take: 20,
      },
    },
  });
});

/**
 * Single Product
 */
export const getProductBySlug = cache(async (slug: string) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getProductBySlug(slug);

  // REAL MODE
  return prisma.product.findUnique({
    where: { slug },
    include: {
      categories: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });
});

export const getProductById = cache(async (id: string) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getProductById(id);

  // REAL MODE
  return prisma.product.findUnique({
    where: { id },
  });
});

export const getAllProductSlugs = cache(async () => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getAllProductSlugs();

  // REAL MODE
  return prisma.product.findMany({
    select: { slug: true },
  });
});

/**
 * Product Collections
 */
export const getOnSaleProducts = cache(async (limit: number = 10) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getOnSaleProducts(limit);

  // REAL MODE
  return prisma.product.findMany({
    where: { isOnSale: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
});

export const getFeaturedProducts = cache(
  async (productType?: ProductType, limit: number = 10) => {
    // DEMO MODE
    if (isDemoMode) return mockDB.getFeaturedProducts(productType, limit);

    // REAL MODE
    const where: Prisma.ProductWhereInput = { isFeatured: true };
    if (productType) where.productType = productType;
    return prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
);

export const getNewArrivals = cache(async (limit: number = 10) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getNewArrivals(limit);

  // REAL MODE
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
});

export const getProductsByBrand = cache(
  async (brand: string, limit: number = 10) => {
    // DEMO MODE
    if (isDemoMode) return mockDB.getProductsByBrand(brand, limit);

    // REAL MODE
    return prisma.product.findMany({
      where: { brand },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
);

export const getProductsByType = cache(
  async (productType: ProductType, limit: number = 10) => {
    // DEMO MODE
    if (isDemoMode) return mockDB.getProductsByType(productType, limit);

    // REAL MODE
    return prisma.product.findMany({
      where: { productType: productType },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
);

export const getSimilarProducts = cache(
  async (
    productType: ProductType,
    currentBrand: string,
    currentId: string,
    limit: number = CAROUSEL_PRODUCT_LIMIT
  ) => {
    // DEMO MODE
    if (isDemoMode)
      return mockDB.getSimilarProducts(
        productType,
        currentBrand,
        currentId,
        limit
      );

    // REAL MODE
    return prisma.product.findMany({
      where: {
        productType: productType,
        brand: { not: currentBrand },
        id: { not: currentId },
      },
      take: limit,
    });
  }
);

export const getBrandProducts = cache(
  async (
    brand: string,
    currentId: string,
    limit: number = CAROUSEL_PRODUCT_LIMIT
  ) => {
    // DEMO MODE
    if (isDemoMode) return mockDB.getBrandProducts(brand, currentId, limit);

    // REAL MODE
    return prisma.product.findMany({
      where: {
        brand,
        id: { not: currentId },
      },
      take: limit,
    });
  }
);

/**
 * Search Page & Filters
 */

export const getAllProductsForSearch = cache(
  async (
    searchTerm?: string,
    limit: number = MAXIMUM_SEARCH_PAGE_LIMIT_UPPER_BOUND
  ) => {
    // DEMO MODE
    if (isDemoMode) return mockDB.getAllProductsForSearch(searchTerm, limit);

    // REAL MODE
    const where: Prisma.ProductWhereInput = {};
    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { brand: { contains: searchTerm, mode: 'insensitive' } },
        { shortDescription: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    return prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        categories: {
          select: {
            slug: true,
            name: true,
          },
        },
      },
    });
  }
);

export const getAllBrands = cache(async () => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getAllBrands();

  // REAL MODE
  const products = await prisma.product.findMany({
    select: { brand: true },
    distinct: ['brand'],
    orderBy: { brand: 'asc' },
  });
  return products.map((p) => p.brand);
});

export const getBrandsByCategory = cache(async (categorySlug: string) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getBrandsByCategory(categorySlug);

  // REAL MODE
  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          slug: categorySlug,
        },
      },
    },
    select: { brand: true },
    distinct: ['brand'],
    orderBy: { brand: 'asc' },
  });
  return products.map((p) => p.brand);
});

/**
 * Misc for new Features
 */
export const getProductsCountsByCategory = cache(async () => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getProductsCountsByCategory();

  // REAL MODE
  const categories = await getAllCategories();

  const counts = await Promise.all(
    categories.map(async (category) => {
      const count = await prisma.product.count({
        where: {
          categories: {
            some: {
              slug: category.slug,
            },
          },
        },
      });

      return {
        category: category.name,
        slug: category.slug,
        count,
      };
    })
  );

  return counts;
});

export const getTotalProductCount = cache(async () => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getTotalProductCount();

  // REAL MODE
  return prisma.product.count();
});

/**
 * Helper Batch Operations
 */
export const getProductsByIds = cache(async (ids: string[]) => {
  // DEMO MODE
  if (isDemoMode) return mockDB.getProductsByIds(ids);

  // REAL MODE
  return prisma.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});
