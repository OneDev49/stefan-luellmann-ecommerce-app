import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { mapToProductCard } from '@/lib/mappers/product';

import SearchPageClient from './_components/SearchPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Find the Computer Components you are looking for among hundrets of premium components. From GPU to CPU and even Case Fans, we have everything for your Computer.',

  openGraph: {
    title: 'Search',
    description:
      'Find the Computer Components you are looking for among hundrets of premium components. From GPU to CPU and even Case Fans, we have everything for your Computer.',
  },

  twitter: {
    title: 'Search',
    description:
      'Find the Computer Components you are looking for among hundrets of premium components. From GPU to CPU and even Case Fans, we have everything for your Computer.',
  },
};

// Cache categories for better optimization on Project since Products never change
const getAllCategories = cache(async () => {
  return prisma.category.findMany({
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  });
});

type SearchParams = {
  q?: string;
};

const MAXIMUM_AMOUNT_OF_DEMO_PRODUCTS = 200;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchTerm = searchParams.q;

  // Minimal where clause only for search term
  const where: Prisma.ProductWhereInput = {};

  if (searchTerm) {
    where.OR = [
      { name: { contains: searchTerm, mode: 'insensitive' } },
      { brand: { contains: searchTerm, mode: 'insensitive' } },
      { shortDescription: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  // Single DB Query to fetch all matching products at once
  const [allProductsDB, allCategories] = await Promise.all([
    prisma.product.findMany({
      where,
      take: MAXIMUM_AMOUNT_OF_DEMO_PRODUCTS,
      include: {
        categories: {
          select: {
            slug: true,
            name: true,
          },
        },
      },
    }),
    getAllCategories(),
  ]);

  const allProducts = allProductsDB.map(mapToProductCard);

  const uniqueBrands = Array.from(
    new Set(allProductsDB.map((p) => p.brand))
  ).sort();

  return (
    <SearchPageClient
      allProducts={allProducts}
      brands={uniqueBrands}
      categories={allCategories}
      searchTerm={searchTerm}
    />
  );
}
