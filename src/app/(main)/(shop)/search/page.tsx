import { mapToProductCard } from '@/lib/mappers/product';
import { Metadata } from 'next';
import {
  getAllBrands,
  getAllCategories,
  getAllProductsForSearch,
} from '@/lib/data/products';
import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';
import { ProductCardType } from '@/types/product';
import { Suspense } from 'react';

import SearchPageClient from './_components/SearchPageClient';

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

type SearchParams = {
  q?: string;
};

function SearchPageSkeleton() {
  return <div>Loading Search...</div>;
}

// DEMO MODE
async function StaticSearchPage() {
  console.log(
    `%c${DEMO_SENTENCE_PREFIX} Serving static search page with all mock products.`,
    'color: #7c3aed'
  );

  const [allProductsDB, allCategoriesData, allBrandsData] = await Promise.all([
    getAllProductsForSearch(),
    getAllCategories(),
    getAllBrands(),
  ]);

  const allProducts: ProductCardType[] = allProductsDB.map(mapToProductCard);

  return (
    <SearchPageClient
      allProducts={allProducts}
      brands={allBrandsData}
      categories={allCategoriesData}
    />
  );
}

// LIVE MODE
async function DynamicSearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchTerm = searchParams.q;
  console.log(
    `%c[LIVE] Serving dynamic search page for term:`,
    searchTerm,
    'color: #7c3aed'
  );

  const [allProductsDB, allCategoriesData, allBrandsData] = await Promise.all([
    getAllProductsForSearch(searchTerm),
    getAllCategories(),
    getAllBrands(),
  ]);

  const allProducts: ProductCardType[] = allProductsDB.map(mapToProductCard);
  return (
    <SearchPageClient
      allProducts={allProducts}
      brands={allBrandsData}
      categories={allCategoriesData}
      searchTerm={searchTerm}
    />
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      {isDemoMode ? (
        <StaticSearchPage />
      ) : (
        <DynamicSearchPage searchParams={searchParams} />
      )}
    </Suspense>
  );
}
