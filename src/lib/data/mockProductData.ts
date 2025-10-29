/**
 * @file In-Memoty "database" for Demo Mode.
 * @description Imports raw seed data, processes it to mimic the Prisma model
 * and exports arrays that can be queried by the server-side data layer.
 * @see /lib/data/products.ts - Uses the mockDB to imitate prisma in demo mode.
 */

import { Prisma, Product, ProductType } from '@prisma/client';
import { products } from '../../../prisma/seed-data';

export type ProductWithCategories = Product & {
  categories: { slug: string; name: string }[];
};

const createMockDatabaseTable = (): ProductWithCategories[] => {
  return products.map((seedProduct) => {
    const dbProduct: ProductWithCategories = {
      id: seedProduct.id,
      name: seedProduct.name,
      slug: seedProduct.slug,
      brand: seedProduct.brand,
      imageUrl: seedProduct.imageUrl,
      productType: seedProduct.productType as ProductType,
      shortDescription: seedProduct.shortDescription,
      longDescription: seedProduct.longDescription,
      isFeatured: seedProduct.isFeatured,
      price: seedProduct.price,
      stockCount: seedProduct.stockCount,
      isOnSale: seedProduct.isOnSale,
      reducedPrice: seedProduct.reducedPrice ?? null,
      oneStarReviews: seedProduct.oneStarReviews,
      twoStarReviews: seedProduct.twoStarReviews,
      threeStarReviews: seedProduct.threeStarReviews,
      fourStarReviews: seedProduct.fourStarReviews,
      fiveStarReviews: seedProduct.fiveStarReviews,
      specs: seedProduct.specs as Prisma.JsonObject,
      createdAt: new Date(),
      updatedAt: new Date(),
      categories: seedProduct.categorySlugs.map((slug) => ({
        slug: slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
      })),
    };

    return dbProduct;
  });
};

export const mockProductTable: ProductWithCategories[] =
  createMockDatabaseTable();

const mockCategories = Array.from(
  new Set(mockProductTable.flatMap((p) => p.categories.map((c) => c.name)))
).map((name) => ({ name, slug: name.toLowerCase().replace(' ', '-') }));
const mockBrands = Array.from(
  new Set(mockProductTable.map((p) => p.brand))
).sort();

// Simulated Prisma Queries
// Helper to sort by date
const sortByDateDesc = (a: ProductWithCategories, b: ProductWithCategories) =>
  b.createdAt.getTime() - a.createdAt.getTime();

// mockDB object containing all simulated prisma queries
export const mockDB = {
  // Categories
  getAllCategories: () => mockCategories,
  getCategoryBySlug: (slug: string) => {
    const category = mockCategories.find((c) => c.slug === slug);
    if (!category) return null;
    const products = mockProductTable
      .filter((p) => p.categories.some((c) => c.slug === slug))
      .slice(0, 20);
    return { ...category, products };
  },

  // Single Product
  getProductBySlug: (slug: string) =>
    mockProductTable.find((p) => p.slug === slug) || null,
  getProductById: (id: string) =>
    mockProductTable.find((p) => p.id === id) || null,
  getAllProductSlugs: () => mockProductTable.map((p) => ({ slug: p.slug })),

  // Product Collections
  getOnSaleProducts: (limit = 10) =>
    mockProductTable
      .filter((p) => p.isOnSale)
      .sort(sortByDateDesc)
      .slice(0, limit),
  getFeaturedProducts: (productType?: ProductType, limit = 10) => {
    let products = mockProductTable.filter((p) => p.isFeatured);
    if (productType) {
      products = products.filter((p) => p.productType === productType);
    }
    return products.sort(sortByDateDesc).slice(0, limit);
  },
  getNewArrivals: (limit = 10) =>
    [...mockProductTable].sort(sortByDateDesc).slice(0, limit),
  getProductsByBrand: (brand: string, limit = 10) =>
    mockProductTable
      .filter((p) => p.brand === brand)
      .sort(sortByDateDesc)
      .slice(0, limit),
  getProductsByType: (productType: ProductType, limit = 10) =>
    mockProductTable
      .filter((p) => p.productType === productType)
      .sort(sortByDateDesc)
      .slice(0, limit),
  getSimilarProducts: (
    productType: ProductType,
    currentBrand: string,
    currentId: string,
    limit = 8
  ) => {
    return mockProductTable
      .filter(
        (p) =>
          p.productType === productType &&
          p.brand !== currentBrand &&
          p.id !== currentId
      )
      .slice(0, limit);
  },
  getBrandProducts: (brand: string, currentId: string, limit = 8) => {
    return mockProductTable
      .filter((p) => p.brand === brand && p.id !== currentId)
      .slice(0, limit);
  },

  // Search
  getAllProductsForSearch: (searchTerm?: string, limit = 200) => {
    if (!searchTerm) return mockProductTable.slice(0, limit);
    const term = searchTerm.toLowerCase();
    return mockProductTable
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term)
      )
      .slice(0, limit);
  },
  getAllBrands: () => mockBrands,
  getBrandsByCategory: (categorySlug: string) => {
    const brands = new Set(
      mockProductTable
        .filter((p) => p.categories.some((c) => c.slug === categorySlug))
        .map((p) => p.brand)
    );
    return Array.from(brands).sort();
  },

  // Misc
  getProductsCountsByCategory: () => {
    return mockCategories.map((category) => ({
      ...category,
      count: mockProductTable.filter((p) =>
        p.categories.some((c) => c.slug === category.slug)
      ).length,
    }));
  },
  getTotalProductCount: () => mockProductTable.length,
  getProductsByIds: (ids: string[]) =>
    mockProductTable.filter((p) => ids.includes(p.id)),
};

/*
type processedMockProduct = Omit<Product, 'categories'> & {
  id: string;
  name: string;
  slug: string;
  brand: string;
  imageUrl: string;
  productType: ProductType;
  shortDescription: string;
  longDescription: string;
  isFeatured: boolean;
  price: number;
  stockCount: number;
  isOnSale: boolean;
  reducedPrice: number | null;
  oneStarReviews: number;
  twoStarReviews: number;
  threeStarReviews: number;
  fourStarReviews: number;
  fiveStarReviews: number;
  specs: {
    [key: string]: string | number | boolean;
  };
  categorySlugs: string[];
  createdAt: Date;
  updatedAt: Date;
};

const processedMockProducts: processedMockProduct[] = products.map(
  (product) => ({
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: product.categorySlugs.map(slug => ({ slug, name: slug.toUpperCase() }))
  })
);

// Main DEMO MODE Product Table
export const mockProducts: processedMockProduct[] = processedMockProducts;

// Maps for DEMO MODE Products
export const mockProductsBySlug = new Map(mockProducts.map((p) => [p.slug, p]));
export const mockProductsById = new Map(mockProducts.map((p) => [p.id, p]));

// Sets for DEMO MODE Products
export const mockBrands = Array.from(
  new Set(mockProducts.map((p) => p.brand))
).sort();
export const mockCategories = Array.from(
  new Set(mockProducts.flatMap((p) => p.categorySlugs))
);
 */
