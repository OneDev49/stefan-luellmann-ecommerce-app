/**
 * Centralized Data Fetching Layer
 *
 * This File is used to hold all Prisma queries
 * and for those queries to be cached using React's cache() function.
 * This is done so that the resource usage is minimal due to this being
 * a portfolio project.
 *
 * @file lib/data/products.ts
 */

import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { Prisma, ProductType } from '@prisma/client';

const MAXIMUM_SEARCH_PAGE_LIMIT_UPPER_BOUND = 200;
const CAROUSEL_PRODUCT_LIMIT = 8;

/**
 * Categories
 */
export const getAllCategories = cache(async () => {
  return prisma.category.findMany({
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  });
});

export const getCategoryBySlug = cache(async (slug: string) => {
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
  return prisma.product.findUnique({
    where: { id },
  });
});

export const getAllProductSlugs = cache(async () => {
  return prisma.product.findMany({
    select: { slug: true },
  });
});

/**
 * Product Collections
 */
export const getOnSaleProducts = cache(async (limit: number = 10) => {
  return prisma.product.findMany({
    where: { isOnSale: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
});

export const getFeaturedProducts = cache(
  async (productType?: ProductType, limit: number = 10) => {
    const where: Prisma.ProductWhereInput = { isFeatured: true };

    if (productType) {
      where.productType = productType;
    }

    return prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
);

export const getNewArrivals = cache(async (limit: number = 10) => {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
});

export const getProductsByBrand = cache(
  async (brand: string, limit: number = 10) => {
    return prisma.product.findMany({
      where: { brand },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
);

export const getProductsByType = cache(
  async (productType: ProductType, limit: number = 10) => {
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
  const products = await prisma.product.findMany({
    select: { brand: true },
    distinct: ['brand'],
    orderBy: { brand: 'asc' },
  });

  return products.map((p) => p.brand);
});

export const getBrandsByCategory = cache(async (categorySlug: string) => {
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
  return prisma.product.count();
});

/**
 * Helper Batch Operations
 */
export const getProductsByIds = cache(async (ids: string[]) => {
  return prisma.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});
